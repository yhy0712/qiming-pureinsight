/**
 * 关系经营 / 社会教育专区：把已有文稿按「如何经营关系」主题编排。
 * Traditional schooling rarely teaches sociology of everyday relations;
 * this section fills that gap with existing PureInsight materials.
 */

export type RelationTheme = {
  id: string;
  title: string;
  subtitle: string;
  body: string;
  /** Match by title keywords against catalog articles */
  titleMatchers: string[];
};

export const relationIntro = {
  eyebrow: "社会教育补课",
  title: "关系经营：传统教育少教、人生却天天用的一门课",
  lead:
    "传统中国教育长于知识与考试，却很少系统教授「社会学」意义上的关系经营——如何与上级相处、如何经营婚姻与家庭、如何在博弈中建立信任与合作。启明把已有研究与文章，整理成可练习的关系地图。",
  points: [
    {
      title: "缺的不是人情世故",
      text: "而是可复用的框架：权力距离、信任成本、沟通结构、长期契约——把「会做人」还原为可学习的社会技能。",
    },
    {
      title: "职场与家庭是同一套功课",
      text: "对领导的期待管理、对伴侣的边界与承诺、对孩子的习惯养成，底层都是风险、激励与互惠。",
    },
    {
      title: "用既有文稿练兵",
      text: "婚恋、心理、博弈论、保障与家庭配置等文章，不是散落的观点，而是关系经营的读本与社群讨论素材。",
    },
  ],
};

export const relationThemes: RelationTheme[] = [
  {
    id: "marriage",
    title: "婚恋与家庭",
    subtitle: "亲密关系里的信任、安全感与长期契约",
    body: "城市压力、沟通成本、养育成本与认知错位，正在重塑婚姻市场。从「剩女」现象到家庭风险管理，先看见结构，再谈选择。",
    titleMatchers: ["剩女", "安顿身心", "家庭风险管理", "中高产家庭", "中产风险管理"],
  },
  {
    id: "workplace",
    title: "职场与上下级",
    subtitle: "与领导、同事的权力距离与利益均衡",
    body: "传统教育很少训练「如何与权力相处」。三方共赢、风险利益均衡、企业主的居安思危，都是职场关系的延长线——先理解激励，再谈忠诚与表达。",
    titleMatchers: [
      "三方共赢",
      "风险、利益均衡与成败",
      "风险利益均衡与文明兴衰",
      "居安思危",
      "企业主",
    ],
  },
  {
    id: "trust",
    title: "信任、博弈与合作",
    subtitle: "把「关系」看作可设计的合作结构",
    body: "博弈论不只是竞赛，更是关系协议：如何在不确定中建立可信承诺。保障经济学、安全网与共赢逻辑，帮助我们从「靠感觉」转向「靠机制」。",
    titleMatchers: ["博弈论", "Game Theory", "保障经济学", "Safety Net", "三方共赢"],
  },
  {
    id: "self",
    title: "自我认知与心理素养",
    subtitle: "经营任何关系之前，先经营自己",
    body: "心理学不是鸡汤，而是关系操作系统：情绪、偏见、依恋与叙事。认识自己的模式，才谈得上与他人共处。",
    titleMatchers: ["心理学", "险鉴", "儿童最重要的8个习惯", "少年儿童的财商"],
  },
];

function normalizeTitle(title: string) {
  return title
    .replace(/\d{4,}/g, "")
    .replace(/0?\d{1,2}\s*$/g, "")
    .replace(/[vV]\d+/g, "")
    .replace(/\s+/g, "")
    .toLowerCase();
}

export function matchRelationArticles<
  T extends {
    title: string;
    slug: string;
    category: string;
    preview: string;
    wordCount?: number;
  },
>(articles: T[]) {
  return relationThemes.map((theme) => {
    const matched = articles.filter((a) =>
      theme.titleMatchers.some((kw) => a.title.includes(kw)),
    );

    // Prefer longer versions when titles are near-duplicates (e.g. 居安思危 v1/v2)
    const byKey = new Map<string, T>();
    for (const a of matched) {
      const key = normalizeTitle(a.title);
      const prev = byKey.get(key);
      if (!prev || (a.wordCount || 0) >= (prev.wordCount || 0)) {
        byKey.set(key, a);
      }
    }
    return { theme, articles: [...byKey.values()] };
  });
}
