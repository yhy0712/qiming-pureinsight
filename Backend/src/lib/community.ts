import { randomBytes } from "crypto";
import { readDb, updateDb } from "@/lib/db/store";
import { publicUser } from "@/lib/auth";

export const COMMUNITIES = [
  {
    id: "finance",
    name: "金融学社群",
    desc: "资产配置、保险与投资实践交流",
  },
  {
    id: "economics",
    name: "经济学社群",
    desc: "保障经济学、博弈论与政策思辨",
  },
  {
    id: "psychology",
    name: "心理学社群",
    desc: "认知、情绪与幸福力互助",
  },
  {
    id: "science",
    name: "科学技术社群",
    desc: "AI、数学与前沿科技对话",
  },
  {
    id: "education",
    name: "教育社群",
    desc: "学习方法、青少年与终身成长",
  },
  {
    id: "philosophy",
    name: "哲学人文社群",
    desc: "东方智慧与现世安顿",
  },
  {
    id: "relations",
    name: "关系经营社群",
    desc: "职场上下级、婚恋家庭、信任合作——补上社会教育这一课",
  },
] as const;

export function listCommunities() {
  const db = readDb();
  return COMMUNITIES.map((c) => ({
    ...c,
    memberCount: db.users.filter((u) => u.communityIds.includes(c.id)).length,
  }));
}

export function joinCommunity(userId: string, communityId: string) {
  if (!COMMUNITIES.some((c) => c.id === communityId)) {
    throw new Error("社群不存在");
  }
  return updateDb((db) => {
    const user = db.users.find((u) => u.id === userId);
    if (!user) throw new Error("用户不存在");
    if (!user.communityIds.includes(communityId)) {
      user.communityIds.push(communityId);
    }
    return publicUser(user);
  });
}

export function getCommunityMembers(communityId: string) {
  return readDb()
    .users.filter((u) => u.communityIds.includes(communityId))
    .map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      freeReads: u.freeReads,
    }));
}

export function requestFriend(fromUserId: string, toUserId: string) {
  if (fromUserId === toUserId) throw new Error("不能加自己为好友");
  return updateDb((db) => {
    const to = db.users.find((u) => u.id === toUserId);
    if (!to) throw new Error("用户不存在");
    const existing = db.friendships.find(
      (f) =>
        (f.fromUserId === fromUserId && f.toUserId === toUserId) ||
        (f.fromUserId === toUserId && f.toUserId === fromUserId),
    );
    if (existing) {
      if (existing.status === "accepted") throw new Error("你们已是好友");
      if (existing.fromUserId === fromUserId) throw new Error("已发送申请");
      existing.status = "accepted";
      return existing;
    }
    const row = {
      id: randomBytes(8).toString("hex"),
      fromUserId,
      toUserId,
      status: "pending" as const,
      createdAt: new Date().toISOString(),
    };
    db.friendships.push(row);
    return row;
  });
}

export function respondFriend(
  userId: string,
  friendshipId: string,
  accept: boolean,
) {
  return updateDb((db) => {
    const row = db.friendships.find((f) => f.id === friendshipId);
    if (!row || row.toUserId !== userId) throw new Error("申请不存在");
    if (!accept) {
      db.friendships = db.friendships.filter((f) => f.id !== friendshipId);
      return null;
    }
    row.status = "accepted";
    return row;
  });
}

export function getFriendsAndRequests(userId: string) {
  const db = readDb();
  const nameOf = (id: string) =>
    db.users.find((u) => u.id === id)?.name || "未知用户";

  const friends = db.friendships
    .filter(
      (f) =>
        f.status === "accepted" &&
        (f.fromUserId === userId || f.toUserId === userId),
    )
    .map((f) => {
      const otherId = f.fromUserId === userId ? f.toUserId : f.fromUserId;
      return { friendshipId: f.id, userId: otherId, name: nameOf(otherId) };
    });

  const incoming = db.friendships
    .filter((f) => f.status === "pending" && f.toUserId === userId)
    .map((f) => ({
      friendshipId: f.id,
      userId: f.fromUserId,
      name: nameOf(f.fromUserId),
      createdAt: f.createdAt,
    }));

  const outgoing = db.friendships
    .filter((f) => f.status === "pending" && f.fromUserId === userId)
    .map((f) => ({
      friendshipId: f.id,
      userId: f.toUserId,
      name: nameOf(f.toUserId),
      createdAt: f.createdAt,
    }));

  return { friends, incoming, outgoing };
}
