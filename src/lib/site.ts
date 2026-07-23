export type NavItem = {
  href: string;
  label: string;
  highlight?: boolean;
};

export const navItems: NavItem[] = [
  { href: "/about", label: "关于我们" },
  { href: "/services", label: "服务矩阵" },
  { href: "/academy", label: "人类未来学院" },
  { href: "/governance", label: "治理与团队" },
  { href: "/join", label: "加入启明", highlight: true },
];

export const company = {
  brandZh: "启明",
  brandEn: "QIMING",
  pureInsight: "PUREINSIGHT",
  legalName: "香港聃清信息咨询有限公司",
  legalNameEn: "PUREINSIGHT CONSULTING (HONG KONG) LIMITED",
  cities: "香港 · 上海",
  motto: "运自己造，福自己求，助人达己",
  values: "成人之美，美美与共；以道观之，物无贵贱",
};
