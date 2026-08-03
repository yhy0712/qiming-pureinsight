export type Book = {
  id: string;
  category: string;
  title: string;
  author: string;
  cover_url: string;
  description: string;
};

export type Assessment = {
  id: string;
  title: string;
  dimensions: string[];
  durationMinutes: number;
  requiresAuth: boolean;
  requiresPayment: boolean;
  summary: string;
  status: "placeholder" | "live";
};

export type MembershipTier = {
  id: string;
  code: string;
  name: string;
  priceLabel: string;
  price: number | null;
  currency: string;
  audience: string;
  benefits: string[];
};

export type Artisan = {
  id: string;
  name: string;
  field: string;
  avatar_url: string;
  bio: string;
};

export const bookCategories: Record<
  string,
  { label: string; description: string }
> = {
  economics: {
    label: "经济学",
    description: "保障、激励与后AI时代的制度想象",
  },
  finance: {
    label: "金融学",
    description: "风险、配置与家庭长期财务健康",
  },
  philosophy: {
    label: "哲学",
    description: "安顿身心与公共生活的思想资源",
  },
  psychology: {
    label: "心理学",
    description: "认知、情感与关系经营的可读入口",
  },
  "future-society": {
    label: "未来社会学",
    description: "工作消逝之后的社群、意义与连接",
  },
};
