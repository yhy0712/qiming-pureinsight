import type { Metadata } from "next";
import Link from "next/link";
import { getArticles } from "@/lib/articles";
import { matchRelationArticles, relationIntro } from "@/lib/relations";

export const metadata: Metadata = {
  title: "关系经营 · 社会教育",
  description:
    "补上传统教育缺少的社会学功课：职场上下级、婚恋家庭、信任合作与自我认知——整合启明既有文稿。",
};

export default function RelationsPage() {
  const articles = getArticles();
  const groups = matchRelationArticles(articles);

  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <p className="mb-4 text-xs tracking-[0.22em] text-ink-faint">
            RELATIONS · SOCIAL EDUCATION
          </p>
          <h1 className="max-w-3xl font-serif text-[32px] leading-tight tracking-[0.04em] text-ink md:text-[40px]">
            {relationIntro.title}
          </h1>
          <p className="mt-5 max-w-3xl text-[15px] leading-[1.85] text-ink-muted md:text-base">
            {relationIntro.lead}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/community" className="btn-primary">
              加入社群练习
            </Link>
            <Link href="/articles" className="btn-secondary">
              浏览全部专栏
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-paper-card/40">
        <div className="mx-auto grid max-w-6xl gap-5 px-5 py-12 md:grid-cols-3 md:px-8">
          {relationIntro.points.map((p) => (
            <article key={p.title} className="card-accent p-5">
              <h2 className="font-serif text-lg">{p.title}</h2>
              <p className="mt-3 text-sm leading-[1.8] text-ink-muted">{p.text}</p>
            </article>
          ))}
        </div>
      </section>

      {groups.map(({ theme, articles: list }) => (
        <section
          key={theme.id}
          id={theme.id}
          className="scroll-mt-28 border-b border-border"
        >
          <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-16">
            <p className="text-xs tracking-[0.18em] text-cinnabar">
              {theme.subtitle}
            </p>
            <h2 className="mt-2 font-serif text-2xl tracking-[0.04em] md:text-[28px]">
              {theme.title}
            </h2>
            <p className="mt-4 max-w-3xl text-[15px] leading-[1.85] text-ink-muted">
              {theme.body}
            </p>

            {list.length === 0 ? (
              <p className="mt-8 text-sm text-ink-faint">相关文稿整理中。</p>
            ) : (
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {list.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/articles/${a.slug}`}
                    className="card-accent block p-5 transition-colors hover:border-cinnabar"
                  >
                    <p className="text-xs tracking-wide text-ink-faint">
                      {a.category}
                    </p>
                    <h3 className="mt-2 font-serif text-lg text-ink">{a.title}</h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-[1.75] text-ink-muted">
                      {a.preview}
                    </p>
                    <span className="mt-4 inline-block text-sm text-cinnabar">
                      阅读首页预览 →
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}

      <section className="bg-ink text-on-dark">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-16">
          <h2 className="font-serif text-2xl tracking-[0.04em]">
            在社群里练习关系，而不只是阅读
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-[1.85] text-on-dark-muted">
            登录后加入心理学 / 教育 / 哲学人文等社群，与同路人讨论上下级沟通、婚恋决策与信任机制；也可投稿你的关系观察，核实后上架共享。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/community"
              className="inline-flex border border-on-dark bg-on-dark px-5 py-3 text-sm text-ink"
            >
              进入社群
            </Link>
            <Link
              href="/upload"
              className="inline-flex border border-on-dark/40 px-5 py-3 text-sm text-on-dark"
            >
              投稿你的观察
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
