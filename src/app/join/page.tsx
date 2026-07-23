import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "加入启明",
  description: "200 万港币天使投资/捐赠 · 融资回馈 · 人才招募 · 联系表单。",
};

export default function JoinPage() {
  return (
    <PlaceholderPage
      title="加入启明"
      note="本轮寻求 200 万港币天使投资/捐赠（40% 产品平台开发 · 40% 核心团队招募 · 20% 运营推广）。投资人享有财务回报与精神社群回报（荣誉校董、三人行闭门参与、专属年报等）。人才岗位：CEO、内容与教育总监、科技与 AI 总监。完整表单与明细将于第二迭代上线。"
    />
  );
}
