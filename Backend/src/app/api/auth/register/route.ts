import { NextResponse } from "next/server";
import { registerUser, setSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      name?: string;
      password?: string;
    };
    const user = registerUser({
      email: body.email || "",
      name: body.name || "",
      password: body.password || "",
    });
    await setSession(user.id);
    return NextResponse.json({ user });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "注册失败" },
      { status: 400 },
    );
  }
}
