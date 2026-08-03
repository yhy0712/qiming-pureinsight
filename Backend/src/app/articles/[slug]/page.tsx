import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticlePaywall } from "@/components/ArticlePaywall";
import {
  ArticleBackLink,
  ArticleDetailChrome,
  ArticleSectionLabel,
} from "@/components/ArticleDetailChrome";
import { getArticle, getArticles, userHasUnlock } from "@/lib/articles";
import { getCurrentUser } from "@/lib/auth";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "文章未找到" };
  return {
    title: article.title,
    description: article.preview.slice(0, 120),
  };
}

function Paragraphs({ text }: { text: string }) {
  const paragraphs = text
    .split(/\n{2,}|\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  return (
    <div className="space-y-4 text-[15px] leading-[1.85] text-ink md:text-base">
      {paragraphs.map((p, i) => (
        <p key={`${i}-${p.slice(0, 16)}`}>{p}</p>
      ))}
    </div>
  );
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const user = await getCurrentUser();
  const unlocked = user ? userHasUnlock(user.id, article.slug) : false;
  const body = unlocked ? article.content : article.preview;
  const hasMore = !unlocked && article.content.length > article.preview.length;

  return (
    <article>
      <ArticleDetailChrome
        category={article.category}
        unlocked={unlocked}
        wordCount={article.wordCount}
      />

      <div className="mx-auto max-w-3xl px-5 py-10 md:px-8 md:py-14">
        <h1 className="font-serif text-[28px] leading-tight tracking-[0.04em] text-ink md:text-[36px]">
          {article.title}
        </h1>
        {article.authorName && (
          <p className="mt-3 text-sm text-ink-faint">作者：{article.authorName}</p>
        )}

        <div className="mt-10">
          <p className="mb-4 text-xs tracking-[0.18em] text-cinnabar">
            <ArticleSectionLabel unlocked={unlocked} />
          </p>
          <Paragraphs text={body} />
        </div>

        {hasMore && (
          <>
            <div className="pointer-events-none mt-2 h-16 bg-gradient-to-b from-transparent to-paper" />
            <ArticlePaywall slug={article.slug} />
          </>
        )}

        {!unlocked && !hasMore && (
          <p className="mt-8 border border-border bg-paper-card px-4 py-3 text-sm text-ink-muted">
            本文篇幅较短，预览即为全文。
          </p>
        )}

        <div className="mt-14 border-t border-border pt-8">
          <Link href="/articles" className="text-sm text-cinnabar hover:underline">
            <ArticleBackLink />
          </Link>
        </div>
      </div>
    </article>
  );
}
