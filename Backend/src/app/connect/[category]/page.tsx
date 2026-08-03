import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBookCategories, getBooks } from "@/lib/data/catalog";
import { bookCategories } from "@/lib/data/types";

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return Object.keys(bookCategories).map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const meta = bookCategories[category];
  return { title: meta ? `链接 · ${meta.label}` : "链接" };
}

export default async function ConnectCategoryPage({ params }: Props) {
  const { category } = await params;
  const meta = bookCategories[category];
  if (!meta) notFound();

  const books = getBooks(category);
  const siblings = getBookCategories();

  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-16">
          <p className="mb-3 text-xs tracking-[0.2em] text-ink-faint">
            <Link href="/connect" className="hover:text-cinnabar">
              链接
            </Link>{" "}
            / {meta.label}
          </p>
          <h1 className="font-serif text-[32px] tracking-[0.04em] md:text-[36px]">
            {meta.label}
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-[1.8] text-ink-muted">
            {meta.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {siblings.map((s) => (
              <Link
                key={s.id}
                href={`/connect/${s.id}`}
                className={`border px-3 py-1.5 text-sm ${
                  s.id === category
                    ? "border-cinnabar bg-cinnabar text-paper-card"
                    : "border-border text-ink-muted hover:border-cinnabar"
                }`}
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <article key={book.id} className="card-accent flex flex-col overflow-hidden">
              <div className="aspect-[320/440] w-full border-b border-border bg-paper">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={book.cover_url}
                  alt={book.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h2 className="font-serif text-lg text-ink">{book.title}</h2>
                <p className="mt-1 text-xs text-ink-faint">{book.author}</p>
                <p className="mt-3 flex-1 text-sm leading-[1.75] text-ink-muted">
                  {book.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <button type="button" className="btn-primary !px-3 !py-2 text-sm">
                    加入书架
                  </button>
                  <button type="button" className="btn-secondary !px-3 !py-2 text-sm">
                    查看详情
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
