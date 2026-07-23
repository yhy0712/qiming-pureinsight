import Link from "next/link";

const pillars = [
  {
    title: "认知与启明",
    desc: "测评 · 故事会 · 三人行对话",
    detail: "区分欲望与选择，在信息洪流中建立可依赖的认知防火墙。",
  },
  {
    title: "理财与保障",
    desc: "信任经济学实践",
    detail: "保险缺口分析、资产配置，以及遗产券、工时券、慈善券等创新工具。",
  },
  {
    title: "健康与养老",
    desc: "身心 · 规划 · 家庭",
    detail: "身心健康管理、养老规划与婚恋家庭咨询，守护全生命周期幸福。",
  },
  {
    title: "人类未来学院",
    desc: "思想库与实践场",
    detail: "论题研究、慈善平台公司孵化、青少年「启智启仁启明」教育项目。",
  },
];

const origins = [
  {
    label: "我们的由来",
    title: "Who we are",
    body: "「聃清」与「启明」，承载对父亲与老子智慧的传承与敬意。我们是一家植根东方智慧，融合现代金融、科技与人文科学的社会型企业。",
  },
  {
    label: "我们的使命",
    title: "What we do",
    body: "启明、理财、悦己、达人。核心业务是认知与幸福力的提升——助人在 AI 与机器人时代，区分欲望与选择，达成财富健康、身体健康与精神幸福。",
  },
  {
    label: "为何出发",
    title: "Why we kick off",
    body: "AI 时代带来机遇与冲击。我们须在颠覆性变革前，为人类构建风险防护垫——不仅是物质上的，更是认知与心灵上的。",
  },
];

const roadmap = [
  {
    phase: "第一阶段",
    time: "0–6 月",
    title: "思想奠基与平台搭建",
    items: ["完成香港公司注册与合规", "上线官网与核心自媒体", "推出三人行思想实验内容，获取种子用户"],
  },
  {
    phase: "第二阶段",
    time: "6–18 月",
    title: "产品打磨与社群运营",
    items: ["推出付费测评与咨询产品", "举办人类未来学院小型研讨会", "建立核心捐赠人/投资人小组"],
  },
  {
    phase: "第三阶段",
    time: "18 月–3 年",
    title: "影响力扩大与平台化",
    items: ["发布信任经济学与保障经济学白皮书", "启动慈善平台公司选拔", "模式复制至新加坡、伦敦等节点"],
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
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
              为 AI 时代的人类构建
              <br className="hidden sm:block" />
              认知防火墙与幸福方舟
            </h1>

            <p className="max-w-2xl text-[15px] leading-[1.85] text-ink-muted md:text-base">
              启明 · 理财 · 悦己 · 达人——以老子智慧为魂，融合金融、科技与人文，助人达己
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/about" className="btn-primary">
                探索我们的使命
              </Link>
              <Link href="/join" className="btn-secondary">
                成为捐赠人 / 投资人
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Origins */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <p className="mb-3 text-xs tracking-[0.2em] text-cinnabar">执行摘要</p>
          <h2 className="font-serif text-2xl tracking-[0.04em] md:text-[28px]">
            由来 · 使命 · 为何出发
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {origins.map((item) => (
              <article key={item.label} className="card-accent p-6">
                <p className="text-xs tracking-[0.16em] text-ink-faint">{item.title}</p>
                <h3 className="mt-2 font-serif text-lg tracking-[0.03em] text-ink">
                  {item.label}
                </h3>
                <p className="mt-4 text-[15px] leading-[1.8] text-ink-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="border-b border-border bg-paper-card/60">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-xs tracking-[0.2em] text-cinnabar">四大基石</p>
              <h2 className="font-serif text-2xl tracking-[0.04em] md:text-[28px]">
                服务矩阵的核心支点
              </h2>
            </div>
            <Link
              href="/services"
              className="text-sm tracking-wide text-cinnabar hover:underline"
            >
              查看完整服务矩阵 →
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <article key={p.title} className="card-accent flex flex-col p-5">
                <span className="font-serif text-2xl text-cinnabar/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
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

      {/* Three dialogues - dark block */}
      <section className="bg-ink text-on-dark">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <p className="mb-3 text-xs tracking-[0.22em] text-on-dark-muted">
            三人行对话
          </p>
          <h2 className="font-serif text-2xl tracking-[0.04em] md:text-[28px]">
            老子 · 柏拉图 · 哈萨比斯
          </h2>
          <p className="mt-5 max-w-2xl text-[15px] leading-[1.85] text-on-dark-muted md:text-base">
            一场跨时空的思想实验：以东方道统、西方理性与当代 AI 前沿为三极，邀请当代实践者同修对话——不是娱乐化辩论，而是关于认知、幸福与人类未来的严肃追问。
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { name: "老子", role: "道法自然 · 东方智慧之源" },
              { name: "柏拉图", role: "理念与城邦 · 西方理性传统" },
              { name: "哈萨比斯", role: "AI 前沿 · 当代科技实践" },
            ].map((person) => (
              <div
                key={person.name}
                className="border border-white/10 px-5 py-6"
              >
                <p className="font-serif text-xl tracking-[0.08em]">{person.name}</p>
                <p className="mt-2 text-sm text-on-dark-muted">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <p className="mb-3 text-xs tracking-[0.2em] text-cinnabar">实施路线图</p>
          <h2 className="font-serif text-2xl tracking-[0.04em] md:text-[28px]">
            三阶段路径
          </h2>
          <div className="mt-12 space-y-0">
            {roadmap.map((step, idx) => (
              <div
                key={step.phase}
                className="grid gap-4 border-t border-border py-8 md:grid-cols-[140px_1fr] md:gap-10"
              >
                <div>
                  <p className="text-xs tracking-[0.16em] text-ink-faint">
                    {step.phase}
                  </p>
                  <p className="mt-1 font-serif text-lg text-cinnabar">{step.time}</p>
                  {idx < roadmap.length - 1 && (
                    <div className="mt-4 hidden h-full w-px bg-border md:block" />
                  )}
                </div>
                <div>
                  <h3 className="font-serif text-xl tracking-[0.03em]">{step.title}</h3>
                  <ul className="mt-4 space-y-2">
                    {step.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-[15px] leading-[1.75] text-ink-muted"
                      >
                        <span className="mt-2.5 h-1 w-1 shrink-0 bg-cinnabar" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-border bg-cinnabar-soft/40">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-2 md:px-8 md:py-20">
          <div className="card-accent p-7">
            <p className="text-xs tracking-[0.18em] text-ink-faint">捐赠人即投资人</p>
            <h3 className="mt-3 font-serif text-xl tracking-[0.03em]">
              邀请同路人共担使命
            </h3>
            <p className="mt-4 text-[15px] leading-[1.8] text-ink-muted">
              捐赠资金 50% 用于公众启明与慈善，50% 注入公司运营。捐赠人成为投资人，共享成果、共守初心。
            </p>
            <Link href="/join" className="btn-primary mt-6">
              了解融资与捐赠
            </Link>
          </div>
          <div className="card-accent p-7">
            <p className="text-xs tracking-[0.18em] text-ink-faint">人才招募</p>
            <h3 className="mt-3 font-serif text-xl tracking-[0.03em]">
              寻找智人与圣人
            </h3>
            <p className="mt-4 text-[15px] leading-[1.8] text-ink-muted">
              CEO、内容与教育总监、科技与 AI 总监等关键岗位虚位以待。我们寻找认同价值观、愿为后代修建方舟的同行者。
            </p>
            <Link href="/join" className="btn-secondary mt-6">
              查看招募岗位
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
