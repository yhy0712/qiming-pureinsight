"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useMemo, useState } from "react";
import type { MembershipTier } from "@/lib/data/types";

const STEPS = ["身份", "会员等级", "基本信息", "支付", "完成"] as const;

type FormState = {
  identity: string;
  tier: string;
  name: string;
  email: string;
  note: string;
  paymentMethod: string;
};

function RegisterWizard({ memberships }: { memberships: MembershipTier[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const initialTier = params.get("tier") || "free";

  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>({
    identity: "individual",
    tier: initialTier,
    name: "",
    email: "",
    note: "",
    paymentMethod: "stripe_test",
  });

  const selected = useMemo(
    () => memberships.find((m) => m.code === form.tier) || memberships[0],
    [form.tier, memberships],
  );

  const needsPayment = !!selected && selected.price !== null && selected.price > 0;

  function next() {
    if (step === 1 && form.tier === "partner") {
      // partner still goes through info
    }
    if (step === 2 && !needsPayment) {
      setStep(4);
      return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function back() {
    if (step === 4 && !needsPayment) {
      setStep(2);
      return;
    }
    setStep((s) => Math.max(s - 1, 0));
  }

  async function finish(e: FormEvent) {
    e.preventDefault();
    // 前端流程演示：可顺带调用既有注册 API（可选）
    try {
      await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: "change-me-later",
        }),
      });
    } catch {
      // ignore — 流程仍可完成
    }
    setStep(4);
  }

  return (
    <section className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-16">
      <p className="text-xs tracking-[0.2em] text-cinnabar">REGISTER</p>
      <h1 className="mt-3 font-serif text-3xl tracking-[0.04em]">注册启明会员</h1>
      <p className="mt-3 text-sm leading-relaxed text-ink-muted">
        付费入口设于本流程。支付网关为 Stripe 测试模式占位，不会真实扣款。
      </p>

      <ol className="mt-8 flex flex-wrap gap-2">
        {STEPS.map((label, i) => (
          <li
            key={label}
            className={`border px-3 py-1.5 text-xs tracking-wide ${
              i === step
                ? "border-cinnabar bg-cinnabar text-paper-card"
                : i < step
                  ? "border-cinnabar/40 text-cinnabar"
                  : "border-border text-ink-faint"
            }`}
          >
            {i + 1}. {label}
          </li>
        ))}
      </ol>

      <div className="mt-10 border border-border bg-paper-card p-6 md:p-8">
        {step === 0 && (
          <div className="space-y-4">
            <h2 className="font-serif text-xl">你的身份</h2>
            {[
              { id: "individual", label: "个人会员" },
              { id: "family", label: "家庭 / 照护需求者" },
              { id: "org", label: "企业或机构代表" },
            ].map((opt) => (
              <label
                key={opt.id}
                className={`flex cursor-pointer items-center gap-3 border px-4 py-3 ${
                  form.identity === opt.id ? "border-cinnabar bg-cinnabar-soft/40" : "border-border"
                }`}
              >
                <input
                  type="radio"
                  name="identity"
                  checked={form.identity === opt.id}
                  onChange={() => setForm({ ...form, identity: opt.id })}
                />
                <span className="text-sm">{opt.label}</span>
              </label>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="font-serif text-xl">选择会员等级</h2>
            <p className="text-sm text-ink-muted">付费选项在此选择，而非单独定价页。</p>
            <div className="grid gap-4">
              {memberships.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setForm({ ...form, tier: m.code })}
                  className={`border p-5 text-left transition-colors ${
                    form.tier === m.code
                      ? "border-cinnabar bg-cinnabar-soft/30"
                      : "border-border hover:border-cinnabar/50"
                  }`}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-serif text-lg">{m.name}</h3>
                    <span className="text-sm text-cinnabar">{m.priceLabel}</span>
                  </div>
                  <p className="mt-2 text-xs text-ink-faint">{m.audience}</p>
                  <ul className="mt-3 space-y-1">
                    {m.benefits.map((b) => (
                      <li key={b} className="flex gap-2 text-sm text-ink-muted">
                        <span className="mt-2 h-1 w-1 shrink-0 bg-cinnabar" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); next(); }}>
            <h2 className="font-serif text-xl">基本信息</h2>
            <label className="block text-sm">
              <span className="text-ink-muted">姓名</span>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1 w-full border border-border bg-paper px-3 py-2 outline-none focus:border-cinnabar"
              />
            </label>
            <label className="block text-sm">
              <span className="text-ink-muted">邮箱</span>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1 w-full border border-border bg-paper px-3 py-2 outline-none focus:border-cinnabar"
              />
            </label>
            <label className="block text-sm">
              <span className="text-ink-muted">留言（可选）</span>
              <textarea
                rows={3}
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                className="mt-1 w-full border border-border bg-paper px-3 py-2 outline-none focus:border-cinnabar"
              />
            </label>
            <p className="text-xs text-ink-faint">已选：{selected?.name}</p>
            <button type="submit" className="hidden" id="info-next" />
          </form>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="font-serif text-xl">支付方式（占位）</h2>
            <p className="text-sm text-ink-muted">
              Stripe 测试模式占位组件。金额：{selected?.priceLabel}
            </p>
            <div className="border border-dashed border-border bg-paper px-4 py-8 text-center text-sm text-ink-faint">
              [ Stripe Payment Element Placeholder ]
              <br />
              测试卡号示意：4242 ···· 4242
            </div>
            {[
              { id: "stripe_test", label: "Stripe 测试卡" },
              { id: "bank_transfer", label: "银行转账（人工确认）" },
            ].map((p) => (
              <label
                key={p.id}
                className={`flex cursor-pointer items-center gap-3 border px-4 py-3 ${
                  form.paymentMethod === p.id ? "border-cinnabar" : "border-border"
                }`}
              >
                <input
                  type="radio"
                  checked={form.paymentMethod === p.id}
                  onChange={() => setForm({ ...form, paymentMethod: p.id })}
                />
                <span className="text-sm">{p.label}</span>
              </label>
            ))}
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4 text-center">
            <h2 className="font-serif text-2xl">欢迎加入启明</h2>
            <p className="text-sm leading-relaxed text-ink-muted">
              {form.name || "同路人"}，你已选择「{selected?.name}」。
              {needsPayment
                ? "支付为演示占位，未发生真实扣款。"
                : "免费体验权益已就绪。"}
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <Link href="/community" className="btn-primary">
                进入社群
              </Link>
              <Link href="/about/assessments" className="btn-secondary">
                去测评中心
              </Link>
              <button
                type="button"
                className="text-sm text-ink-muted underline"
                onClick={() => router.push("/")}
              >
                返回首页
              </button>
            </div>
          </div>
        )}

        {step < 4 && (
          <div className="mt-8 flex justify-between gap-3">
            <button
              type="button"
              className="btn-secondary"
              onClick={back}
              disabled={step === 0}
            >
              上一步
            </button>
            {step === 2 ? (
              <button
                type="button"
                className="btn-primary"
                onClick={() => {
                  if (!form.name.trim() || !form.email.trim()) return;
                  next();
                }}
              >
                下一步
              </button>
            ) : step === 3 ? (
              <button type="button" className="btn-primary" onClick={finish}>
                确认并完成
              </button>
            ) : (
              <button type="button" className="btn-primary" onClick={next}>
                下一步
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export function RegisterPageClient({ memberships }: { memberships: MembershipTier[] }) {
  return (
    <Suspense fallback={<div className="p-16 text-center text-ink-muted">加载注册流程…</div>}>
      <RegisterWizard memberships={memberships} />
    </Suspense>
  );
}
