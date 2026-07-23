import Link from "next/link";
import { company } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3 md:px-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="seal" aria-hidden>
              道
            </span>
            <div>
              <p className="font-serif text-lg tracking-[0.08em]">
                {company.brandZh} {company.brandEn}
              </p>
              <p className="text-xs tracking-[0.16em] text-ink-faint">
                {company.pureInsight}
              </p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-ink-muted">
            {company.legalName}
            <br />
            <span className="text-xs tracking-wide">{company.legalNameEn}</span>
          </p>
        </div>

        <div className="space-y-3 text-sm text-ink-muted">
          <p className="font-serif text-base text-ink">双城</p>
          <p>{company.cities}</p>
          <p className="pt-2 font-serif text-base text-ink">核心价值</p>
          <p className="leading-relaxed">「{company.motto}」</p>
        </div>

        <div className="space-y-3 text-sm text-ink-muted">
          <p className="font-serif text-base text-ink">联系</p>
          <p>
            邮件：
            <a
              href="mailto:contact@pureinsight.hk"
              className="text-cinnabar hover:underline"
            >
              contact@pureinsight.hk
            </a>
          </p>
          <p>
            <Link href="/join" className="text-cinnabar hover:underline">
              融资 / 捐赠 / 招募入口 →
            </Link>
          </p>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-ink-faint md:flex-row md:items-center md:justify-between md:px-8">
          <p>© {new Date().getFullYear()} {company.legalName}</p>
          <p>备案信息待更新 · 以社会企业原则运营</p>
        </div>
      </div>
    </footer>
  );
}
