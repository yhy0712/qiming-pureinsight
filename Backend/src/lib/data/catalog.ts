import booksData from "../../../content/books.json";
import assessmentsData from "../../../content/assessments.json";
import membershipsData from "../../../content/memberships.json";
import artisansData from "../../../content/artisans.json";
import type { Artisan, Assessment, Book, MembershipTier } from "./types";
import { bookCategories } from "./types";

export function getBooks(category?: string): Book[] {
  const all = booksData as Book[];
  if (!category) return all;
  return all.filter((b) => b.category === category);
}

export function getBookCategories() {
  return Object.entries(bookCategories).map(([id, meta]) => ({
    id,
    ...meta,
    count: getBooks(id).length,
  }));
}

export function getAssessments(): Assessment[] {
  return assessmentsData as Assessment[];
}

export function getMemberships(): MembershipTier[] {
  return membershipsData as MembershipTier[];
}

export function getMembership(code: string) {
  return getMemberships().find((m) => m.code === code);
}

export function getArtisans(): Artisan[] {
  return artisansData as Artisan[];
}
