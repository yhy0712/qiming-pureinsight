"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export type ArticleCard = {
  slug: string;
  title: string;
  category: string;
  wordCount: number;
  preview: string;
  lang: string;
  authorName?: string;
};

export function ArticlesBrowser({
  articles,
  counts,
}: {
  articles: ArticleCard[];
  counts: Record<string, number>;
}) {
  const { t, convertText } = useLocale();
  const [category, setCategory] = useState("all");

  const filtered = useMemo(
    () =>
      category === "all"
        ? articles
        : articles.filter((a) => a.category === category),
    [articles, category],
  );

  const cats = [
    "all",
    "finance",
    "economics",
    "psychology",
    "science",
    "education",
    "philosophy",
    "society",
    "general",
  ].filter((c) => c === "all" || (counts[c] || 0) > 0);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {cats.map((c) => {
          const active = category === c;
          const label = t.categories[c] || c;
          const n = counts[c] || 0;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`border px-3 py-1.5 text-sm tracking-wide transition-colors ${
                active
                  ? "border-cinnabar bg-cinnabar text-paper-card"
                  : "border-border bg-paper-card text-ink-muted hover:border-cinnabar hover:text-cinnabar"
              }`}
            >
              {label}
              <span className="ml-1 opacity-70">({n})</span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 text-ink-muted">{t.articles.empty}</p>
      ) : (
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {filtered.map((article) => (
            <article key={article.slug} className="card-accent flex flex-col p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="border border-border bg-cinnabar-soft/50 px-2 py-0.5 text-xs tracking-wide text-cinnabar">
                  {t.categories[article.category] || article.category}
                </span>
                {article.authorName && (
                  <span className="text-xs text-ink-faint">{article.authorName}</span>
                )}
              </div>
              <h2 className="mt-4 font-serif text-xl tracking-[0.03em] text-ink">
                {convertText(article.title)}
              </h2>
              <p className="mt-3 line-clamp-3 flex-1 text-sm leading-[1.75] text-ink-muted">
                {convertText(article.preview) || "点击阅读首页预览。"}
              </p>
              <p className="mt-3 text-xs text-ink-faint">
                {t.articles.wordCount.replace("{n}", String(article.wordCount))}
              </p>
              <Link
                href={`/articles/${article.slug}`}
                className="btn-secondary mt-5 self-start"
              >
                {t.articles.readPreview}
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
