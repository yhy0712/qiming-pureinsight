export type Locale = "zh-CN" | "zh-TW" | "en";

export const locales: Locale[] = ["zh-CN", "zh-TW", "en"];

export const localeLabels: Record<Locale, string> = {
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文",
  en: "English",
};

export type Dictionary = {
  nav: {
    about: string;
    services: string;
    articles: string;
    academy: string;
    governance: string;
    join: string;
  };
  articles: {
    title: string;
    subtitle: string;
    all: string;
    filter: string;
    readPreview: string;
    unlock: string;
    unlockCta: string;
    unlockHint: string;
    unlocked: string;
    price: string;
    previewLabel: string;
    fullLabel: string;
    wordCount: string;
    empty: string;
    demoPay: string;
    paying: string;
    backToList: string;
  };
  categories: Record<string, string>;
  common: {
    language: string;
  };
};

const zhCN: Dictionary = {
  nav: {
    about: "关于我们",
    services: "服务矩阵",
    articles: "阅读专栏",
    academy: "人类未来学院",
    governance: "治理与团队",
    join: "加入启明",
  },
  articles: {
    title: "阅读专栏",
    subtitle:
      "金融、经济、心理、科技与教育等精选文章。打开文章可阅读首页预览；登录后解锁全文，或投稿核实后获赠免费阅读。",
    all: "全部",
    filter: "分类",
    readPreview: "阅读",
    unlock: "解锁全文",
    unlockCta: "支付 USD 9.99 解锁全文",
    unlockHint: "当前为演示支付：确认后本机立即解锁，后续可接入正式收款。",
    unlocked: "已解锁",
    price: "USD 9.99",
    previewLabel: "免费预览（首页）",
    fullLabel: "全文",
    wordCount: "约 {n} 字",
    empty: "该分类暂无文章。",
    demoPay: "确认支付并解锁",
    paying: "处理中…",
    backToList: "返回专栏",
  },
  categories: {
    all: "全部",
    finance: "金融学",
    economics: "经济学",
    psychology: "心理学",
    science: "科学技术",
    education: "教育",
    philosophy: "哲学人文",
    society: "社会议题",
    general: "综合",
  },
  common: { language: "语言" },
};

const zhTW: Dictionary = {
  nav: {
    about: "關於我們",
    services: "服務矩陣",
    articles: "閱讀專欄",
    academy: "人類未來學院",
    governance: "治理與團隊",
    join: "加入啟明",
  },
  articles: {
    title: "閱讀專欄",
    subtitle:
      "金融、經濟、心理、科技與教育等精選文章。打開文章可閱讀首頁預覽；登入後解鎖全文，或投稿核實後獲贈免費閱讀。",
    all: "全部",
    filter: "分類",
    readPreview: "閱讀",
    unlock: "解鎖全文",
    unlockCta: "支付 USD 9.99 解鎖全文",
    unlockHint: "目前為示範支付：確認後本機立即解鎖，後續可接入正式收款。",
    unlocked: "已解鎖",
    price: "USD 9.99",
    previewLabel: "免費預覽（首頁）",
    fullLabel: "全文",
    wordCount: "約 {n} 字",
    empty: "該分類暫無文章。",
    demoPay: "確認支付並解鎖",
    paying: "處理中…",
    backToList: "返回專欄",
  },
  categories: {
    all: "全部",
    finance: "金融學",
    economics: "經濟學",
    psychology: "心理學",
    science: "科學技術",
    education: "教育",
    philosophy: "哲學人文",
    society: "社會議題",
    general: "綜合",
  },
  common: { language: "語言" },
};

const en: Dictionary = {
  nav: {
    about: "About",
    services: "Services",
    articles: "Library",
    academy: "Future Academy",
    governance: "Governance",
    join: "Join Us",
  },
  articles: {
    title: "Reading Library",
    subtitle:
      "Curated essays across disciplines. Open an article to read the first-page preview; sign in to unlock the full text, or earn a free read by contributing a verified piece.",
    all: "All",
    filter: "Category",
    readPreview: "Read",
    unlock: "Unlock full text",
    unlockCta: "Pay USD 9.99 to unlock",
    unlockHint:
      "Demo checkout: unlocks instantly on this device. Production payments can be wired later.",
    unlocked: "Unlocked",
    price: "USD 9.99",
    previewLabel: "Free preview (page 1)",
    fullLabel: "Full text",
    wordCount: "~{n} words",
    empty: "No articles in this category.",
    demoPay: "Confirm & unlock",
    paying: "Processing…",
    backToList: "Back to library",
  },
  categories: {
    all: "All",
    finance: "Finance",
    economics: "Economics",
    psychology: "Psychology",
    science: "Science & Tech",
    education: "Education",
    philosophy: "Philosophy",
    society: "Society",
    general: "General",
  },
  common: { language: "Language" },
};

export const dictionaries: Record<Locale, Dictionary> = {
  "zh-CN": zhCN,
  "zh-TW": zhTW,
  en,
};
