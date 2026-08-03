import type { Metadata } from "next";
import Link from "next/link";
import { IconClock, IconLock, IconUser } from "@tabler/icons-react";
import { getAssessments } from "@/lib/data/catalog";

export const metadata: Metadata = {
  title: "测评中心",
  description: "认知与情感测评入口。题库为原创占位框架，正式内容待接入认证供应商。",
};

export default function AssessmentsPage() {
  const assessments = getAssessments();

  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <p className="mb-4 text-xs tracking-[0.22em] text-ink-faint">ABOUT · ASSESSMENTS</p>
          <h1 className="font-serif text-[32px] tracking-[0.04em] md:text-[40px]">
            认知与情感测评中心
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-[1.85] text-ink-muted">
            我们参考常见测评的「维度框架」设计原创占位题库，
            <strong className="font-normal text-ink">
              不抓取、不照搬受版权保护的专业量表原文
            </strong>
            。正式题库标注为待接入认证测评供应商。
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
        <div className="grid gap-5 md:grid-cols-2">
          {assessments.map((a) => (
            <article key={a.id} className="card-accent flex flex-col p-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="border border-border bg-cinnabar-soft/50 px-2 py-0.5 text-xs text-cinnabar">
                  {a.status === "placeholder" ? "占位题库" : "正式"}
                </span>
                {a.requiresAuth && (
                  <span className="inline-flex items-center gap-1 text-xs text-ink-faint">
                    <IconUser size={12} /> 需注册
                  </span>
                )}
                {a.requiresPayment && (
                  <span className="inline-flex items-center gap-1 text-xs text-ink-faint">
                    <IconLock size={12} /> 会员权益
                  </span>
                )}
              </div>
              <h2 className="mt-4 font-serif text-xl text-ink">{a.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-[1.75] text-ink-muted">
                {a.summary}
              </p>
              <p className="mt-4 text-xs text-ink-faint">
                维度：{a.dimensions.join(" · ")}
              </p>
              <p className="mt-2 inline-flex items-center gap-1 text-xs text-ink-faint">
                <IconClock size={12} /> 约 {a.durationMinutes} 分钟
              </p>
              <Link
                href={`/about/assessments/${a.id}`}
                className="btn-primary mt-6 self-start"
              >
                开始测评
              </Link>
            </article>
          ))}
        </div>
        <p className="mt-10 border border-border bg-paper-card px-4 py-3 text-sm text-ink-muted">
          提示：当前为交互框架演示。正式商业授权量表需另行签约接入，请勿将占位题目视为标准化测验结果。
        </p>
      </section>
    </>
  );
}
