import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { joinCommunity } from "@/lib/community";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "请先登录" }, { status: 401 });
  try {
    const body = (await request.json()) as { communityId?: string };
    const next = joinCommunity(user.id, body.communityId || "");
    return NextResponse.json({ user: next });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "加入失败" },
      { status: 400 },
    );
  }
}
