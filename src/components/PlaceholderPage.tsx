export function PlaceholderPage({
  title,
  note,
}: {
  title: string;
  note: string;
}) {
  return (
    <section className="mx-auto max-w-3xl px-5 py-24 md:px-8">
      <p className="mb-3 text-xs tracking-[0.2em] text-ink-faint">第二迭代</p>
      <h1 className="font-serif text-3xl tracking-[0.04em] text-ink md:text-4xl">
        {title}
      </h1>
      <p className="mt-5 text-[15px] leading-[1.8] text-ink-muted">{note}</p>
      <div className="mt-10 border border-border bg-paper-card p-6">
        <p className="text-sm text-ink-muted">
          本页将于下一迭代完整呈现。您可先浏览
          <a href="/" className="mx-1 text-cinnabar hover:underline">
            首页
          </a>
          、
          <a href="/about" className="mx-1 text-cinnabar hover:underline">
            关于我们
          </a>
          与
          <a href="/services" className="mx-1 text-cinnabar hover:underline">
            服务矩阵
          </a>
          。
        </p>
      </div>
    </section>
  );
}
