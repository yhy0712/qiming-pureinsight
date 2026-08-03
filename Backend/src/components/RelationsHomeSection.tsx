import Link from "next/link";
import { relationIntro, relationThemes } from "@/lib/relations";

export function RelationsHomeSection() {
  return (
    <section className="border-b border-border bg-paper-card/50">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <p className="mb-3 text-xs tracking-[0.2em] text-cinnabar">
          {relationIntro.eyebrow}
        </p>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <h2 className="font-serif text-2xl tracking-[0.04em] md:text-[28px]">
              {relationIntro.title}
            </h2>
            <p className="mt-4 text-[15px] leading-[1.85] text-ink-muted">
              {relationIntro.lead}
            </p>
          </div>
          <Link href="/relations" className="btn-primary shrink-0">
            进入关系经营专区
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {relationIntro.points.map((p) => (
            <article key={p.title} className="card-accent p-5">
              <h3 className="font-serif text-lg tracking-[0.03em]">{p.title}</h3>
              <p className="mt-3 text-sm leading-[1.75] text-ink-muted">{p.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {relationThemes.map((t) => (
            <Link
              key={t.id}
              href={`/relations#${t.id}`}
              className="border border-border bg-paper px-4 py-4 transition-colors hover:border-cinnabar"
            >
              <p className="font-serif text-base text-ink">{t.title}</p>
              <p className="mt-2 text-xs leading-relaxed text-ink-faint">
                {t.subtitle}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
