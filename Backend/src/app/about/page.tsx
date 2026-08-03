import { redirect } from "next/navigation";

/** About 根路径导向「认识启明」 */
export default function AboutIndexPage() {
  redirect("/about/qiming");
}
