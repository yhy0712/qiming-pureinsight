#!/usr/bin/env node
/**
 * Extract .docx from ../读博 and ../金融分析, classify, write content/articles.json
 */
import { execFileSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
  statSync,
} from "node:fs";
import { basename, extname, join, relative } from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = join(__dirname, "../..");
const OUT_DIR = join(__dirname, "../content");
const OUT_FILE = join(OUT_DIR, "articles.json");

const SOURCES = [
  { dir: join(ROOT, "读博"), source: "dubo" },
  { dir: join(ROOT, "金融分析"), source: "finance" },
];

const SKIP_NAME =
  /^(letter|lettre|cl for|cover letter|自我介绍|to nhzb|title nhzb|学习图)/i;

const CATEGORIES = [
  {
    id: "finance",
    keywords: [
      "金融",
      "投资",
      "资产配置",
      "保险",
      "证券",
      "货币",
      "财商",
      "家族办公室",
      "投资组合",
      "portfolio",
      "investment",
      "insurance",
      "wealth",
      "卖铲人",
      "高净值",
      "中产",
      "企业主",
      "风险管理与资产",
      "居安思危",
      "保险代理人",
      "保险的",
    ],
  },
  {
    id: "economics",
    keywords: [
      "经济",
      "经济学",
      "遗产税",
      "保障经济学",
      "博弈论",
      "game theory",
      "诺贝尔",
      "马克思",
      "哈耶克",
      "克鲁格曼",
      "贫穷",
      "生育",
      "布坎南",
      "约瑟夫",
      "私有产权",
      "safety net",
      "四大流派",
      "人口生育",
      "三方共赢",
      "产业",
      "security economics",
    ],
  },
  {
    id: "psychology",
    keywords: ["心理", "psychology", "情商", "逆商", "认知偏差"],
  },
  {
    id: "science",
    keywords: [
      "菲尔兹",
      "数学",
      "ai",
      "科技",
      "科学",
      "黄仁勋",
      "fields",
      "王虹",
      "数学公司",
    ],
  },
  {
    id: "education",
    keywords: [
      "学习",
      "教育",
      "初高中",
      "少年儿童",
      "习惯",
      "思维方法",
      "education",
      "儿童",
      "财商教育",
    ],
  },
  {
    id: "philosophy",
    keywords: [
      "易经",
      "穷查理",
      "安顿身心",
      "初心",
      "智者三人行",
      "老子",
      "新文艺复兴",
      "文明",
      "人类历史",
      "险鉴",
    ],
  },
  {
    id: "society",
    keywords: ["剩女", "香港的历史", "人口", "社会", "婚恋"],
  },
];

function slugify(name, filePath) {
  // ASCII-only slugs — Chinese URL encoding is case-sensitive in Next routing
  // and frequently 404s in the browser.
  const hash = createHash("md5")
    .update(`${name}::${filePath}`)
    .digest("hex")
    .slice(0, 12);
  const ascii = name
    .replace(/\.[^.]+$/, "")
    .normalize("NFKD")
    .replace(/[^\x00-\x7F]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase()
    .slice(0, 40);
  return ascii ? `${ascii}-${hash}` : `article-${hash}`;
}

function extractDocx(filePath) {
  try {
    const txt = execFileSync(
      "textutil",
      ["-convert", "txt", "-stdout", filePath],
      { encoding: "utf8", maxBuffer: 20 * 1024 * 1024 },
    );
    return txt.replace(/\r\n/g, "\n").trim();
  } catch {
    return "";
  }
}

function classify(title, body) {
  const titleHay = title.toLowerCase();
  const bodyHay = body.slice(0, 2000).toLowerCase();
  let best = { id: "general", score: 0 };
  for (const cat of CATEGORIES) {
    let score = 0;
    for (const kw of cat.keywords) {
      const k = kw.toLowerCase();
      if (titleHay.includes(k)) score += 6;
      else if (bodyHay.includes(k)) score += kw.length > 4 ? 2 : 1;
    }
    if (score > best.score) best = { id: cat.id, score };
  }
  return best.id;
}

function detectLang(title, body) {
  const sample = `${title} ${body.slice(0, 400)}`;
  const cjk = (sample.match(/[\u4e00-\u9fff]/g) || []).length;
  const latin = (sample.match(/[A-Za-z]/g) || []).length;
  return cjk >= latin ? "zh" : "en";
}

function previewText(body, chars = 900) {
  if (body.length <= chars) return body;
  const cut = body.slice(0, chars);
  const lastBreak = Math.max(cut.lastIndexOf("\n"), cut.lastIndexOf("。"), cut.lastIndexOf(". "));
  return (lastBreak > chars * 0.5 ? cut.slice(0, lastBreak + 1) : cut).trim();
}

function shouldSkip(filename) {
  const stem = filename.replace(/\.[^.]+$/, "").trim();
  if (SKIP_NAME.test(stem)) return true;
  const ext = extname(filename).toLowerCase();
  if (![".docx"].includes(ext)) return true;
  return false;
}

function collectFiles() {
  const files = [];
  for (const { dir, source } of SOURCES) {
    if (!existsSync(dir)) continue;
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      if (!statSync(full).isFile()) continue;
      if (shouldSkip(name)) continue;
      files.push({ full, name, source });
    }
  }
  return files;
}

function dedupeKey(title) {
  return title
    .replace(/\d{4,}/g, "")
    .replace(/0?\d{1,2}\s*$/g, "")
    .replace(/[vV]\d+/g, "")
    .replace(/\s+/g, "")
    .toLowerCase();
}

function main() {
  const files = collectFiles();
  const byKey = new Map();

  for (const f of files) {
    const title = basename(f.name, extname(f.name)).trim();
    const body = extractDocx(f.full);
    if (!body || body.length < 80) {
      console.warn("skip short/empty:", f.name);
      continue;
    }
    const key = dedupeKey(title);
    const prev = byKey.get(key);
    if (prev && prev.content.length >= body.length) continue;

    const category = classify(title, body);
    const lang = detectLang(title, body);
    const slug = slugify(title, f.full);
    const article = {
      id: slug,
      slug,
      title,
      category,
      source: f.source,
      lang,
      price: 9.99,
      currency: "USD",
      preview: previewText(body),
      content: body,
      wordCount: body.replace(/\s+/g, "").length,
      relativePath: relative(ROOT, f.full),
      updatedAt: statSync(f.full).mtime.toISOString(),
    };
    byKey.set(key, article);
  }

  const articles = [...byKey.values()].sort((a, b) =>
    a.title.localeCompare(b.title, "zh"),
  );

  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(
    OUT_FILE,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        price: 9.99,
        currency: "USD",
        categories: [
          "finance",
          "economics",
          "psychology",
          "science",
          "education",
          "philosophy",
          "society",
          "general",
        ],
        articles,
      },
      null,
      2,
    ),
    "utf8",
  );

  const counts = {};
  for (const a of articles) counts[a.category] = (counts[a.category] || 0) + 1;
  console.log(`Wrote ${articles.length} articles -> ${OUT_FILE}`);
  console.log(counts);
}

main();
