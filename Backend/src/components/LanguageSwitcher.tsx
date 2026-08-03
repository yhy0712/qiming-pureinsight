"use client";

import { localeLabels, locales, type Locale } from "@/lib/i18n/dictionaries";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLocale();

  return (
    <label className="flex items-center gap-2 text-xs tracking-wide text-ink-muted">
      <span className="sr-only">{t.common.language}</span>
      <select
        aria-label={t.common.language}
        value={locale}
        onChange={(e) => setLocale(e.target.value as Locale)}
        className="border border-border bg-paper px-2 py-1.5 text-xs text-ink outline-none hover:border-cinnabar focus:border-cinnabar"
      >
        {locales.map((code) => (
          <option key={code} value={code}>
            {localeLabels[code]}
          </option>
        ))}
      </select>
    </label>
  );
}
