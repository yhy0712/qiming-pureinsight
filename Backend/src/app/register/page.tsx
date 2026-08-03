import type { Metadata } from "next";
import { RegisterPageClient } from "@/components/RegisterPageClient";
import { getMemberships } from "@/lib/data/catalog";

export const metadata: Metadata = {
  title: "注册",
  description: "免费体验、启明会员、荣誉会员与企业合作注册。付费入口在此流程内完成。",
};

export default function RegisterPage() {
  const memberships = getMemberships();
  return <RegisterPageClient memberships={memberships} />;
}
