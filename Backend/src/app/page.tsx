import Link from "next/link";
import {
  IconBrain,
  IconBuildingCommunity,
  IconHeartHandshake,
  IconShieldHeart,
} from "@tabler/icons-react";

const pillars = [
  {
    title: "认知保障",
    desc: "测评 · 阅读 · 三人行对话",
    detail: "在信息洪流中区分欲望与选择，建立可依赖的认知防火墙。",
    icon: IconBrain,
  },
  {
    title: "财务保障",
    desc: "保险 · 资产配置 · 长期规划",
    detail: "以信任经济学帮助家庭识别风险敞口，配置面向后AI时代的资产。",
    icon: IconShieldHeart,
  },
  {
    title: "情感与照护",
    desc: "婚恋 · 养老 · 异地照料",
    detail: "连接陪伴、健康与家庭资源——尤其服务异地子女与50+群体。",
    icon: IconHeartHandshake,
  },
  {
    title: "社群连接",
    desc: "匠人网络 · 会员社群 · 资源库",
    detail: "物质丰裕之后，重建稀薄的情感连接与归属感。",
    icon: IconBuildingCommunity,
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border watermark-cloud">
        <div className="mx-auto max-w-6xl px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24">
          <div className="fade-up flex flex-col items-start gap-8">
            <div className="flex items-center gap-4">
              <span className="seal text-xl" style={{ width: "3.25rem", height: "3.25rem" }}>
                道
              </span>
              <p className="text-xs tracking-[0.28em] text-ink-faint md:text-[13px]">
                PUREINSIGHT · 香港 · 上海
              </p>
            </div>
            <h1 className="max-w-3xl font-serif text-[32px] leading-[1.35] tracking-[0.04em] text-ink md:text-[40px]">
              后AI时代，重建连接与保障
            </h1>
            <p className="max-w-2xl text-[15px] leading-[1.85] text-ink-muted md:text-base">
              启明是一家以保障经济学为底色的社会型企业：物质将更丰裕，而情感、认知与社群的保障，需要被重新设计。
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/about/qiming" className="btn-primary">
                认识启明
              </Link>
              <Link href="/register" className="btn-secondary">
                成为会员
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <p className="mb-3 text-xs tracking-[0.2em] text-cinnabar">SECURITY ECONOMICS</p>
          <h2 className="font-serif text-2xl tracking-[0.04em] md:text-[28px]">
            保障经济学：我们为何出发
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <p className="text-[15px] leading-[1.85] text-ink-muted">
              在后AI时代，大量传统岗位将被自动化取代。社会可能呈现某种「返璞归真」：生产效率提升、政府提供基础托底，人们不再依附朝九晚五，而依靠手艺、小生意与兴趣专长为生。
            </p>
            <p className="text-[15px] leading-[1.85] text-ink-muted">
              物质丰裕并不自动带来归属。启明要以平台化方式重建人与人之间的连接与保障——财务保障之外，更有情感保障、认知保障与社群保障。
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-paper-card/60">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <p className="mb-3 text-xs tracking-[0.2em] text-cinnabar">四大保障</p>
          <h2 className="font-serif text-2xl tracking-[0.04em] md:text-[28px]">
            轻会员社群 · 资源链接平台
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => (
              <article key={p.title} className="card-accent flex flex-col p-5">
                <p.icon size={22} stroke={1.4} className="text-cinnabar" />
                <h3 className="mt-4 font-serif text-lg tracking-[0.03em]">{p.title}</h3>
                <p className="mt-2 text-xs tracking-wide text-ink-faint">{p.desc}</p>
                <p className="mt-4 flex-1 text-sm leading-[1.75] text-ink-muted">
                  {p.detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <p className="mb-3 text-xs tracking-[0.2em] text-cinnabar">为谁而建</p>
          <h2 className="font-serif text-2xl tracking-[0.04em] md:text-[28px]">
            典型同路人
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              "父母在国内、自己在海外/异地，需要照护与资源链接的人",
              "50岁以上，开始思考养老资源配置或愿意为陪伴付费的人群",
              "希望建立真实连接、寻找伴侣的年轻人",
              "对后AI时代社会形态感兴趣，愿进入社群讨论经济、金融与哲学的人",
            ].map((item) => (
              <li
                key={item}
                className="flex gap-3 border border-border bg-paper-card px-5 py-4 text-[15px] leading-[1.75] text-ink-muted"
              >
                <span className="mt-2 h-1 w-1 shrink-0 bg-cinnabar" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ink text-on-dark">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-16 md:flex-row md:items-end md:justify-between md:px-8 md:py-20">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.22em] text-on-dark-muted">INVITATION</p>
            <h2 className="mt-3 font-serif text-2xl tracking-[0.04em] md:text-[28px]">
              先成为会员，再进入连接
            </h2>
            <p className="mt-4 text-[15px] leading-[1.85] text-on-dark-muted">
              付费入口设在「注册」流程中。你可以先以体验会员进入，或选择启明会员 / 荣誉会员，获取测评、资源匹配与闭门对话等权益。
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/register"
              className="inline-flex border border-on-dark bg-on-dark px-5 py-3 text-sm text-ink"
            >
              开始注册
            </Link>
            <Link
              href="/about/assessments"
              className="inline-flex border border-on-dark/40 px-5 py-3 text-sm text-on-dark"
            >
              浏览测评
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
