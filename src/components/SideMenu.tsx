

"use client";

import Link from "next/link";
import { useMemo } from "react";
import { usePathname } from "next/navigation";

// Header.tsx 에 있는 값을 import 해서 사용하세요.
// 경로는 프로젝트 구조에 맞게 조정하면 됩니다.
import { SUB_NAV_BY_MAIN } from "./Header";

type NavItem = { label: string; href: string };

const MAIN_TITLE_BY_MAIN: Record<string, string> = {
  "/about": "교회소개",
  "/worship": "예배",
  "/word": "말씀",
  "/school": "교회학교",
  "/news": "소식",
};

function ChevronRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M7.22 4.47a.75.75 0 0 1 1.06 0l5 5a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 1 1-1.06-1.06L11.69 10 7.22 5.53a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function SideMenu() {
  const pathname = usePathname() || "/";

  const mainHref = useMemo(() => {
    // 예: /about/greeting -> /about
    const seg = pathname.split("/").filter(Boolean)[0];
    return seg ? `/${seg}` : "/";
  }, [pathname]);

  const title = MAIN_TITLE_BY_MAIN[mainHref] ?? "메뉴";
  const items: NavItem[] = SUB_NAV_BY_MAIN[mainHref] ?? [];

  return (
    <div className="w-full flex">
      <aside className="w-3/4 max-w-[220px] bg-white">
      {/* Header */}
      <div className="bg-[#28648E] px-4 py-4 text-center">
        <h2 className="text-xl font-extrabold tracking-tight text-white">
          {title}
        </h2>
      </div>

      {/* List */}
      <nav aria-label={title} className="border-t border-slate-200">
        <ul className="divide-y divide-slate-200">
          {items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={
                    "flex items-center justify-between px-4 py-3 text-base transition " +
                    (isActive
                      ? "font-semibold text-blue-700"
                      : "text-slate-600 hover:bg-slate-50")
                  }
                  aria-current={isActive ? "page" : undefined}
                >
                  <span>{item.label}</span>
                  {isActive ? (
                    <ChevronRight className="h-5 w-5 text-slate-400" />
                  ) : (
                    <span className="h-5 w-5" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      </aside>
    </div>
  );
}