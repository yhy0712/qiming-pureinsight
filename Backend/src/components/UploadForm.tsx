"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const CATEGORIES = [
  { id: "finance", label: "金融学" },
  { id: "economics", label: "经济学" },
  { id: "psychology", label: "心理学" },
  { id: "science", label: "科学技术" },
  { id: "education", label: "教育" },
  { id: "philosophy", label: "哲学人文" },
  { id: "society", label: "社会议题" },
  { id: "general", label: "综合" },
];

export function UploadForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("finance");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOk("");
    try {
      const res = await fetch("/api/articles/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, category, content }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "投稿失败");
      setOk("已提交，等待核实。核实通过后文章上架，并赠你 1 次免费阅读。");
      setTitle("");
      setContent("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "投稿失败");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-4">
      <label className="block text-sm">
        <span className="text-ink-muted">标题</span>
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 w-full border border-border bg-paper-card px-3 py-2 outline-none focus:border-cinnabar"
        />
      </label>
      <label className="block text-sm">
        <span className="text-ink-muted">分类</span>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 w-full border border-border bg-paper-card px-3 py-2 outline-none focus:border-cinnabar"
        >
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm">
        <span className="text-ink-muted">正文</span>
        <textarea
          required
          rows={14}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-1 w-full border border-border bg-paper-card px-3 py-2 font-sans leading-[1.75] outline-none focus:border-cinnabar"
          placeholder="粘贴或撰写全文…"
        />
      </label>
      {error && <p className="text-sm text-cinnabar">{error}</p>}
      {ok && <p className="text-sm text-ink">{ok}</p>}
      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? "提交中…" : "提交核实"}
      </button>
    </form>
  );
}
