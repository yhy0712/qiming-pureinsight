import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "人类未来学院",
  description: "思想库与实践场——论题研究、慈善平台公司、青少年教育与全球特区研究。",
};

export default function AcademyPage() {
  return (
    <PlaceholderPage
      title="人类未来学院"
      note="定位为思想库与实践场。三大活动：论题研究报告、慈善平台公司（校长推荐+公开测试选拔创业者）、教育项目（12–18 岁「启智启仁启明」寒暑期学校）。长期愿景涵盖全球特区研究与信任经济学智库。"
    />
  );
}
