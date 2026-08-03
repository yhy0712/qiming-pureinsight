import { createHash, randomBytes } from "crypto";
import { readDb, updateDb, type UserArticle } from "@/lib/db/store";

function previewText(body: string, chars = 900) {
  if (body.length <= chars) return body;
  const cut = body.slice(0, chars);
  const lastBreak = Math.max(
    cut.lastIndexOf("\n"),
    cut.lastIndexOf("。"),
    cut.lastIndexOf(". "),
  );
  return (lastBreak > chars * 0.5 ? cut.slice(0, lastBreak + 1) : cut).trim();
}

export function submitArticle(input: {
  authorId: string;
  title: string;
  category: string;
  content: string;
}) {
  const title = input.title.trim();
  const content = input.content.trim();
  if (title.length < 2 || content.length < 80) {
    throw new Error("标题至少 2 字，正文至少约 80 字");
  }

  return updateDb((db) => {
    const slug = `u-${createHash("md5")
      .update(`${input.authorId}-${title}-${Date.now()}`)
      .digest("hex")
      .slice(0, 12)}`;
    const article: UserArticle = {
      id: randomBytes(8).toString("hex"),
      slug,
      title,
      category: input.category,
      content,
      preview: previewText(content),
      wordCount: content.replace(/\s+/g, "").length,
      authorId: input.authorId,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    db.userArticles.push(article);
    return article;
  });
}

export function listPendingArticles() {
  return readDb().userArticles.filter((a) => a.status === "pending");
}

export function listMyArticles(authorId: string) {
  return readDb().userArticles.filter((a) => a.authorId === authorId);
}

export function listPublishedUserArticles() {
  return readDb().userArticles.filter((a) => a.status === "published");
}

/** Verify article: publish online + gift author 1 free read */
export function verifyArticle(articleId: string, reviewerId: string) {
  return updateDb((db) => {
    const article = db.userArticles.find((a) => a.id === articleId);
    if (!article) throw new Error("稿件不存在");
    if (article.status === "published") return article;

    article.status = "published";
    article.reviewedAt = new Date().toISOString();
    article.reviewedBy = reviewerId;

    const author = db.users.find((u) => u.id === article.authorId);
    if (author) author.freeReads += 1;

    return article;
  });
}

export function rejectArticle(articleId: string, reviewerId: string) {
  return updateDb((db) => {
    const article = db.userArticles.find((a) => a.id === articleId);
    if (!article) throw new Error("稿件不存在");
    article.status = "rejected";
    article.reviewedAt = new Date().toISOString();
    article.reviewedBy = reviewerId;
    return article;
  });
}
