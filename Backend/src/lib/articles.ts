import catalog from "../../content/articles.json";
import { listPublishedUserArticles } from "@/lib/user-articles";
import { readDb } from "@/lib/db/store";

export type Article = {
  id: string;
  slug: string;
  title: string;
  category: string;
  source: string;
  lang: string;
  price: number;
  currency: string;
  preview: string;
  content: string;
  wordCount: number;
  relativePath?: string;
  updatedAt: string;
  authorName?: string;
};

type CatalogPayload = {
  generatedAt: string;
  price: number;
  currency: string;
  categories: string[];
  articles: Article[];
};

const payload = catalog as CatalogPayload;

export const ARTICLE_PRICE = payload.price;
export const ARTICLE_CURRENCY = payload.currency;
export const ARTICLE_CATEGORIES = payload.categories;

function mergedArticles(): Article[] {
  const fromCatalog = payload.articles.map((a) => ({
    ...a,
    source: a.source || "catalog",
  }));

  const db = readDb();
  const fromUsers: Article[] = listPublishedUserArticles().map((a) => {
    const author = db.users.find((u) => u.id === a.authorId);
    return {
      id: a.id,
      slug: a.slug,
      title: a.title,
      category: a.category,
      source: "community",
      lang: "zh",
      price: ARTICLE_PRICE,
      currency: ARTICLE_CURRENCY,
      preview: a.preview,
      content: a.content,
      wordCount: a.wordCount,
      updatedAt: a.reviewedAt || a.createdAt,
      authorName: author?.name,
    };
  });

  return [...fromUsers, ...fromCatalog];
}

export function getArticles(category?: string): Omit<Article, "content">[] {
  return mergedArticles()
    .filter((a) => !category || category === "all" || a.category === category)
    .map(({ content: _c, ...meta }) => meta);
}

export function getArticle(slug: string): Article | undefined {
  let decoded = slug;
  try {
    decoded = decodeURIComponent(slug);
  } catch {
    decoded = slug;
  }
  return (
    mergedArticles().find((a) => a.slug === decoded) ||
    mergedArticles().find((a) => a.slug === slug) ||
    mergedArticles().find((a) => a.id === decoded)
  );
}

export function getCategoryCounts(): Record<string, number> {
  const counts: Record<string, number> = { all: 0 };
  const all = mergedArticles();
  counts.all = all.length;
  for (const a of all) {
    counts[a.category] = (counts[a.category] || 0) + 1;
  }
  return counts;
}

export function userHasUnlock(userId: string, slug: string) {
  return readDb().unlocks.some((u) => u.userId === userId && u.slug === slug);
}
