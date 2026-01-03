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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileOpenMainHref, setMobileOpenMainHref] = useState<string | null>(null);

  const activeMain =
    MAIN_NAV.find((m) => pathname === m.href || pathname.startsWith(m.href + "/")) ?? null;

  useEffect(() => {
    setShownMainHref(activeMain?.href ?? null);
  }, [activeMain?.href]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setMobileOpenMainHref(null);
  }, [pathname]);

  const subNav = shownMainHref ? SUB_NAV_BY_MAIN[shownMainHref] ?? [] : [];

  return (
    <header className="w-full bg-white">

      {/* Main nav row */}
      <div className="border-b border-gray-100">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-center md:h-20">
            {/* Center group: Logo + Main menu */}
            <div className="flex items-center gap-6 md:gap-12">
              <Link href="/" className="gap-0">
                <Image
                  src="/logo_horizontal.png"
                  alt="상리교회 로고"
                  width={260}
                  height={100}
                  priority
                  className="h-10 w-auto object-contain md:h-14"
                />
                <span className="sr-only">상리교회</span>
              </Link>

              <nav className="hidden items-center gap-8 text-lg font-bold md:flex lg:text-xl">
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
                className="rounded-md border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700"
                aria-label="메뉴 열기"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-nav"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              >
                메뉴
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div id="mobile-nav" className="border-b border-gray-100 bg-white md:hidden">
          <nav className="px-4 py-3">
            <div className="flex flex-col gap-3 text-base font-semibold text-gray-900">
              {MAIN_NAV.map((item) => {
                const isOpen = mobileOpenMainHref === item.href;
                return (
                  <div key={item.href} className="flex flex-col">
                    <button
                      type="button"
                      className={`flex items-center justify-between ${
                        activeMain?.href === item.href ? "text-gray-900" : "text-gray-600"
                      }`}
                      aria-expanded={isOpen}
                      onClick={() =>
                        setMobileOpenMainHref((prev) => (prev === item.href ? null : item.href))
                      }
                    >
                      <span>{item.label}</span>
                      <span className="text-sm">{isOpen ? "−" : "+"}</span>
                    </button>
                    {isOpen && (SUB_NAV_BY_MAIN[item.href] ?? []).length > 0 && (
                      <div className="mt-2 flex flex-col gap-2 pl-3 text-sm font-semibold text-gray-700">
                        {(SUB_NAV_BY_MAIN[item.href] ?? []).map((sub) => (
                          <Link key={sub.href} href={sub.href} className="hover:text-gray-900">
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </nav>
        </div>
      )}

      {/* Sub nav (teal bar) */}
      {subNav.length > 0 && (
        <div className="hidden bg-[#6ea7a0] md:block">
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
