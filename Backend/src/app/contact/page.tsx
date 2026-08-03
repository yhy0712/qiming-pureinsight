import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "联系",
  description: "联系启明 · 香港与上海。",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
      <p className="text-xs tracking-[0.2em] text-cinnabar">CONTACT</p>
      <h1 className="mt-3 font-serif text-3xl tracking-[0.04em] md:text-4xl">联系我们</h1>
      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <form className="space-y-4 border border-border bg-paper-card p-6">
          <label className="block text-sm">
            <span className="text-ink-muted">姓名</span>
            <input
              required
              className="mt-1 w-full border border-border bg-paper px-3 py-2 outline-none focus:border-cinnabar"
            />
          </label>
          <label className="block text-sm">
            <span className="text-ink-muted">邮箱</span>
            <input
              required
              type="email"
              className="mt-1 w-full border border-border bg-paper px-3 py-2 outline-none focus:border-cinnabar"
            />
          </label>
          <label className="block text-sm">
            <span className="text-ink-muted">身份类型</span>
            <select className="mt-1 w-full border border-border bg-paper px-3 py-2 outline-none focus:border-cinnabar">
              <option>个人会员意向</option>
              <option>捐赠人 / 投资人</option>
              <option>合作伙伴</option>
              <option>媒体 / 其他</option>
            </select>
          </label>
          <label className="block text-sm">
            <span className="text-ink-muted">留言</span>
            <textarea
              required
              rows={5}
              className="mt-1 w-full border border-border bg-paper px-3 py-2 outline-none focus:border-cinnabar"
            />
          </label>
          <button type="submit" className="btn-primary">
            发送（演示）
          </button>
        </form>
        <div className="space-y-6 text-sm text-ink-muted">
          <div>
            <h2 className="font-serif text-lg text-ink">香港</h2>
            <p className="mt-2 leading-relaxed">地址占位：中环金融区（待更新）</p>
          </div>
          <div>
            <h2 className="font-serif text-lg text-ink">上海</h2>
            <p className="mt-2 leading-relaxed">地址占位：滴水湖周边构想（待更新）</p>
          </div>
          <div>
            <h2 className="font-serif text-lg text-ink">邮件</h2>
            <a
              href="mailto:contact@pureinsight.hk"
              className="mt-2 inline-block text-cinnabar hover:underline"
            >
              contact@pureinsight.hk
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
