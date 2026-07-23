import type { Metadata } from "next";
import { Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const notoSans = Noto_Sans_SC({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const notoSerif = Noto_Serif_SC({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "启明 QIMING · PureInsight",
    template: "%s · 启明 QIMING",
  },
  description:
    "为AI时代的人类构建认知防火墙与幸福方舟。启明·理财·悦己·达人——以老子智慧为魂，融合金融、科技与人文。",
  keywords: [
    "启明",
    "QIMING",
    "PureInsight",
    "香港聃清",
    "认知提升",
    "人类未来学院",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${notoSans.variable} ${notoSerif.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
