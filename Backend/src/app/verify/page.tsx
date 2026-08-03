import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { readDb } from "@/lib/db/store";
import { listPendingArticles } from "@/lib/user-articles";
import { VerifyClient } from "@/components/VerifyClient";

export const metadata = {
  title: "核实稿件",
};

export default async function VerifyPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/verify");
  if (user.role !== "admin") redirect("/community");

  const pending = listPendingArticles();
  const db = readDb();
  const rows = pending.map((a) => ({
    ...a,
    authorName: db.users.find((u) => u.id === a.authorId)?.name || "未知",
  }));

  return (
    <section className="mx-auto max-w-3xl px-5 py-14 md:px-8">
      <p className="text-xs tracking-[0.2em] text-cinnabar">REVIEW</p>
      <h1 className="mt-3 font-serif text-3xl tracking-[0.04em]">核实投稿</h1>
      <p className="mt-4 text-sm text-ink-muted">
        通过后文章上架到阅读专栏，作者自动获得 1 次免费阅读。
      </p>
      <VerifyClient articles={rows} />
    </section>
  );
}
