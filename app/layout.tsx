import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist_Mono, Noto_Sans_JP } from "next/font/google";
import { AppHeaderAuth } from "@/components/layout/app-header-auth";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "X Clone — プロフィール",
  description: "X（旧Twitter）風プロフィールUIのデモ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-dvh overflow-hidden">
      <body
        className={`${notoSansJP.variable} ${geistMono.variable} flex h-full min-h-0 flex-col overflow-hidden antialiased`}
      >
        <ClerkProvider>
          <header className="flex h-16 shrink-0 items-center justify-end gap-3 p-4 sm:hidden">
            <AppHeaderAuth />
          </header>
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">{children}</div>
        </ClerkProvider>
      </body>
    </html>
  );
}