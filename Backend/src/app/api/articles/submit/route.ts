import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { submitArticle } from "@/lib/user-articles";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "请先登录" }, { status: 401 });
  try {
    const body = (await request.json()) as {
      title?: string;
      category?: string;
      content?: string;
    };
    const article = submitArticle({
      authorId: user.id,
      title: body.title || "",
      category: body.category || "general",
      content: body.content || "",
    });
    return NextResponse.json({ article });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "投稿失败" },
      { status: 400 },
    );
  }
}
