import type { Metadata } from "next";
import Link from "next/link";
import { IconBooks } from "@tabler/icons-react";
import { getBookCategories } from "@/lib/data/catalog";

export const metadata: Metadata = {
  title: "链接 · 知识资源库",
  description: "经济学、金融学、哲学等书单与知识资源入口。",
};

export default function ConnectIndexPage() {
  const categories = getBookCategories();

  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <p className="mb-4 text-xs tracking-[0.22em] text-ink-faint">CONNECT · LIBRARY</p>
          <h1 className="font-serif text-[32px] tracking-[0.04em] md:text-[40px]">
            链接：书籍与知识资源库
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-[1.85] text-ink-muted">
            按学科浏览推荐书单。数据来自独立 mock 结构，便于日后迁移至真实数据库。
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Link key={c.id} href={`/connect/${c.id}`} className="card-accent block p-6 hover:border-cinnabar">
              <IconBooks size={22} stroke={1.4} className="text-cinnabar" />
              <h2 className="mt-4 font-serif text-xl">{c.label}</h2>
              <p className="mt-2 text-sm leading-[1.75] text-ink-muted">{c.description}</p>
              <p className="mt-4 text-xs text-ink-faint">{c.count} 册</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
