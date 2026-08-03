import type { Metadata } from "next";
import Link from "next/link";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "认识启明",
  description: "保障经济学叙事、品牌理念与创始团队简介。",
};

export default function AboutQimingPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <p className="mb-4 text-xs tracking-[0.22em] text-ink-faint">ABOUT · QIMING</p>
          <h1 className="max-w-3xl font-serif text-[32px] leading-tight tracking-[0.04em] md:text-[40px]">
            认识启明
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-[1.85] text-ink-muted md:text-base">
            {company.legalName}（{company.pureInsight}）以老子思想为魂，以保障经济学为底，建设轻会员制社群与资源链接平台。
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <p className="mb-3 text-xs tracking-[0.2em] text-cinnabar">核心理念</p>
          <h2 className="font-serif text-2xl tracking-[0.04em] md:text-[28px]">
            保障经济学 Security Economics
          </h2>
          <div className="mt-8 space-y-5 text-[15px] leading-[1.85] text-ink-muted">
            <p>
              后AI时代，自动化将重塑就业。社会或将出现「返璞归真」的图景：物质更丰裕、基础保障更普及，人们更多依靠手艺、小生意与兴趣专长谋生。与此同时，情感连接与社群归属可能更稀薄。
            </p>
            <p>
              启明要做的，是在转型期用平台重建连接与保障——不止保险与资产配置，更有认知、情感与社群层面的托底。我们采用「捐赠人即投资人」模式：捐赠资金约一半用于公众启明与慈善，一半注入可持续运营。
            </p>
            <blockquote className="border-l-2 border-cinnabar bg-paper-card px-6 py-5 font-serif text-lg text-ink">
              「{company.values}」
            </blockquote>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-paper-card/50">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <p className="mb-3 text-xs tracking-[0.2em] text-cinnabar">双城</p>
          <h2 className="font-serif text-2xl tracking-[0.04em]">香港 · 上海</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <article className="card-accent p-6">
              <h3 className="font-serif text-xl">香港</h3>
              <p className="mt-3 text-[15px] leading-[1.8] text-ink-muted">
                国际金融与法治枢纽，便于处理全球捐赠、投资与知识产权，连接东西方思想。
              </p>
            </article>
            <article className="card-accent p-6">
              <h3 className="font-serif text-xl">上海</h3>
              <p className="mt-3 text-[15px] leading-[1.8] text-ink-muted">
                贴近大陆市场与人才；人类未来学院的理想物理承载之一。
              </p>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <p className="mb-3 text-xs tracking-[0.2em] text-cinnabar">创始团队</p>
          <h2 className="font-serif text-2xl tracking-[0.04em]">核心同伴</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "杨金", role: "哈工大本硕 · 复旦 EMBA" },
              { name: "王晓威", role: "华师大 · 同济中法合作 MBA" },
              { name: "张琪琳", role: "香港中文大学法律博士" },
              { name: "杨华宇", role: "多伦多大学数学与统计本硕" },
            ].map((p) => (
              <article key={p.name} className="card-accent p-5">
                <h3 className="font-serif text-lg">{p.name}</h3>
                <p className="mt-2 text-sm text-ink-muted">{p.role}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 text-sm text-ink-faint">
            CEO、内容与教育总监、科技与 AI 总监等岗位虚位以待。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/about/assessments" className="btn-primary">
              进入测评中心
            </Link>
            <Link href="/register" className="btn-secondary">
              注册会员
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
