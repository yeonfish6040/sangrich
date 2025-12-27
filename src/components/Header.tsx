"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const MAIN_NAV = [
  { label: "교회소개", href: "/about" },
  { label: "예배안내", href: "/worship" },
  { label: "생명말씀", href: "/word" },
  { label: "교회학교", href: "/school" },
  { label: "교회소식", href: "/news" },
];

export const SUB_NAV_BY_MAIN: Record<string, { label: string; href: string }[]> = {
  "/about": [
    { label: "인사말", href: "/about/greeting" },
    { label: "교회소개", href: "/about" },
    { label: "섬기는 이", href: "/about/servants" },
    { label: "교회연혁", href: "/about/history" },
    { label: "찬양대 및 교회학교", href: "/about/choir-school" },
    { label: "선교대 및 속회", href: "/about/mission-group" },
    { label: "선교 및 봉사", href: "/about/mission-service" },
    { label: "오시는길", href: "/about/directions" },
  ],
  "/worship": [
    { label: "예배안내", href: "/worship" },
    { label: "주보모음", href: "/worship/weekly" },
  ],
  "/word": [
    { label: "주일설교 영상", href: "/word/sunday-video" },
    { label: "담임목사님 컬럼", href: "/word/column" },
  ],
  "/school": [
    { label: "유·초등부", href: "/school/kids-elementary" },
    { label: "청소년부", href: "/school/youth" },
    { label: "대학·청년부", href: "/school/uni-youth" },
    { label: "교회학교 앨범", href: "/school/album" },
  ],
  "/news": [
    { label: "새신자소개", href: "/news/newbie" },
    { label: "교회소식", href: "/news" },
    { label: "교회일정", href: "/news/schedule" },
    { label: "교회앨범", href: "/news/album" },
    { label: "교우사업터", href: "/news/business" },
  ],
};

export default function Header() {
  const pathname = usePathname();
  const [shownMainHref, setShownMainHref] = useState<string | null>(null);

  const activeMain =
    MAIN_NAV.find((m) => pathname === m.href || pathname.startsWith(m.href + "/")) ?? null;

  useEffect(() => {
    setShownMainHref(activeMain?.href ?? null);
  }, [activeMain?.href]);

  const subNav = shownMainHref ? SUB_NAV_BY_MAIN[shownMainHref] ?? [] : [];

  return (
    <header className="w-full bg-white">

      {/* Main nav row */}
      <div className="border-b border-gray-100">
        <div className="w-full px-8">
          <div className="relative flex h-20 items-center justify-center">
            {/* Center group: Logo + Main menu */}
            <div className="flex items-center gap-16">
              <Link href="/" className="gap-0">
                <Image
                  src="/logo_horizontal.png"
                  alt="상리교회 로고"
                  width={260}
                  height={100}
                  priority
                  className="h-15 w-auto object-contain relative right-30"
                />
                <span className="sr-only">상리교회</span>
              </Link>

              <nav className="hidden items-center gap-10 text-xl font-bold md:flex relative right-10">
              {MAIN_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => setShownMainHref(item.href)}
                  className={`hover:text-gray-950 ${
                    activeMain?.href === item.href ? "text-gray-950" : "text-gray-800"
                  }`}
                  aria-current={activeMain?.href === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}
              </nav>
              <div className={"spacer"}>&nbsp;</div>
            </div>

            {/* Mobile menu placeholder */}
            <div className="absolute right-8 md:hidden">
              <button
                type="button"
                className="rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700"
                aria-label="메뉴 열기"
              >
                메뉴
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sub nav (teal bar) */}
      {subNav.length > 0 && (
        <div className="bg-[#6ea7a0]">
          <div className="w-full px-8">
            <nav className="flex h-10 flex-wrap items-center justify-center gap-x-8 gap-y-2 text-base font-semibold text-white/95">
              {subNav.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}