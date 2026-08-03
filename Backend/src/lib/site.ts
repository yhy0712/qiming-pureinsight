export type NavChild = {
  href: string;
  label: string;
  description?: string;
};

export type NavItem = {
  href?: string;
  label: string;
  children?: NavChild[];
  highlight?: boolean;
};

/** 完整版 7 栏导航信息架构 */
export const primaryNav: NavItem[] = [
  {
    label: "About",
    children: [
      {
        href: "/about/qiming",
        label: "认识启明",
        description: "保障经济学叙事 · 品牌与团队",
      },
      {
        href: "/about/assessments",
        label: "测试",
        description: "认知与情感测评中心",
      },
    ],
  },
  {
    label: "注册",
    highlight: true,
    children: [
      {
        href: "/register?tier=free",
        label: "免费体验会员",
        description: "浏览公开内容 · 参与开放讨论",
      },
      {
        href: "/register?tier=member",
        label: "启明会员",
        description: "深度报告 · 资源匹配优先",
      },
      {
        href: "/register?tier=honor",
        label: "启明荣誉会员",
        description: "闭门三人行 · 创始荣誉身份",
      },
      {
        href: "/register?tier=partner",
        label: "企业 / 合作伙伴",
        description: "机构合作注册入口",
      },
    ],
  },
  {
    label: "链接",
    children: [
      { href: "/connect/economics", label: "经济学" },
      { href: "/connect/finance", label: "金融学" },
      { href: "/connect/philosophy", label: "哲学" },
      { href: "/connect/psychology", label: "心理学" },
      { href: "/connect/future-society", label: "未来社会学" },
    ],
  },
  { href: "/charity", label: "慈善" },
  { href: "/academy", label: "人类未来学院" },
  { href: "/contact", label: "联系" },
  { href: "/partners", label: "合作伙伴" },
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
