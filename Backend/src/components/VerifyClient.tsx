"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Row = {
  id: string;
  title: string;
  category: string;
  preview: string;
  authorName: string;
  createdAt: string;
};

export function VerifyClient({ articles }: { articles: Row[] }) {
  const router = useRouter();
  const [msg, setMsg] = useState("");

  async function act(articleId: string, action: "approve" | "reject") {
    setMsg("");
    const res = await fetch("/api/articles/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ articleId, action }),
    });
    const data = await res.json();
    if (!res.ok) {
      setMsg(data.error || "操作失败");
      return;
    }
    setMsg(data.message || "已处理");
    router.refresh();
  }

  if (articles.length === 0) {
    return <p className="mt-10 text-sm text-ink-muted">暂无待核实稿件。</p>;
  }

  return (
    <div className="mt-8 space-y-6">
      {msg && <p className="text-sm text-cinnabar">{msg}</p>}
      {articles.map((a) => (
        <article key={a.id} className="card-accent p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-serif text-xl">{a.title}</h2>
            <span className="text-xs text-ink-faint">{a.category}</span>
          </div>
          <p className="mt-2 text-xs text-ink-faint">
            作者：{a.authorName} · {new Date(a.createdAt).toLocaleString()}
          </p>
          <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-ink-muted">
            {a.preview}
          </p>
          <div className="mt-5 flex gap-3">
            <button
              type="button"
              className="btn-primary"
              onClick={() => act(a.id, "approve")}
            >
              核实上架
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => act(a.id, "reject")}
            >
              不通过
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
