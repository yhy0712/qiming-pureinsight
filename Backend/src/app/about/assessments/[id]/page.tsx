import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAssessments } from "@/lib/data/catalog";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return getAssessments().map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const a = getAssessments().find((x) => x.id === id);
  return { title: a ? a.title : "测评" };
}

export default async function AssessmentDetailPage({ params }: Props) {
  const { id } = await params;
  const assessment = getAssessments().find((x) => x.id === id);
  if (!assessment) notFound();

  return (
    <section className="mx-auto max-w-2xl px-5 py-16 md:px-8">
      <p className="text-xs tracking-[0.2em] text-cinnabar">占位测评流程</p>
      <h1 className="mt-3 font-serif text-3xl tracking-[0.04em]">{assessment.title}</h1>
      <p className="mt-4 text-[15px] leading-[1.85] text-ink-muted">{assessment.summary}</p>
      <div className="mt-8 border border-border bg-paper-card p-6">
        <p className="text-sm text-ink-muted">
          题库内容标注为「待接入认证测评供应商」。以下为维度示意，非真实计分题。
        </p>
        <ul className="mt-4 space-y-3">
          {assessment.dimensions.map((d, i) => (
            <li key={d} className="border border-border bg-paper px-4 py-3 text-sm">
              <span className="text-ink-faint">示例题 {i + 1} · {d}</span>
              <p className="mt-2 text-ink-muted">
                （原创占位）请用 1–5 分评估自己在「{d}」上的近期状态。正式题目将替换此处。
              </p>
            </li>
          ))}
        </ul>
        <button type="button" className="btn-primary mt-6" disabled>
          提交（待接入）
        </button>
      </div>
      <Link href="/about/assessments" className="mt-8 inline-block text-sm text-cinnabar hover:underline">
        ← 返回测评中心
      </Link>
    </section>
  );
}
