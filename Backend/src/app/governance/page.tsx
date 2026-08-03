import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "治理与团队",
  description: "捐赠人即投资人——治理架构、核心团队与虚位以待的关键岗位。",
};

export default function GovernancePage() {
  return (
    <PlaceholderPage
      title="治理与团队"
      note="治理架构：投资人大会 → 董事会 → 执行委员会/CEO，另设学术与伦理委员会。「捐赠人即投资人」模式：50% 捐赠用于公众启明与慈善，50% 注入公司运营。核心团队：杨金、王晓威、张琪琳、杨华宇；CEO / 内容教育总监 / 科技 AI 总监虚位以待。"
    />
  );
}
