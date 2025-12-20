import Image from "next/image";

type SectionRow = string[];

function SectionTitle({ number, title }: { number: string; title: string }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4F735B] text-base font-bold text-white">
        {number}
      </div>
      <h2 className="text-2xl font-extrabold text-[#4F735B]">{title}</h2>
    </div>
  );
}

function GreenTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: SectionRow[];
}) {
  // column widths tuned to match the design (first columns narrower)
  const colWidths =
    headers.length === 3
      ? ["w-[150px]", "w-[140px]", ""]
      : ["w-[140px]", "w-[110px]", "w-[110px]", ""];

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse border border-[#b9b9b9]">
        <thead>
          <tr>
            {headers.map((h, idx) => (
              <th
                key={`${h}-${idx}`}
                className={`border border-[#8f8f8f] bg-[#4F735B] px-4 py-3 text-center text-base font-semibold text-white ${colWidths[idx] ?? ""}`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`border border-[#b9b9b9] px-4 py-4 text-sm leading-7 text-[#666] ${j === 0 ? "bg-[#f6f6f6] text-center font-semibold" : j > 0 && j < headers.length - 1 ? "text-center" : ""} ${colWidths[j] ?? ""}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function MissionGroupPage() {
  return (
    <>
      <Image
        src={"/mission-group.png"}
        alt={"선교대 및 속회"}
        width={1000}
        height={500}
        className="w-full h-auto"
      />

      <div className="mx-auto w-full max-w-5xl px-6 py-10">
        <SectionTitle number="01" title="선교회 현황" />

        <GreenTable
          headers={["선교회명", "회장", "회원"]}
          rows={[
            [
              "남선교회",
              "서성호",
              "최이성 서현하 염동섭 한양호 권석구 김문복 박석준 장경식 강흥석 황종수 박성수 박훈호 김영대 염일섭 황재순 김영호 박상훈 박상현 송영남 오병석",
            ],
            [
              "안나 여선교회",
              "백복순",
              "강순임 신응식 신희숙 유명선 이근호 이순이 허일영",
            ],
            [
              "드보라 여선교회",
              "배명숙",
              "석광숙 신일름 유광호 유금순 임영자 주영선 백미경 신성애 김춘이 어태실",
            ],
            [
              "수산나 여선교회",
              "서성심",
              "김 숙 박경화 백은주 서성혜 장윤선 박경숙 엄신자 주은선 한은숙",
            ],
            [
              "에스더 여선교회",
              "박신옥",
              "권은영 신유라 유은희 이보련 장은선 박금녀 이미정 유다연 박윤선 성 도 신지우",
            ],
            [
              "청장년 선교회",
              "홍태웅",
              "권봉용 김경민 김민철 김인철 박형준 백종혁 임웅택 신병철 유정식 홍승록 김옥수 박기덕 홍경훈 장원선 문상근 우관희",
            ],
            [
              "청년 선교회",
              "김호정",
              "박윤정 김유진 김유림 송희섭 송희진 박유빈",
            ],
            [
              "중고등부",
              "장윤정 / 임지연",
              "박유찬 백준영 홍진표 서채림 장준호 홍인표 김대민 장미나 장미단",
            ],
          ]}
        />

        <div className="my-14" />

        <SectionTitle number="02" title="속회조직" />

        <GreenTable
          headers={["속회명", "속장", "인도자", "속회원"]}
          rows={[
            [
              "믿음속",
              "임영자",
              "최이성",
              "유은희 유광호 장경식 유명선 이근호 문상근 백상현 백종혁 석광숙 백준영",
            ],
            [
              "소망속",
              "배명숙",
              "서현하",
              "김유복 한양호 황종수 신희숙 김영호 황재순 백복순 허일영 강순임 이순이 어태실",
            ],
            [
              "사랑속",
              "신일름",
              "홍태웅",
              "권석구 권봉용 신성애 서성호 홍진표 서채림 박경화 신유라 신병철 김 숙 홍인표 김순덕",
            ],
            [
              "화평속",
              "유금순",
              "박승열",
              "박석준 박상훈 염동섭 엄신자 우관희 박기덕 박훈호 백미경 주영선 신응식 강임희 박윤선 이미정 김춘이",
            ],
            [
              "양선속",
              "박신옥",
              "박성수",
              "장원선 송영남 홍승록 박형준 유정식 김인철 송희진 박유빈 장윤정 서성혜 장윤선 박경숙 주은선 이보련 성 도 송희섭 박유찬 장준호",
            ],
            [
              "충성속",
              "권은영",
              "김영대",
              "김경민 임웅택 홍경훈 김옥수 염일섭 김대민 서성심 백은주 장윤선 박금녀 신지우 엄다정",
            ],
          ]}
        />
      </div>
    </>
  );
}