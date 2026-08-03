import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getArticle, userHasUnlock } from "@/lib/articles";
import { updateDb } from "@/lib/db/store";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "请先登录" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as {
    slug?: string;
    method?: "paid" | "credit";
  } | null;
  const slug = body?.slug?.trim();
  const method = body?.method === "credit" ? "credit" : "paid";
  if (!slug || !getArticle(slug)) {
    return NextResponse.json({ error: "文章不存在" }, { status: 400 });
  }

  if (userHasUnlock(user.id, slug)) {
    return NextResponse.json({ ok: true, already: true, freeReads: user.freeReads });
  }

  try {
    const result = updateDb((db) => {
      const u = db.users.find((x) => x.id === user.id);
      if (!u) throw new Error("用户不存在");

      if (method === "credit") {
        if (u.freeReads < 1) throw new Error("没有免费阅读次数，请投稿核实后获取，或付费解锁");
        u.freeReads -= 1;
      }

      db.unlocks.push({
        userId: u.id,
        slug,
        method,
        createdAt: new Date().toISOString(),
      });

      return { freeReads: u.freeReads, method };
    });

    return NextResponse.json({ ok: true, ...result, price: 9.99 });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "解锁失败" },
      { status: 400 },
    );
  }
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ unlocks: [], freeReads: 0 });
  const { readDb } = await import("@/lib/db/store");
  const unlocks = readDb()
    .unlocks.filter((u) => u.userId === user.id)
    .map((u) => u.slug);
  return NextResponse.json({ unlocks, freeReads: user.freeReads });
}
