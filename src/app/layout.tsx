import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";
import Providers from "./providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "LOL DEX - 리그 오브 레전드 백과사전",
  description:
    "리그 오브 레전드 챔피언, 아이템, 로테이션 정보를 한눈에 확인하세요!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // if (Math.random() < 0.1) throw new Error();

  return (
    <html lang="ko">
      <body className={`${geistSans.variable} antialiased`}>
        <header className="fixed top-0 z-10 w-full bg-gray-800 p-4 text-white">
          <nav className="container mx-auto flex justify-around">
            <Link href={"/"}>홈</Link>
            <Link href={"/champions"}>챔피언 목록</Link>
            <Link href={"/items"}>아이템 목록</Link>
            <Link href={"/rotation"}>챔피언 로테이션</Link>
          </nav>
        </header>
        <Providers>
          <main className="container mx-auto min-h-screen py-[100px]">
            {children}
          </main>
        </Providers>
        <footer className="fixed bottom-0 w-full bg-gray-800 p-4">
          <div className="container mx-auto text-center text-sm text-white">
            [Your Product Name] is not endorsed by Riot Games and does not
            reflect the views or opinions of Riot Games or anyone officially
            involved in producing or managing Riot Games properties. Riot Games
            and all associated properties are trademarks or registered
            trademarks of Riot Games, Inc.
          </div>
        </footer>
      </body>
    </html>
  );
}
