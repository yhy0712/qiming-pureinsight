import { createHash, randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { updateDb, readDb, type User } from "@/lib/db/store";
import type { PublicUser } from "@/lib/auth/types";

export type { PublicUser };

const SESSION_COOKIE = "qiming_session";
const SECRET =
  process.env.AUTH_SECRET || "qiming-pureinsight-dev-secret-change-me";

function hashPassword(password: string, salt: string) {
  return scryptSync(password, salt, 64).toString("hex");
}

export function createPasswordHash(password: string) {
  const salt = randomBytes(16).toString("hex");
  return `${salt}:${hashPassword(password, salt)}`;
}

export function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const next = hashPassword(password, salt);
  try {
    return timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(next, "hex"));
  } catch {
    return false;
  }
}

function sign(value: string) {
  return createHash("sha256").update(`${value}.${SECRET}`).digest("hex");
}

function encodeSession(userId: string) {
  const payload = `${userId}.${Date.now()}`;
  return `${payload}.${sign(payload)}`;
}

function decodeSession(token: string | undefined): string | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [userId, ts, sig] = parts;
  const payload = `${userId}.${ts}`;
  if (sign(payload) !== sig) return null;
  // 30 days
  if (Date.now() - Number(ts) > 30 * 24 * 60 * 60 * 1000) return null;
  return userId;
}

export function publicUser(user: User): PublicUser {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    communityIds: user.communityIds,
    freeReads: user.freeReads,
    createdAt: user.createdAt,
  };
}

export async function getCurrentUser(): Promise<PublicUser | null> {
  const jar = await cookies();
  const userId = decodeSession(jar.get(SESSION_COOKIE)?.value);
  if (!userId) return null;
  const user = readDb().users.find((u) => u.id === userId);
  return user ? publicUser(user) : null;
}

export async function setSession(userId: string) {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, encodeSession(userId), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearSession() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}

export function registerUser(input: {
  email: string;
  name: string;
  password: string;
}) {
  const email = input.email.trim().toLowerCase();
  const name = input.name.trim();
  if (!email || !name || input.password.length < 6) {
    throw new Error("请填写有效姓名、邮箱，密码至少 6 位");
  }

  return updateDb((db) => {
    if (db.users.some((u) => u.email === email)) {
      throw new Error("该邮箱已注册");
    }
    const user: User = {
      id: randomBytes(8).toString("hex"),
      email,
      name,
      passwordHash: createPasswordHash(input.password),
      role: db.users.length === 0 ? "admin" : "member",
      communityIds: [],
      freeReads: 0,
      createdAt: new Date().toISOString(),
    };
    db.users.push(user);
    return publicUser(user);
  });
}

export function loginUser(email: string, password: string) {
  const user = readDb().users.find(
    (u) => u.email === email.trim().toLowerCase(),
  );
  if (!user || !verifyPassword(password, user.passwordHash)) {
    throw new Error("邮箱或密码不正确");
  }
  return publicUser(user);
}
