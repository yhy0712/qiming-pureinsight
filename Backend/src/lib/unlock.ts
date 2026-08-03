export const UNLOCK_COOKIE = "qiming_unlocks";
export const UNLOCK_STORAGE_KEY = "qiming_unlocks";

export function parseUnlocks(raw: string | undefined | null): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((x): x is string => typeof x === "string")
      : [];
  } catch {
    return [];
  }
}

export function hasUnlock(list: string[], slug: string) {
  return list.includes(slug) || list.includes("*");
}
