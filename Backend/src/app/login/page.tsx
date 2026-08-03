"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import { useAuth } from "@/lib/auth/AuthProvider";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/community";
  const { refresh } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "登录失败");
      await refresh();
      router.push(next);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "登录失败");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-md px-5 py-16 md:px-8">
      <p className="text-xs tracking-[0.2em] text-cinnabar">MEMBER LOGIN</p>
      <h1 className="mt-3 font-serif text-3xl tracking-[0.04em]">登录启明社群</h1>
      <p className="mt-3 text-sm leading-relaxed text-ink-muted">
        登录后可加入社群、加好友、投稿，并解锁全文阅读。
      </p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <label className="block text-sm">
          <span className="text-ink-muted">邮箱</span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full border border-border bg-paper-card px-3 py-2 outline-none focus:border-cinnabar"
          />
        </label>
        <label className="block text-sm">
          <span className="text-ink-muted">密码</span>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full border border-border bg-paper-card px-3 py-2 outline-none focus:border-cinnabar"
          />
        </label>
        {error && <p className="text-sm text-cinnabar">{error}</p>}
        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? "登录中…" : "登录"}
        </button>
      </form>
      <p className="mt-6 text-sm text-ink-muted">
        还没有账号？
        <Link href={`/register?next=${encodeURIComponent(next)}`} className="ml-1 text-cinnabar hover:underline">
          注册
        </Link>
      </p>
    </section>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-16 text-center text-ink-muted">加载中…</div>}>
      <LoginForm />
    </Suspense>
  );
}
