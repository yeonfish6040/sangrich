"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

type Props = {
  /** 1~5 (대분류). 전달되면 이 값을 우선 사용 */
  category?: number;
  /**
   * 대분류 메뉴 href 리스트(1~5 순서).
   * 예: ["/introduce", "/worship", "/word", "/school", "/news"]
   * 없으면 pathname 기반 기본 매핑을 사용.
   */
  menuHrefs?: string[];
};

export default function Advertise({ category, menuHrefs }: Props) {
  const pathname = usePathname();

  const derivedCategory = (() => {
    // 1) menuHrefs가 있으면 그 순서(1~5)에 맞춰 pathname으로 계산
    if (Array.isArray(menuHrefs) && menuHrefs.length > 0) {
      const idx = menuHrefs.findIndex((href) => {
        if (typeof href !== "string" || href.length === 0) return false;
        return href !== "/" ? pathname.startsWith(href) : pathname === "/";
      });
      const cat = idx >= 0 ? idx + 1 : 1;
      return Math.min(5, Math.max(1, cat));
    }

    // 2) 기본 매핑(프로젝트 기본 라우트 기준)
    if (pathname.startsWith("/introduce")) return 1;
    if (pathname.startsWith("/worship")) return 2;
    if (pathname.startsWith("/word")) return 3;
    if (pathname.startsWith("/school")) return 4;
    if (pathname.startsWith("/news")) return 5;
    return 1;
  })();

  // 전달된 category가 있으면 우선, 없으면 pathname에서 계산
  const safe = (() => {
    const base = typeof category === "number" ? category : derivedCategory;
    return base >= 1 && base <= 5 ? base : 1;
  })();

  return (
    <div className="w-full min-w-[1100px]">
      <div className="relative mx-auto">
        {/* 배경 배너 이미지 */}
        <div className="relative h-65 overflow-hidden">
          <Image
            src={`/advertise${safe}.png`}
            alt={`advertise-${safe}`}
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="absolute left-0 h-0.5 w-full bg-[#579f98]" />
      </div>
    </div>
  );
}