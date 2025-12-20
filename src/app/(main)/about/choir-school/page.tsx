import Image from "next/image";

type Row = { label: string; names: string };

function Table({ rows }: { rows: Row[] }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse border border-[#d9d9d9] text-left">
        <thead>
        <tr>
          <th className="w-40 border border-[#d9d9d9] bg-[#f3f3f3] px-6 py-2 text-center text-lg font-semibold text-[#555]">
            구분
          </th>
          <th className="border border-[#d9d9d9] bg-[#9CC3E6] px-6 py-2 text-center text-lg font-semibold text-white">
            이름
          </th>
        </tr>
        </thead>
        <tbody>
        {rows.map((r) => (
          <tr key={r.label}>
            <td className="border border-[#d9d9d9] bg-[#f3f3f3] px-6 py-2 text-center text-base font-semibold text-[#666]">
              {r.label}
            </td>
            <td className="border border-[#d9d9d9] px-6 py-2 text-base text-[#8b8b8b] leading-9">
              {r.names}
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ChoirSchoolPage() {
  const choirRows: Row[] = [
    { label: "대 장", names: "박성수" },
    { label: "반 주", names: "김유진" },
    { label: "총 무", names: "홍태웅" },
    {
      label: "소프라노",
      names:
        "서성심 김 숙 장윤선 장은선 송희진 박신옥 엄신자 백은주 유은희 이보련 박윤정 박경숙 권은영 박금녀 신유라",
    },
    { label: "엘 토", names: "서성혜 박유빈 박경화 김윤이" },
    { label: "테 너", names: "홍태웅 김호정 김경민 김옥수" },
    { label: "베 이 스", names: "최이성 박성수 박훈호" },
  ];

  const schoolRows: Row[] = [
    { label: "교회학교장", names: "박성수" },
    { label: "교 육 부 장", names: "서성혜" },
    { label: "교회학교 총무", names: "박신옥" },
    { label: "교회학교 교사", names: "서성혜 박신옥 백은주 유은희" },
    { label: "중·고등부 교사", names: "박기훈 박성수 박경화 박윤정" },
    { label: "청 년 부 교사", names: "박기훈" },
  ];

  return (
    <>
      <Image
        src={"/choir-school.png"}
        alt={"찬양대 이미지"}
        width={1000}
        height={500}
        className={"h-auto w-full"}
      />

      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="mb-6 flex items-center gap-3">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#3B82F6] text-white text-sm font-bold">
            +
          </span>
          <h2 className="text-2xl font-extrabold text-[#222]">호산나 찬양대</h2>
        </div>


        <Table rows={choirRows} />

        <div className="my-14 border-t border-dashed border-[#d9d9d9]" />

        <div className="mb-6 flex items-center gap-3">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#3B82F6] text-white text-sm font-bold">
            +
          </span>
          <h2 className="text-2xl font-extrabold text-[#222]">교회학교</h2>
        </div>

        <Table rows={schoolRows} />
      </div>
    </>
  );
}