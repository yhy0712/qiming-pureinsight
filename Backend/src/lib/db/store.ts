import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "fs";
import { join } from "path";

const DATA_DIR = join(process.cwd(), "data");

export type User = {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  role: "member" | "admin";
  communityIds: string[];
  freeReads: number;
  createdAt: string;
};

export type Friendship = {
  id: string;
  fromUserId: string;
  toUserId: string;
  status: "pending" | "accepted";
  createdAt: string;
};

export type UserArticle = {
  id: string;
  slug: string;
  title: string;
  category: string;
  content: string;
  preview: string;
  wordCount: number;
  authorId: string;
  status: "pending" | "published" | "rejected";
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
};

export type UnlockRecord = {
  userId: string;
  slug: string;
  method: "paid" | "credit";
  createdAt: string;
};

export type DbShape = {
  users: User[];
  friendships: Friendship[];
  userArticles: UserArticle[];
  unlocks: UnlockRecord[];
};

const DEFAULT_DB: DbShape = {
  users: [],
  friendships: [],
  userArticles: [],
  unlocks: [],
};

function dbPath() {
  return join(DATA_DIR, "community.json");
}

export function ensureDb() {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  if (!existsSync(dbPath())) {
    writeFileSync(dbPath(), JSON.stringify(DEFAULT_DB, null, 2), "utf8");
  }
}

export function readDb(): DbShape {
  ensureDb();
  try {
    const raw = readFileSync(dbPath(), "utf8");
    const parsed = JSON.parse(raw) as DbShape;
    return {
      users: parsed.users || [],
      friendships: parsed.friendships || [],
      userArticles: parsed.userArticles || [],
      unlocks: parsed.unlocks || [],
    };
  } catch {
    return structuredClone(DEFAULT_DB);
  }
}

export function writeDb(db: DbShape) {
  ensureDb();
  const tmp = `${dbPath()}.tmp`;
  writeFileSync(tmp, JSON.stringify(db, null, 2), "utf8");
  renameSync(tmp, dbPath());
}

export function updateDb<T>(fn: (db: DbShape) => T): T {
  const db = readDb();
  const result = fn(db);
  writeDb(db);
  return result;
}
