"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";

export function LocalizedText({
  text,
  as: Tag = "span",
  className,
}: {
  text: string;
  as?: "span" | "p" | "h1" | "h2" | "h3";
  className?: string;
}) {
  const { convertText } = useLocale();
  return <Tag className={className}>{convertText(text)}</Tag>;
}

export function LocalizedBody({ text }: { text: string }) {
  const { convertText } = useLocale();
  const paragraphs = convertText(text)
    .split(/\n{2,}|\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="space-y-4 text-[15px] leading-[1.85] text-ink-muted md:text-base">
      {paragraphs.map((p, i) => (
        <p key={`${i}-${p.slice(0, 12)}`}>{p}</p>
      ))}
    </div>
  );
}
