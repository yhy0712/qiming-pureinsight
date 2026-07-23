import Link from "next/link";

type Props = {
  title: string;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function PageHero({
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: Props) {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <p className="mb-4 text-xs tracking-[0.22em] text-ink-faint">
          PUREINSIGHT · 香港 · 上海
        </p>
        <h1 className="font-serif text-[32px] leading-tight tracking-[0.04em] text-ink md:text-[40px]">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-[15px] leading-[1.8] text-ink-muted md:text-base">
          {description}
        </p>
        {(primaryHref || secondaryHref) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {primaryHref && primaryLabel && (
              <Link href={primaryHref} className="btn-primary">
                {primaryLabel}
              </Link>
            )}
            {secondaryHref && secondaryLabel && (
              <Link href={secondaryHref} className="btn-secondary">
                {secondaryLabel}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
