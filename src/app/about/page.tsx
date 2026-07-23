import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "关于我们",
  description:
    "香港聃清信息咨询有限公司（启明 QIMING · PureInsight）——以老子思想为灵魂，以未来学院为平台的认知与赋能服务商。",
};

const strategies = [
  {
    horizon: "短期 · 1–2 年",
    title: "构建平台与社群",
    items: [
      "构建线上内容平台（付费阅读、故事会）",
      "推出核心测评与咨询产品（风险、保险、职涯、健康）",
      "建立首批「启明」社群",
    ],
  },
  {
    horizon: "中期 · 3–5 年",
    title: "设立人类未来学院",
    items: [
      "线上+线下学院形态落地",
      "开展教育、培训与高端论坛（三人行对话）",
      "孵化「慈善平台公司」",
    ],
  },
  {
    horizon: "长期 · 5 年以上",
    title: "成为全球智库",
    items: [
      "成为信任经济学与保障经济学领先智库",
      "发行遗产券、工时券、慈善券等社会金融工具",
      "推动政策创新与全球社区创建",
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="关于我们"
        description="一家以老子思想为灵魂、以未来学院为平台的认知与赋能服务商。植根东方智慧，融合金融、科技与人文，以社会企业原则运营。"
        primaryHref="/join"
        primaryLabel="成为同路人"
        secondaryHref="/services"
        secondaryLabel="了解服务"
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <p className="mb-3 text-xs tracking-[0.2em] text-cinnabar">公司简介</p>
          <h2 className="font-serif text-2xl tracking-[0.04em] md:text-[28px]">
            战略定位
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div className="space-y-4 text-[15px] leading-[1.85] text-ink-muted">
              <p>
                <span className="text-ink">{company.legalName}</span>
                （{company.legalNameEn}）是私人股份有限公司，以社会企业原则运营。品牌代号「启明
                QIMING」，英文 PureInsight。
              </p>
              <p>
                「聃清」与「启明」承载对父亲与老子智慧的传承与敬意。我们开创性地采用「捐赠人即投资人」治理模式：接受捐赠，服务社会；捐赠资金的
                50% 直接用于大众启明与慈善，另 50% 注入公司可持续运营。
              </p>
            </div>
            <blockquote className="border-l-2 border-cinnabar bg-paper-card px-6 py-5">
              <p className="font-serif text-lg leading-relaxed tracking-[0.04em] text-ink">
                「{company.values}」
              </p>
              <p className="mt-4 text-sm text-ink-faint">核心价值观</p>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-paper-card/50">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <p className="mb-3 text-xs tracking-[0.2em] text-cinnabar">双城引擎</p>
          <h2 className="font-serif text-2xl tracking-[0.04em] md:text-[28px]">
            为何选择香港与上海
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="card-accent p-6">
              <h3 className="font-serif text-xl tracking-[0.04em]">香港</h3>
              <p className="mt-4 text-[15px] leading-[1.8] text-ink-muted">
                国际金融中心，资本与法治的枢纽，便于处理全球捐赠、投资与知识产权，是连接东西方思想的桥梁。
              </p>
            </article>
            <article className="card-accent p-6">
              <h3 className="font-serif text-xl tracking-[0.04em]">上海</h3>
              <p className="mt-4 text-[15px] leading-[1.8] text-ink-muted">
                中国大陆的创新前沿与人文高地，贴近市场与人才；滴水湖构想中，「人类未来学院」物理承载的理想之地。
              </p>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <p className="mb-3 text-xs tracking-[0.2em] text-cinnabar">战略时间轴</p>
          <h2 className="font-serif text-2xl tracking-[0.04em] md:text-[28px]">
            短期 · 中期 · 长期
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {strategies.map((s) => (
              <article key={s.horizon} className="card-accent p-6">
                <p className="text-xs tracking-[0.14em] text-ink-faint">{s.horizon}</p>
                <h3 className="mt-2 font-serif text-lg tracking-[0.03em]">{s.title}</h3>
                <ul className="mt-5 space-y-3">
                  {s.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-[1.75] text-ink-muted"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 bg-cinnabar" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
