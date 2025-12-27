"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const menuCards = [
  { title: "교회소개", subtitle: "About", href: "/about", bgColor: "bg-[#a8b968]", image: "/cards/about.png" },
  { title: "주보모음", subtitle: "weekly", href: "/worship/weekly", bgColor: "bg-white", image: "/cards/weekly.png" },
  { title: "교회학교", subtitle: "Church School", href: "/school", bgColor: "bg-white", image: "/cards/school.png" },
  { title: "교회일정", subtitle: "Calendar", href: "/news/schedule", bgColor: "bg-white", image: "/cards/calendar.png" },
  { title: "예배안내", subtitle: "Worship", href: "/worship", bgColor: "bg-[#5da9a1]", image: "/cards/worship.png" },
  { title: "주일설교", subtitle: "Sermon", href: "/word/sunday-video", bgColor: "bg-white", image: "/cards/sermon.png" },
];

const bottomMenus = [
  { label: "인사말", href: "/about/greeting", icon: "/bottom/greeting.png" },
  { label: "선교 및 봉사", href: "/about/mission-service", icon: "/bottom/mission.png" },
  { label: "생명말씀", href: "/word", icon: "/bottom/life-word.png" },
  { label: "교회앨범", href: "/news/album", icon: "/bottom/album.png" },
  { label: "섬기는 이", href: "/about/servants", icon: "/bottom/staff.png" },
  { label: "오시는길", href: "/about/directions", icon: "/bottom/location.png" },
  // { label: "교회소식", href: "/news", icon: "/bottom/news.png" },
];

function MenuCard({
                    card,
                    className = "",
                  }: {
  card: { title: string; subtitle: string; href: string; bgColor: string; image: string };
  className?: string;
}) {
  return (
    <Link
      href={card.href}
      className={
        `relative block w-full aspect-square rounded-sm shadow-[0_8px_18px_rgba(0,0,0,0.15)] ` +
        `${card.bgColor} ${className}`
      }
    >
      <div className={"absolute p-4"}>
        <div className={"text-base font-extrabold tracking-tight text-black"}>{card.title}</div>
        <div className={"text-sm font-medium text-black/70"}>{card.subtitle}</div>
      </div>

      <div className={"absolute inset-x-0 bottom-0 flex items-end justify-center"}>
        <Image
          src={card.image}
          alt={card.title}
          width={1000}
          height={1000}
          className={"h-auto w-3/5 object-contain"}
          priority
        />
      </div>
    </Link>
  );
}

function BottomCircleMenu() {
  return (
    <div className={"w-full"}>
      {/* background */}
      <div
        className={
          "w-full rounded-xl overflow-visible"
        }
      >
        <div className={"w-full px-6 py-8"}>
          <div
            className={
              "mx-auto flex flex-wrap items-center justify-center gap-8 px-6"
            }
          >
            {bottomMenus.map((m) => (
              <Link
                key={m.href}
                href={m.href}
                className={"flex shrink-0 items-center justify-center"}
              >
                <div
                  className={
                    "aspect-square w-[clamp(4.5rem,10vw,8rem)] rounded-full bg-white/70 " +
                    "backdrop-blur shadow-sm flex flex-col items-center justify-center gap-2 px-2"
                  }
                >
                  <Image
                    src={m.icon}
                    alt={m.label}
                    width={0}
                    height={0}
                    sizes="10vw"
                    className={"h-auto w-[45%] object-contain"}
                  />
                  <div className={"text-sm font-semibold text-black/80 text-center leading-tight"}>
                    {m.label}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const backgroundImages = ["/mainBG_1.jpg", "/mainBG_2.jpg", "/mainBG_3.jpg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000); // 5초마다 이미지 변경

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <div className={"h-full"}>
      <Image src={backgroundImages[currentImageIndex]} alt={"배경"} height={1000} width={1920} priority
             className={"h-[86vh] fixed z-0"}
      />
      <div className={"h-[86vh] w-4/5 mx-auto flex-row"}>
        <div className={"flex flex-row justify-between z-20 flex-1 relative"}>
          <div className={"left flex-col justify-between h-full w-fit"}>
            <Image src={"/intro.png"} alt={"인트로"} height={100} width={100} priority className={"h-1/2 w-auto"} />
          </div>

          <div className={"right relative h-full w-5/7 flex items-start justify-end pr-6 pt-14"}>
            <div className={"grid w-full grid-cols-3 auto-rows-fr gap-4 sm:gap-5 lg:gap-6"}>
              {/* Row 1: 3 cards */}
              <MenuCard card={menuCards[0]} className="col-start-1" />
              <MenuCard card={menuCards[1]} className="col-start-2" />
              <MenuCard card={menuCards[2]} className="col-start-3" />

              {/* Row 2: 2 cards (shifted right) */}
              <MenuCard card={menuCards[3]} className="col-start-2" />
              <MenuCard card={menuCards[4]} className="col-start-3" />

              {/* Row 3: 1 card (right-aligned) */}
              <MenuCard card={menuCards[5]} className="col-start-3" />
            </div>
          </div>
        </div>
        <div className={"relative z-20 mt-1/3"}>
          <BottomCircleMenu />
        </div>
      </div>
    </div>
  );
}