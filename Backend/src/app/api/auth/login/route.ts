import { NextResponse } from "next/server";
import { loginUser, setSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      password?: string;
    };
    const user = loginUser(body.email || "", body.password || "");
    await setSession(user.id);
    return NextResponse.json({ user });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "登录失败" },
      { status: 400 },
    );
  }
}
