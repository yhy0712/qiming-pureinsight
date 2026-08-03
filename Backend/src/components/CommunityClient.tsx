"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { PublicUser } from "@/lib/auth/types";

type Community = {
  id: string;
  name: string;
  desc: string;
  memberCount: number;
};

type Member = { id: string; name: string; email: string; freeReads: number };

type Social = {
  friends: { friendshipId: string; userId: string; name: string }[];
  incoming: {
    friendshipId: string;
    userId: string;
    name: string;
    createdAt: string;
  }[];
  outgoing: {
    friendshipId: string;
    userId: string;
    name: string;
    createdAt: string;
  }[];
};

export function CommunityClient({
  user,
  communities,
  membersByCommunity,
  social,
}: {
  user: PublicUser;
  communities: Community[];
  membersByCommunity: Record<string, Member[]>;
  social: Social;
}) {
  const router = useRouter();
  const [active, setActive] = useState(communities[0]?.id || "finance");
  const [msg, setMsg] = useState("");
  const members = membersByCommunity[active] || [];
  const joined = user.communityIds.includes(active);

  async function join() {
    setMsg("");
    const res = await fetch("/api/community/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ communityId: active }),
    });
    const data = await res.json();
    if (!res.ok) {
      setMsg(data.error || "加入失败");
      return;
    }
    router.refresh();
  }

  async function friendAction(
    action: "request" | "accept" | "reject",
    payload: { toUserId?: string; friendshipId?: string },
  ) {
    setMsg("");
    const res = await fetch("/api/friends", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, ...payload }),
    });
    const data = await res.json();
    if (!res.ok) {
      setMsg(data.error || "操作失败");
      return;
    }
    router.refresh();
  }

  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-[240px_1fr] md:px-8">
      <aside className="space-y-2">
        {communities.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setActive(c.id)}
            className={`block w-full border px-3 py-3 text-left text-sm ${
              active === c.id
                ? "border-cinnabar bg-cinnabar-soft/40 text-ink"
                : "border-border text-ink-muted hover:border-cinnabar"
            }`}
          >
            <span className="font-serif">{c.name}</span>
            <span className="mt-1 block text-xs opacity-70">
              {c.memberCount} 人
            </span>
          </button>
        ))}
      </aside>

      <div className="space-y-10">
        {msg && <p className="text-sm text-cinnabar">{msg}</p>}

        <div className="card-accent p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl">
                {communities.find((c) => c.id === active)?.name}
              </h2>
              <p className="mt-2 text-sm text-ink-muted">
                {communities.find((c) => c.id === active)?.desc}
              </p>
            </div>
            {!joined ? (
              <button type="button" className="btn-primary" onClick={join}>
                加入社群
              </button>
            ) : (
              <span className="border border-border px-3 py-1.5 text-xs text-ink-faint">
                已加入
              </span>
            )}
          </div>

          <h3 className="mt-8 text-sm tracking-wide text-ink-faint">成员</h3>
          <ul className="mt-3 divide-y divide-border">
            {members.length === 0 && (
              <li className="py-4 text-sm text-ink-muted">还没有成员，来做第一个吧。</li>
            )}
            {members.map((m) => (
              <li
                key={m.id}
                className="flex flex-wrap items-center justify-between gap-3 py-3"
              >
                <div>
                  <p className="font-serif text-ink">{m.name}</p>
                  <p className="text-xs text-ink-faint">{m.email}</p>
                </div>
                {m.id !== user.id &&
                  !social.friends.some((f) => f.userId === m.id) &&
                  !social.outgoing.some((f) => f.userId === m.id) && (
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() =>
                        friendAction("request", { toUserId: m.id })
                      }
                    >
                      加好友
                    </button>
                  )}
                {social.friends.some((f) => f.userId === m.id) && (
                  <span className="text-xs text-cinnabar">已是好友</span>
                )}
                {social.outgoing.some((f) => f.userId === m.id) && (
                  <span className="text-xs text-ink-faint">申请中</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="card-accent p-5">
            <h3 className="font-serif text-lg">好友申请</h3>
            <ul className="mt-4 space-y-3">
              {social.incoming.length === 0 && (
                <li className="text-sm text-ink-muted">暂无新申请</li>
              )}
              {social.incoming.map((r) => (
                <li key={r.friendshipId} className="flex items-center justify-between gap-2">
                  <span className="text-sm">{r.name}</span>
                  <span className="flex gap-2">
                    <button
                      type="button"
                      className="btn-primary !px-3 !py-1 text-xs"
                      onClick={() =>
                        friendAction("accept", { friendshipId: r.friendshipId })
                      }
                    >
                      接受
                    </button>
                    <button
                      type="button"
                      className="btn-secondary !px-3 !py-1 text-xs"
                      onClick={() =>
                        friendAction("reject", { friendshipId: r.friendshipId })
                      }
                    >
                      忽略
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card-accent p-5">
            <h3 className="font-serif text-lg">我的好友</h3>
            <ul className="mt-4 space-y-2">
              {social.friends.length === 0 && (
                <li className="text-sm text-ink-muted">还没有好友，去社群认识人吧。</li>
              )}
              {social.friends.map((f) => (
                <li key={f.friendshipId} className="text-sm text-ink">
                  {f.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
