import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "服务矩阵",
  description:
    "围绕认知、财富、健康、幸福四大基石，构建全生命周期服务体系——五大板块形成闭环生态。",
};

const sections = [
  {
    id: "cognition",
    num: "01",
    title: "认知与启明",
    subtitle: "认知提升平台",
    audience: "职场人士 · 婚恋人士 · 学生",
    points: [
      {
        label: "阅读社群",
        text: "免费与付费结合的深度内容：解读《易经》、《穷查理年鉴》、AI 前沿、经济周期等。",
      },
      {
        label: "故事会",
        text: "「磨难历练人类故事 100 篇」等有声内容与课程，以叙事传递智慧。",
      },
      {
        label: "测评反馈",
        text: "情商、智商、财商、逆商等测评，与荐书结合，针对性提升认知深度与广度。",
      },
      {
        label: "三人行论坛",
        text: "老子、柏拉图、哈萨比斯等跨时空思想实验，与当代实践者对话。",
      },
    ],
  },
  {
    id: "finance",
    num: "02",
    title: "理财与保障",
    subtitle: "信任 · 保障经济学实践",
    audience: "家庭与个人 · 关注风险与长期配置者",
    points: [
      {
        label: "保险缺口分析",
        text: "作为独立咨询专家，为家庭与个人诊断风险敞口。",
      },
      {
        label: "资产配置模型",
        text: "基于风险管理的投资组合，投资于 AI 时代赢家，并以机制设计避免「赢家通吃」。",
      },
      {
        label: "创新金融工具",
        text: "研究并倡导遗产券、工时券、慈善券，以及基本收入 UBI 试验计划。",
      },
    ],
  },
  {
    id: "health",
    num: "03",
    title: "健康与养老",
    subtitle: "老有所依，少有所养",
    audience: "全生命周期 · 家庭关键节点",
    points: [
      {
        label: "身心健康管理",
        text: "整合营养、运动、正念，提供「养心健脑强身」方案。",
      },
      {
        label: "养老规划",
        text: "财务、医疗、精神陪伴的综合养老方案。",
      },
      {
        label: "婚恋与家庭教育",
        text: "初为人母、初入职场等人生关键节点的支持与咨询。",
      },
    ],
  },
  {
    id: "network",
    num: "04",
    title: "链接需求平台",
    subtitle: "互通有无 · 共建信任",
    audience: "社群成员 · 合作者 · 互助需求方",
    points: [
      {
        label: "多元链接",
        text: "婚恋链接、慈善互助、生意合作、教育培训、金融服务等需求对接。",
      },
      {
        label: "信用评估体系",
        text: "信誉分、慈善分等人品与信用评估，配合担保架构，降低逆向选择风险。",
      },
      {
        label: "慈善关怀",
        text: "重点关注鳏寡孤独等群体，以平台力量践行互助。",
      },
    ],
  },
  {
    id: "academy",
    num: "05",
    title: "人类未来学院",
    subtitle: "思想库与实践场",
    audience: "研究者 · 创业者 · 青少年 · 政策关注者",
    points: [
      {
        label: "论题研究",
        text: "公开发布私有财产保护、遗产税、公平与效率等议题研究报告。",
      },
      {
        label: "慈善平台公司",
        text: "校长/老师推荐 + 公开测试，选拔资助不富裕家庭的优秀创业者。",
      },
      {
        label: "教育项目",
        text: "为 12–18 岁青少年提供「启智、启仁、启明」寒暑期学校。",
      },
      {
        label: "全球特区研究",
        text: "探讨贫困地区特区可能性，探索全球法与创新治理模式。",
      },
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="服务矩阵"
        description="围绕「认知、财富、健康、幸福」四大基石，五大板块形成闭环生态系统——市场化服务与社会使命并行。"
        primaryHref="/join"
        primaryLabel="预约咨询"
        secondaryHref="/academy"
        secondaryLabel="人类未来学院"
      />

      <nav
        className="sticky top-[65px] z-40 border-b border-border bg-paper/95 backdrop-blur-sm"
        aria-label="服务板块锚点"
      >
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-5 py-3 md:px-8">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="shrink-0 px-3 py-1.5 text-sm tracking-wide text-ink-muted transition-colors hover:text-cinnabar"
            >
              {s.title}
            </a>
          ))}
        </div>
      </nav>

      {sections.map((section, idx) => (
        <section
          key={section.id}
          id={section.id}
          className={`scroll-mt-32 border-b border-border ${
            idx % 2 === 1 ? "bg-paper-card/50" : ""
          }`}
        >
          <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
            <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-6">
              <span className="font-serif text-3xl text-cinnabar/35">{section.num}</span>
              <div>
                <h2 className="font-serif text-2xl tracking-[0.04em] md:text-[28px]">
                  {section.title}
                </h2>
                <p className="mt-1 text-sm tracking-wide text-ink-faint">
                  {section.subtitle}
                </p>
              </div>
            </div>

            <p className="mt-6 inline-block border border-border bg-paper-card px-3 py-1.5 text-xs tracking-wide text-ink-muted">
              目标客群：{section.audience}
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {section.points.map((p) => (
                <article key={p.label} className="card-accent p-5">
                  <h3 className="font-serif text-lg tracking-[0.03em]">{p.label}</h3>
                  <p className="mt-3 text-[15px] leading-[1.8] text-ink-muted">
                    {p.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
