import Image from "next/image";

type TimeRow = { meeting: string; time: string };

type Bullet = { label: string; text: string; sub?: string[] };

function GreenDotTitle({ title }: { title: string }) {
  return (
    <div className="mt-10 flex items-center gap-3">
      <span className="h-5 w-5 rounded-full bg-[#2E7D32]" />
      <h2 className="text-[24px] font-extrabold tracking-[-0.02em] text-[#2E7D32]">
        {title}
      </h2>
    </div>
  );
}

function NumberLine({ n, text }: { n: string; text: string }) {
  return (
    <div className="flex gap-3">
      <span className="mt-[2px] flex-none text-[16px] font-bold text-[#333]">
        {n}
      </span>
      <div className="text-[16px] leading-7 text-[#333]">{text}</div>
    </div>
  );
}

function SimpleList({ items }: { items: (string | { n: string; text: string; sub?: string[] })[] }) {
  return (
    <div className="mt-4 space-y-2">
      {items.map((it, idx) => {
        if (typeof it === "string") {
          return (
            <div key={idx} className="text-[16px] leading-7 text-[#333]">
              {it}
            </div>
          );
        }

        return (
          <div key={idx} className="space-y-2">
            <NumberLine n={it.n} text={it.text} />
            {it.sub && it.sub.length > 0 && (
              <div className="ml-8 space-y-2">
                {it.sub.map((s, j) => (
                  <div key={j} className="text-[16px] leading-7 text-[#333]">
                    - {s}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function TimeTable({ rows }: { rows: TimeRow[] }) {
  return (
    <div className="mt-5 w-full overflow-x-auto">
      <table className="w-full border-collapse border border-[#b9b9b9]">
        <thead>
          <tr>
            <th className="w-[45%] border border-[#b9b9b9] bg-[#CFE28A] px-6 py-3 text-center text-[18px] font-extrabold text-[#5a5a5a]">
              집회
            </th>
            <th className="border border-[#b9b9b9] bg-[#CFE28A] px-6 py-3 text-center text-[18px] font-extrabold text-[#5a5a5a]">
              시간
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.meeting}>
              <td className="border border-[#b9b9b9] px-6 py-3 text-center text-[16px] font-semibold text-[#555]">
                {r.meeting}
              </td>
              <td className="border border-[#b9b9b9] px-6 py-3 text-center text-[16px] font-semibold text-[#555]">
                {r.time}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function WorshipPage() {
  const worshipItems = [
    { n: "①", text: "주일 오전 예배 : 경건과 감격이 넘치는 예배" },
    { n: "②", text: "주일 오후 예배 : 찬양 중심의 예배 찬양을 통하여 살아있는 예배" },
    { n: "③", text: "수요일 저녁기도회 : 말씀과 기도 중심의 예배" },
    { n: "④", text: "금요 속회예배 : 사랑의 교제와 중보기도" },
    { n: "⑤", text: "헌신예배 : 각 기관 주관예배" },
    { n: "⑥", text: "금요 연합속회 : 매월 마지막 주 금요일" },
    { n: "⑦", text: "새벽 기도회 : 중보기도 사역 수행 (나라, 가정, 자녀)" },
    {
      n: "⑧",
      text: "절기별 집중 기도회",
      sub: ["사순절 전교인 새벽기도회", "여름행사 준비 새벽기도회"],
    },
  ];

  const eduIntro = [
    "기독교 교육은 하나님 말씀에 기초되어 있고 하나님 자녀의 성품을",
    "갖도록 하는 게 목적이다.",
    "이 땅에서 부터 하나님 나라의 백성으로 살도록 교육을 실시한다.",
  ];

  const eduItems = [
    { n: "①", text: "기독교인을 위한 교양 및 문화 독서실 운영 - 장기" },
    { n: "②", text: "임원교육 세미나" },
    { n: "③", text: "새가족 성경공부 개설 (년 1회)" },
    { n: "④", text: "교육 자료실 운영 및 기자재 확충" },
    { n: "⑤", text: "속장/인도자 세미나 (년 1회)" },
    { n: "⑥", text: "성경 필사, 성경통독 권장" },
  ];

  const timeRows: TimeRow[] = [
    { meeting: "주일오전", time: "주일 오전 11:00" },
    { meeting: "주일찬양", time: "주일 오후 1:30" },
    { meeting: "수요기도", time: "수요 오후 7:30" },
    { meeting: "금요중보", time: "금요 오후 9:00" },
    { meeting: "새벽기도", time: "매일 오전 5:00" },
    { meeting: "아동부", time: "주일 오전 9:00" },
    { meeting: "학생회", time: "주일 오전 9:00" },
    { meeting: "청년부", time: "주일 오후 2:30" },
  ];

  return (
    <>
      <Image
        src={"/worship.png"}
        alt={"예배안내"}
        width={1000}
        height={500}
        className="w-full h-auto"
      />

      <div className="mx-auto w-full max-w-5xl px-6 py-10">
        <div className="space-y-2 text-[16px] font-semibold leading-7 text-[#333]">
          <p>맡기는 일은 사람이 할 일이고 이루시는 일은 하나님이 하실 일입니다.</p>
          <p>하나님의 손에서 복음통일을 위한 꿈을 꿉니다.</p>
          <p>오직 하나님만 신뢰하고, 하나님께 기도하며, 하나님만 바라봅시다.</p>
        </div>

        <GreenDotTitle title="예 배" />
        <SimpleList items={worshipItems} />

        <GreenDotTitle title="교 육" />
        <div className="mt-4 space-y-2 text-[16px] font-semibold leading-7 text-[#333]">
          {eduIntro.map((t, i) => (
            <p key={i}>{t}</p>
          ))}
        </div>
        <SimpleList items={eduItems} />

        <GreenDotTitle title="집회시간 안내" />
        <TimeTable rows={timeRows} />
      </div>
    </>
  );
}