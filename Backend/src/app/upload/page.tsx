import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { listMyArticles } from "@/lib/user-articles";
import { UploadForm } from "@/components/UploadForm";

export const metadata = {
  title: "投稿",
  description: "上传文章，核实通过后上架，并获得一次免费阅读。",
};

export default async function UploadPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/upload");
  const mine = listMyArticles(user.id);

  return (
    <section className="mx-auto max-w-3xl px-5 py-14 md:px-8">
      <p className="text-xs tracking-[0.2em] text-cinnabar">CONTRIBUTE</p>
      <h1 className="mt-3 font-serif text-3xl tracking-[0.04em]">上传文章</h1>
      <p className="mt-4 text-[15px] leading-[1.8] text-ink-muted">
        投稿经核实后将出现在阅读专栏；同时你会获得 <strong>1 次免费阅读</strong>
        ，可解锁任意一篇付费全文。
      </p>
      <UploadForm />
      <div className="mt-12">
        <h2 className="font-serif text-xl">我的稿件</h2>
        <ul className="mt-4 divide-y divide-border border border-border">
          {mine.length === 0 && (
            <li className="px-4 py-5 text-sm text-ink-muted">还没有投稿。</li>
          )}
          {mine.map((a) => (
            <li key={a.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-4">
              <div>
                <p className="font-serif text-ink">{a.title}</p>
                <p className="text-xs text-ink-faint">{a.category}</p>
              </div>
              <span className="text-xs tracking-wide text-cinnabar">
                {a.status === "pending"
                  ? "待核实"
                  : a.status === "published"
                    ? "已上架"
                    : "未通过"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
