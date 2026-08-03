import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { rejectArticle, verifyArticle } from "@/lib/user-articles";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "请先登录" }, { status: 401 });
  if (user.role !== "admin") {
    return NextResponse.json({ error: "需要管理员权限" }, { status: 403 });
  }
  try {
    const body = (await request.json()) as {
      articleId?: string;
      action?: "approve" | "reject";
    };
    if (body.action === "reject") {
      const article = rejectArticle(body.articleId || "", user.id);
      return NextResponse.json({ article });
    }
    const article = verifyArticle(body.articleId || "", user.id);
    return NextResponse.json({
      article,
      message: "已核实上架，作者获得 1 次免费阅读",
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "核实失败" },
      { status: 400 },
    );
  }
}
