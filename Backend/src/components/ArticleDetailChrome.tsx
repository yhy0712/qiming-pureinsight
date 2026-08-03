"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";

export function ArticleDetailChrome({
  category,
  unlocked,
  wordCount,
}: {
  category: string;
  unlocked: boolean;
  wordCount: number;
}) {
  const { t } = useLocale();
  return (
    <section className="border-b border-border bg-paper-card/40">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-3 px-5 py-5 md:px-8">
        <span className="border border-border bg-cinnabar-soft/50 px-2 py-0.5 text-xs tracking-wide text-cinnabar">
          {t.categories[category] || category}
        </span>
        <span className="text-xs text-ink-faint">
          {unlocked ? t.articles.unlocked : t.articles.previewLabel}
        </span>
        <span className="text-xs text-ink-faint">
          {t.articles.wordCount.replace("{n}", String(wordCount))}
        </span>
      </div>
    </section>
  );
}

export function ArticleSectionLabel({ unlocked }: { unlocked: boolean }) {
  const { t } = useLocale();
  return <>{unlocked ? t.articles.fullLabel : t.articles.previewLabel}</>;
}

export function ArticleBackLink() {
  const { t } = useLocale();
  return <>{t.articles.backToList}</>;
}
