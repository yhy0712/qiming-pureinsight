import type { Metadata } from "next";
import Link from "next/link";
import { getArtisans } from "@/lib/data/catalog";

export const metadata: Metadata = {
  title: "人类未来学院",
  description: "后AI时代的匠人/手艺人社群连接平台。",
};

export default function AcademyPage() {
  const artisans = getArtisans();

  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <p className="mb-4 text-xs tracking-[0.22em] text-ink-faint">
            INSTITUTE FOR HUMAN FUTURE
          </p>
          <h1 className="max-w-3xl font-serif text-[32px] leading-tight tracking-[0.04em] md:text-[40px]">
            人类未来学院
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-[1.85] text-ink-muted">
            定位为后AI时代的匠人/手艺人社群连接平台：当雇佣关系松动，人们更多依靠手艺与专长谋生——学院把各行各业的匠人连成互助网络。
          </p>
          <Link href="/register" className="btn-primary mt-8 inline-flex">
            加入社群（注册）
          </Link>
        </div>
      </section>

      <section className="border-b border-border bg-paper-card/40">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
          <h2 className="font-serif text-2xl tracking-[0.04em]">匠人社群（占位）</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {artisans.map((a) => (
              <article key={a.id} className="card-accent p-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={a.avatar_url}
                  alt={a.name}
                  className="h-16 w-16 border border-border object-cover"
                />
                <h3 className="mt-4 font-serif text-lg">{a.name}</h3>
                <p className="mt-1 text-xs tracking-wide text-cinnabar">{a.field}</p>
                <p className="mt-3 text-sm leading-[1.75] text-ink-muted">{a.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <h2 className="font-serif text-2xl tracking-[0.04em]">论题与活动预告</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <article className="border border-border bg-paper-card p-5">
            <p className="text-xs text-ink-faint">论题研究</p>
            <h3 className="mt-2 font-serif text-lg">信任经济学与保障经济学白皮书（筹备中）</h3>
          </article>
          <article className="border border-border bg-paper-card p-5">
            <p className="text-xs text-ink-faint">线下预告</p>
            <h3 className="mt-2 font-serif text-lg">小型「三人行」工作坊 · 香港 / 上海（日期待定）</h3>
          </article>
        </div>
      </section>
    </>
  );
}
