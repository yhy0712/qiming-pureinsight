"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/auth/AuthProvider";
import { useLocale } from "@/lib/i18n/LocaleProvider";

type Props = {
  slug: string;
};

export function ArticlePaywall({ slug }: Props) {
  const { t } = useLocale();
  const { user, refresh } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState<"paid" | "credit" | null>(null);
  const [error, setError] = useState("");

  async function unlock(method: "paid" | "credit") {
    if (!user) {
      router.push(`/login?next=${encodeURIComponent(pathname)}`);
      return;
    }
    setLoading(method);
    setError("");
    try {
      const res = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, method }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "解锁失败");
      await refresh();
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "解锁失败");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="relative mt-2 border border-border bg-paper-card p-6 text-center md:p-8">
      <p className="text-xs tracking-[0.18em] text-ink-faint">FULL TEXT</p>
      <h3 className="mt-3 font-serif text-xl tracking-[0.03em] text-ink">
        {t.articles.unlock}
      </h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-muted">
        以上为首页预览。登录后可支付 USD 9.99 解锁全文；若你有投稿并通过核实，可使用免费阅读次数。
      </p>

      {!user ? (
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href={`/login?next=${encodeURIComponent(pathname)}`}
            className="btn-primary"
          >
            登录后解锁
          </Link>
          <Link
            href={`/register?next=${encodeURIComponent(pathname)}`}
            className="btn-secondary"
          >
            注册账号
          </Link>
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-center gap-3">
          <p className="text-xs text-ink-faint">
            免费阅读余额：{user.freeReads}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              className="btn-primary disabled:opacity-60"
              disabled={loading !== null}
              onClick={() => unlock("paid")}
            >
              {loading === "paid" ? t.articles.paying : t.articles.demoPay}
            </button>
            <button
              type="button"
              className="btn-secondary disabled:opacity-60"
              disabled={loading !== null || user.freeReads < 1}
              onClick={() => unlock("credit")}
            >
              {loading === "credit" ? t.articles.paying : "使用免费阅读"}
            </button>
          </div>
          <Link href="/upload" className="text-xs text-cinnabar hover:underline">
            投稿核实后可获赠免费阅读 →
          </Link>
        </div>
      )}
      {error && <p className="mt-3 text-sm text-cinnabar">{error}</p>}
    </div>
  );
}
