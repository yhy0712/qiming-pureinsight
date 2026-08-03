import type { Metadata } from "next";
import {
  IconBuildingBank,
  IconHeartRateMonitor,
  IconSchool,
  IconUsersGroup,
} from "@tabler/icons-react";

export const metadata: Metadata = {
  title: "合作伙伴",
  description: "生态愿景：我们希望连接的领域（非真实合作背书）。",
};

const domains = [
  {
    title: "金融机构",
    desc: "保险、财富管理与长期保障工具的对话空间",
    icon: IconBuildingBank,
  },
  {
    title: "教育机构",
    desc: "认知、青少年与终身学习项目的共创可能",
    icon: IconSchool,
  },
  {
    title: "医疗健康服务商",
    desc: "照护、营养与身心健康资源的链接",
    icon: IconHeartRateMonitor,
  },
  {
    title: "社区组织",
    desc: "邻里、陪伴与在地互助网络",
    icon: IconUsersGroup,
  },
];

export default function PartnersPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
      <p className="text-xs tracking-[0.2em] text-cinnabar">ECOSYSTEM VISION</p>
      <h1 className="mt-3 font-serif text-3xl tracking-[0.04em] md:text-4xl">
        生态愿景：我们希望连接的领域
      </h1>
      <p className="mt-5 max-w-2xl text-[15px] leading-[1.85] text-ink-muted">
        本页以类别呈现潜在生态方向，
        <strong className="font-normal text-ink">
          并非已成立的合作伙伴背书
        </strong>
        。实际合作以官方公告为准。
      </p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {domains.map((d) => (
          <article key={d.title} className="card-accent p-6">
            <d.icon size={22} stroke={1.4} className="text-cinnabar" />
            <h2 className="mt-4 font-serif text-xl">{d.title}</h2>
            <p className="mt-3 text-sm leading-[1.75] text-ink-muted">{d.desc}</p>
          </article>
        ))}
      </div>
      <p className="mt-8 text-xs text-ink-faint">
        以下为潜在生态伙伴示意框架；不展示未经授权的品牌 Logo。
      </p>
    </section>
  );
}
