import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "慈善",
  description: "启明慈善版块建设中。",
};

export default function CharityPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-20 md:px-8">
      <p className="text-xs tracking-[0.2em] text-cinnabar">CHARITY</p>
      <h1 className="mt-3 font-serif text-3xl tracking-[0.04em] md:text-4xl">
        慈善版块建设中
      </h1>
      <p className="mt-5 text-[15px] leading-[1.85] text-ink-muted">
        启明以社会企业原则运营：约 50% 相关运营盈余将投入公众启明与社会慈善项目。具体项目细节即将公布——我们宁可慢一点，也不做空洞的承诺。
      </p>
      <form className="mt-10 border border-border bg-paper-card p-6">
        <p className="font-serif text-lg">关注更新</p>
        <p className="mt-2 text-sm text-ink-muted">留下邮箱，项目公布时我们会通知你。</p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            required
            placeholder="you@example.com"
            className="flex-1 border border-border bg-paper px-3 py-2 text-sm outline-none focus:border-cinnabar"
          />
          <button type="submit" className="btn-primary">
            订阅
          </button>
        </div>
      </form>
      <Link href="/register" className="mt-8 inline-block text-sm text-cinnabar hover:underline">
        同时成为会员 →
      </Link>
    </section>
  );
}
