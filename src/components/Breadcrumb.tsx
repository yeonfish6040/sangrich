"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const MAIN_TITLE_BY_HREF: Record<string, string> = {
  "/about": "교회소개",
  "/worship": "예배",
  "/word": "말씀",
  "/school": "교회학교",
  "/news": "소식",
};

const SUB_TITLE_BY_HREF: Record<string, string> = {
  "/about/greeting": "인사말",
  "/about": "교회소개",
  "/about/servants": "섬기는 이",
  "/about/history": "교회연혁",
  "/about/choir-school": "찬양대 및 교회학교",
  "/about/mission-group": "선교대 및 속회",
  "/about/mission-service": "선교 및 봉사",
  "/worship": "예배안내",
  "/worship/weekly": "주보모음",
  "/sunday-video": "주일설교 영상",
  "/word/column": "담임목사님 컬럼",
  "/school/kids-elementary": "유·초등부",
  "/school/youth": "청소년부",
  "/school/uni-youth": "대학·청년부",
  "/school/album": "교회학교 앨범",
  "/news/newbie": "새신자소개",
  "/news": "교회소식",
  "/news/schedule": "교회일정",
  "/news/album": "교회앨범",
  "/news/business": "교우사업터",
  "/news/worship-share": "신앙정보공유 터",
};

export default function Breadcrumb() {
  const pathname = usePathname() || "/";

  const breadcrumbs = useMemo(() => {
    if (pathname === "/") return [];

    const segments = pathname.split("/").filter(Boolean);
    const items = [{ label: "🏠", href: "/" }];

    // Main category (first segment)
    if (segments.length > 0) {
      const mainHref = `/${segments[0]}`;
      const mainLabel = MAIN_TITLE_BY_HREF[mainHref] || segments[0];
      items.push({ label: mainLabel, href: mainHref });
    }

    // Sub page (full path)
    if (pathname !== `/${segments[0]}`) {
      const subLabel = SUB_TITLE_BY_HREF[pathname] || segments[segments.length - 1];
      items.push({ label: subLabel, href: pathname });
    }

    return items;
  }, [pathname]);

  if (breadcrumbs.length === 0) return null;

  const currentPageTitle = breadcrumbs[breadcrumbs.length - 1]?.label || "";

  return (
    <div>
      <nav aria-label="Breadcrumb" className="py-4">
        <ol className="flex items-center gap-3 text-base text-gray-500">
          {breadcrumbs.map((item, index) => (
            <li key={item.href} className="flex items-center gap-3">
              {index > 0 && <span className="text-gray-400 text-lg">›</span>}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-gray-700 font-medium">{item.label}</span>
              ) : (
                <Link href={item.href} className="hover:text-gray-700">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <h2 className="text-3xl font-bold text-gray-800 pb-4 border-b-2 border-gray-300 leading-4">
        {currentPageTitle}
      </h2>
    </div>
  );
}
