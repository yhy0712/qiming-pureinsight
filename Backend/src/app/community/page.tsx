import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import {
  getCommunityMembers,
  getFriendsAndRequests,
  listCommunities,
} from "@/lib/community";
import { CommunityClient } from "@/components/CommunityClient";

export const metadata = {
  title: "社群连接",
  description: "加入学科社群，认识同路人，互加好友。",
};

export default async function CommunityPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/community");

  const communities = listCommunities();
  const social = getFriendsAndRequests(user.id);
  const membersByCommunity = Object.fromEntries(
    communities.map((c) => [c.id, getCommunityMembers(c.id)]),
  );

  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-16">
          <p className="text-xs tracking-[0.2em] text-cinnabar">CONNECTION</p>
          <h1 className="mt-3 font-serif text-[32px] tracking-[0.04em] md:text-[40px]">
            社群连接
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-[1.8] text-ink-muted">
            启明的宗旨是建立连接与社群，让人互相认识。加入兴趣社群、发送好友申请，一起读书与实践。
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-ink-muted">
            <span>
              你好，<strong className="text-ink">{user.name}</strong>
            </span>
            <span>免费阅读余额：{user.freeReads}</span>
            <Link href="/upload" className="text-cinnabar hover:underline">
              去投稿 →
            </Link>
            {user.role === "admin" && (
              <Link href="/verify" className="text-cinnabar hover:underline">
                核实稿件 →
              </Link>
            )}
          </div>
        </div>
      </section>

      <CommunityClient
        user={user}
        communities={communities}
        membersByCommunity={membersByCommunity}
        social={social}
      />
    </>
  );
}
