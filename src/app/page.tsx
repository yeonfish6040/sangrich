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
        `relative block w-full aspect-square overflow-hidden rounded-sm shadow-[0_8px_18px_rgba(0,0,0,0.15)] ` +
        `min-h-[100px] max-h-[min(20vh,180px)] ` +
        `${card.bgColor} ${className}`
      }
    >
      <div className="absolute p-2 sm:p-3 lg:p-4 z-40">
        <div className="text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight text-black">{card.title}</div>
        <div className="text-sm sm:text-base lg:text-lg font-semibold text-black/70">{card.subtitle}</div>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex justify-center">
        <div className="relative flex justify-center w-full">
          <Image
            src={card.image}
            alt={card.title}
            width={1000}
            height={1000}
            className="relative z-10 h-auto w-3/5 object-contain"
            priority
          />
        </div>
      </div>
    </Link>
  );
}

function BottomCircleMenu() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="w-full rounded-xl overflow-visible">
        <div className="w-full py-6 sm:py-8">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:gap-6">
            {bottomMenus.map((m) => (
              <Link
                key={m.href}
                href={m.href}
                className="flex shrink-0 items-center justify-center"
              >
                <div className="aspect-square w-[clamp(3.5rem,10vw,6.5rem)] rounded-full bg-white/70 backdrop-blur shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center justify-center gap-1 sm:gap-2 p-2">
                  <Image
                    src={m.icon}
                    alt={m.label}
                    width={60}
                    height={60}
                    className="h-auto w-[40%] sm:w-[45%] object-contain"
                  />
                  <div className="text-[0.65rem] sm:text-xs lg:text-sm font-semibold text-black/80 text-center leading-tight px-1">
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
    <div className="min-h-screen relative">
      {/* Background Image - Responsive */}
      <div className="fixed inset-0 z-0">
        <Image
          src={backgroundImages[currentImageIndex]}
          alt="배경"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Main Content Container - Responsive */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Hero Section with Cards */}
        <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 h-full">
            {/* Left Side - Intro Image */}
            <div className="flex items-center justify-center lg:justify-start lg:flex-1">
              <div className="w-full max-w-md lg:max-w-none">
                <Image
                  src="/intro.png"
                  alt="인트로"
                  width={500}
                  height={500}
                  priority
                  className="w-full h-auto max-h-[min(40vh,400px)] lg:max-h-[min(60vh,600px)] object-contain"
                />
              </div>
            </div>

            {/* Right Side - Menu Cards */}
            <div className="flex-1 lg:flex-[1.5] flex items-start justify-center">
              <div className="w-full max-w-2xl h-fit mx-auto">
                {/* Desktop Layout (3 columns pyramid) */}
                <div className="hidden md:grid grid-cols-3 gap-3 lg:gap-4 xl:gap-6">
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

                {/* Mobile/Tablet Layout (2 columns) */}
                <div className="grid md:hidden grid-cols-2 gap-3 sm:gap-4">
                  {menuCards.map((card, index) => (
                    <MenuCard key={index} card={card} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Circle Menu */}
        <div className="relative z-20 pb-8">
          <BottomCircleMenu />
        </div>
      </div>
    </div>
  );
}