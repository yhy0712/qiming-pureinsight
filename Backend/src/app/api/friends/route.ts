import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import {
  getFriendsAndRequests,
  requestFriend,
  respondFriend,
} from "@/lib/community";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "请先登录" }, { status: 401 });
  return NextResponse.json(getFriendsAndRequests(user.id));
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "请先登录" }, { status: 401 });
  try {
    const body = (await request.json()) as {
      action?: "request" | "accept" | "reject";
      toUserId?: string;
      friendshipId?: string;
    };
    if (body.action === "request") {
      const row = requestFriend(user.id, body.toUserId || "");
      return NextResponse.json({ friendship: row });
    }
    if (body.action === "accept" || body.action === "reject") {
      const row = respondFriend(
        user.id,
        body.friendshipId || "",
        body.action === "accept",
      );
      return NextResponse.json({ friendship: row });
    }
    return NextResponse.json({ error: "未知操作" }, { status: 400 });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "操作失败" },
      { status: 400 },
    );
  }
}
