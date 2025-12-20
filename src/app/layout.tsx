import type { Metadata } from "next";
import { Nanum_Gothic, Nanum_Pen_Script, Nanum_Myeongjo } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const nanumGothic = Nanum_Gothic({
  weight: ['400', '700', '800'],
  subsets: ["latin"],
  variable: "--font-nanum-gothic",
});

const nanumPen = Nanum_Pen_Script({
  weight: ['400'],
  subsets: ["latin"],
  variable: "--font-nanum-pen",
});

const nanumMyeongjo = Nanum_Myeongjo({
  weight: ['400', '700', '800'],
  subsets: ["latin"],
  variable: "--font-nanum-myeongjo",
});

export const metadata: Metadata = {
  title: "상리교회",
  description: "상리교회 홈페이지입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${nanumGothic.variable} ${nanumPen.variable} ${nanumMyeongjo.variable} antialiased`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
