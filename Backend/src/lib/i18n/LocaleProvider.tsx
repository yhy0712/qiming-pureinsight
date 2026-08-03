"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  dictionaries,
  type Dictionary,
  type Locale,
  locales,
} from "./dictionaries";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
  convertText: (text: string) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);
const STORAGE_KEY = "qiming_locale";

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("zh-CN");
  const [twConvert, setTwConvert] = useState<((s: string) => string) | null>(
    null,
  );

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved && locales.includes(saved)) setLocaleState(saved);
  }, []);

  useEffect(() => {
    let cancelled = false;
    if (locale !== "zh-TW") {
      setTwConvert(null);
      return;
    }
    import("opencc-js").then((OpenCC) => {
      if (cancelled) return;
      const converter = OpenCC.Converter({ from: "cn", to: "tw" });
      setTwConvert(() => converter);
    });
    return () => {
      cancelled = true;
    };
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next === "en" ? "en" : next;
  }, []);

  const convertText = useCallback(
    (text: string) => {
      if (locale === "zh-TW" && twConvert) return twConvert(text);
      return text;
    },
    [locale, twConvert],
  );

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: dictionaries[locale],
      convertText,
    }),
    [locale, setLocale, convertText],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
