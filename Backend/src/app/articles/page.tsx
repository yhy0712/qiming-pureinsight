import type { Metadata } from "next";
import { ArticlesBrowser } from "@/components/ArticlesBrowser";
import { ArticlesPageHeader } from "@/components/ArticlesPageHeader";
import { getArticles, getCategoryCounts } from "@/lib/articles";

export const metadata: Metadata = {
  title: "阅读专栏",
  description:
    "金融、经济、心理、科技与教育精选文章。免费预览首页，USD 9.99 解锁全文。",
};

export default function ArticlesPage() {
  const articles = getArticles().map((a) => ({
    slug: a.slug,
    title: a.title,
    category: a.category,
    wordCount: a.wordCount,
    preview: a.preview,
    lang: a.lang,
    authorName: a.authorName,
  }));
  const counts = getCategoryCounts();

  return (
    <>
      <ArticlesPageHeader />
      <section className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
        <ArticlesBrowser articles={articles} counts={counts} />
      </section>
    </>
  );
}
