"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { company, navItems } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
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

        <nav className="hidden items-center gap-1 lg:flex" aria-label="主导航">
          {navItems.map((item) => {
            const active = pathname === item.href;
            if (item.highlight) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="ml-2 border border-cinnabar bg-cinnabar px-3 py-1.5 text-sm tracking-wide text-paper-card transition-colors hover:bg-[#8f3124]"
                >
                  {item.label}
                </Link>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 text-sm tracking-wide transition-colors ${
                  active
                    ? "text-cinnabar"
                    : "text-ink-muted hover:text-cinnabar"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center border border-border text-ink lg:hidden"
          aria-label={open ? "关闭菜单" : "打开菜单"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">菜单</span>
          <span className="flex flex-col gap-1.5">
            <span
              className={`block h-px w-5 bg-ink transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span className={`block h-px w-5 bg-ink transition ${open ? "opacity-0" : ""}`} />
            <span
              className={`block h-px w-5 bg-ink transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-border bg-paper px-5 py-4 lg:hidden"
          aria-label="移动端导航"
        >
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block px-2 py-3 text-base tracking-wide ${
                    item.highlight
                      ? "bg-cinnabar text-paper-card"
                      : pathname === item.href
                        ? "text-cinnabar"
                        : "text-ink-muted"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
