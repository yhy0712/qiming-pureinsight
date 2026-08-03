"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IconChevronDown, IconMenu2, IconX } from "@tabler/icons-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useAuth } from "@/lib/auth/AuthProvider";
import { company, primaryNav, type NavItem } from "@/lib/site";

function isActive(pathname: string, item: NavItem) {
  if (item.href) {
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  }
  return item.children?.some(
    (c) => pathname === c.href || pathname.startsWith(c.href.split("?")[0]),
  );
}

function DesktopDropdown({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = isActive(pathname, item);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  if (!item.children?.length && item.href) {
    return (
      <Link
        href={item.href}
        className={`px-2.5 py-1.5 text-sm tracking-wide transition-colors ${
          active ? "text-cinnabar" : "text-ink-muted hover:text-cinnabar"
        }`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={`inline-flex items-center gap-1 px-2.5 py-1.5 text-sm tracking-wide transition-colors ${
          item.highlight
            ? "border border-cinnabar bg-cinnabar text-paper-card hover:bg-[#8f3124]"
            : active
              ? "text-cinnabar"
              : "text-ink-muted hover:text-cinnabar"
        }`}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {item.label}
        <IconChevronDown size={14} stroke={1.5} />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 min-w-[240px] border border-border bg-paper-card py-2 shadow-sm">
          {item.children?.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="block px-4 py-2.5 hover:bg-cinnabar-soft/50"
              onClick={() => setOpen(false)}
            >
              <span className="block text-sm text-ink">{child.label}</span>
              {child.description && (
                <span className="mt-0.5 block text-xs text-ink-faint">
                  {child.description}
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const { user, logout, loading } = useAuth();

  useEffect(() => {
    setMobileOpen(false);
    setExpanded(null);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="seal" aria-hidden>
            道
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-lg tracking-[0.08em] text-ink">
              {company.brandZh}{" "}
              <span className="text-sm tracking-[0.16em] text-ink-muted">
                {company.brandEn}
              </span>
            </span>
            <span className="text-[11px] tracking-[0.18em] text-ink-faint">
              {company.pureInsight}
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          <nav className="flex items-center gap-0.5" aria-label="主导航">
            {primaryNav.map((item) => (
              <DesktopDropdown key={item.label} item={item} />
            ))}
          </nav>
          <div className="ml-3 flex items-center gap-2 border-l border-border pl-3">
            <LanguageSwitcher />
            {!loading &&
              (user ? (
                <button
                  type="button"
                  onClick={() => void logout()}
                  className="border border-border px-2 py-1 text-xs text-ink-muted hover:border-cinnabar hover:text-cinnabar"
                >
                  {user.name} · 退出
                </button>
              ) : (
                <Link
                  href="/login"
                  className="text-sm text-ink-muted hover:text-cinnabar"
                >
                  登录
                </Link>
              ))}
          </div>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center border border-border"
            aria-label={mobileOpen ? "关闭菜单" : "打开菜单"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <IconX size={18} /> : <IconMenu2 size={18} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-border bg-paper px-5 py-3 lg:hidden" aria-label="移动端导航">
          <ul className="flex flex-col">
            {primaryNav.map((item) => {
              const hasChildren = !!item.children?.length;
              const isExp = expanded === item.label;
              return (
                <li key={item.label} className="border-b border-border/70">
                  {hasChildren ? (
                    <>
                      <button
                        type="button"
                        className={`flex w-full items-center justify-between py-3 text-left text-base ${
                          item.highlight ? "text-cinnabar" : "text-ink"
                        }`}
                        onClick={() =>
                          setExpanded(isExp ? null : item.label)
                        }
                      >
                        {item.label}
                        <IconChevronDown
                          size={16}
                          className={`transition ${isExp ? "rotate-180" : ""}`}
                        />
                      </button>
                      {isExp && (
                        <ul className="mb-2 space-y-1 pb-2 pl-3">
                          {item.children!.map((c) => (
                            <li key={c.href}>
                              <Link
                                href={c.href}
                                className="block py-2 text-sm text-ink-muted"
                              >
                                {c.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href || "/"}
                      className="block py-3 text-base text-ink"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
            <li className="py-3">
              {!loading &&
                (user ? (
                  <button
                    type="button"
                    className="text-sm text-ink-muted"
                    onClick={() => void logout()}
                  >
                    退出（{user.name}）
                  </button>
                ) : (
                  <Link href="/login" className="text-sm text-cinnabar">
                    登录
                  </Link>
                ))}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
