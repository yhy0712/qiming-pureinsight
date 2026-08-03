"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";

export function ArticlesPageHeader() {
  const { t } = useLocale();
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <p className="mb-4 text-xs tracking-[0.22em] text-ink-faint">
          PUREINSIGHT · LIBRARY
        </p>
        <h1 className="font-serif text-[32px] leading-tight tracking-[0.04em] text-ink md:text-[40px]">
          {t.articles.title}
        </h1>
        <p className="mt-5 max-w-2xl text-[15px] leading-[1.8] text-ink-muted md:text-base">
          {t.articles.subtitle}
        </p>
      </div>
    </section>
  );
}
