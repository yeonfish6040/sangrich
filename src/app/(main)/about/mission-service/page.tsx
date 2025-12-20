import Image from "next/image";

type Bullet = {
  text: string;
  sub?: string[];
};

type Section = {
  title: string;
  intro?: string[];
  bullets: Bullet[];
};

function Divider() {
  return (
    <div className="my-12 flex items-center gap-3">
      <span className="h-2 w-2 rounded-full bg-[#d9d9d9]" />
      <div className="h-px w-full bg-[#d9d9d9]" />
      <span className="h-2 w-2 rounded-full bg-[#d9d9d9]" />
    </div>
  );
}

function BulletList({ items }: { items: Bullet[] }) {
  return (
    <ul className="space-y-3">
      {items.map((b, idx) => (
        <li key={idx}>
          <div className="flex gap-3">
            <span className="mt-3 h-2 w-2 flex-none rounded-[2px] bg-[#3B82F6]" />
            <div className="text-base leading-8 text-[#3a3a3a]">
              <span className="font-semibold">{b.text}</span>
              {b.sub && b.sub.length > 0 && (
                <ul className="mt-2 space-y-2 pl-1">
                  {b.sub.map((s, j) => (
                    <li key={j} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[#3B82F6] opacity-70" />
                      <span className="text-base leading-8 text-[#4a4a4a] font-semibold">{s}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

function SectionBlock({ section }: { section: Section }) {
  return (
    <section>
      <h2 className="text-[32px] font-extrabold tracking-[-0.02em] text-[#1E3A8A]">
        {section.title}
      </h2>

      {section.intro && section.intro.length > 0 && (
        <div className="mt-4 space-y-2 text-base leading-8 text-[#333]">
          {section.intro.map((p, i) => (
            <p key={i} className="font-semibold">
              {p}
            </p>
          ))}
        </div>
      )}

      <div className="mt-6">
        <BulletList items={section.bullets} />
      </div>
    </section>
  );
}

export default function MissionServicePage() {
  const sections: Section[] = [
    {
      title: "전도 및 선교",
      intro: [
        "교회의 생명력은 선교에 있다. 한 영혼을 소중히 여기는 마음으로 잃어버린 영혼을 찾아 나서는 자세가 필요하다.",
        "각 선교회는 한 형제 한 자매임을 알고 새 가족 돌보는 일부터 관심을 갖고 섬기자.",
      ],
      bullets: [
        {
          text: "해외 선교",
          sub: [
            "해외 협력선교사 후원 - 미얀마(오흥석), 중국(강훈석), 필리핀(정원기), 인도차이나선교회.",
          ],
        },
        {
          text: "국내 선교",
          sub: [
            "미자립 교회 지원",
            "- 화성동지방 와우만나교회(김현진), - 감신동문 장학회",
            "선교비 지원교회 방문, 초청, 전도 지원",
            "선교단체 및 기관 연대,",
          ],
        },
        { text: "성장하는 교회 탐방(년 1 회)" },
        { text: "전도 및 새 교인 양육-(총동원 주일)" },
      ],
    },
    {
      title: "사회봉사",
      bullets: [
        { text: "관내 생활보호 대상자 및 독거노인, 결식아동 돕기" },
        { text: "장학사업 : 장학위원회 운영" },
        { text: "경로잔치 및 효도관광" },
        { text: "사랑의 실천을 위한 바자회 개최 : 총 여선교회 주관" },
        { text: "관내 환경미화원, 집배원 위로연 : 년 1회" },
      ],
    },
    {
      title: "문화",
      bullets: [
        { text: "교회역사 발굴 작업" },
        { text: "주민들의 문화욕구 충족을 위한 공간 제공" },
        { text: "기독교 유적지 순례 : 양화진, 강화지역, 철원지역," },
        { text: "찬양축제, 상리가족 한마음축제" },
      ],
    },
  ];

  return (
    <>
      <Image
        src={"/mission-service.png"}
        alt={"선교 및 봉사"}
        width={1000}
        height={600}
        className="h-auto w-full"
      />

      <div className="mx-auto w-full max-w-5xl px-6 py-12">
        <SectionBlock section={sections[0]} />
        <Divider />
        <SectionBlock section={sections[1]} />
        <Divider />
        <SectionBlock section={sections[2]} />
        <div className="mt-10 h-px w-full bg-[#3B82F6]" />
      </div>
    </>
  );
}