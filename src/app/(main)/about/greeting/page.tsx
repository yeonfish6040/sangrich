import Image from "next/image";

export default function GreetingPage() {
  return (
    <div className={"flex flex-row gap-2"}>
      <Image
        src="/main_character.png"
        alt="담임목사님"
        width={260}
        height={100}
        priority
        className="w-2/7 h-fit"
      />
      <div className={"w-full pt-5"}>
        <div className={"text-right"}>
          <p className={"text-4xl font-bold text-[#888888]"}>할렐루야!</p>
          <p className={"text-3xl text-[#888888]"}>예수 그리스도의 이름으로</p>
          <p className={"text-3xl text-[#888888]"}>여러분의 <Image src={"/visit.png"} width={100} height={200} alt={"방문"} className={"h-12 w-auto inline"} />을&nbsp;&nbsp;<Image src={"/greeting.png"} width={100} height={100} alt={"방문"} className={"h-12 w-auto inline"} />합니다.</p>
        </div>
        <br/>
        <div className={"text-sm font-semibold text-[#777777] leading-6"}>
          상리교회는 하나님의 나라와 하나님의 뜻이 이 땅에 온전히 이루어지기를 <br/>
          간절히 소망하는 맘으로 세워진 교회입니다. <br/>
          봉지뿌리에 작은 등불이었던 상리교회가 이제 봉담 2지구 안에 <br/>
          새로운 비전인 “채워지는 영성 흘러넘치는 삶”으로 하나님의 거룩한 성품을 회복함으로 <br/>
          행복한 공동체를 이루고 있습니다. <br/>
          성도가 행복한 교회, 세상이 인정하는 교회가 하나님이 가장 기뻐하시는 교회라 생각하며 <br/>
          비신자도 불편해 하지 않는 교회, 이웃과 성도를 행복하게 하는 교회, 이 지역에 꼭 필요한 교회가 되기를 소망합니다. <br/>
          ‘수고하고 무거운 짐 진 자들아 다 내게로 오라 내가 너희를 쉬게 하리라.’(마11:28)
        </div>

        <br/>
        <br/>
        <h1 className={"text-[#68995E] text-xl leading-16"}>박승열 목사 프로필</h1>
        <h2 className={"text-base font-semibold leading-8"}>학력</h2>
        <p className={"text-sm text-[#777777] font-semibold"}>*감리교신학대학 신학과</p>
        <p className={"text-sm text-[#777777] font-semibold"}>*웨슬리신학대학(M.Div)</p>
        <p className={"text-sm text-[#777777] font-semibold"}>*Master’s Graduate School of Divinity 공동목회학 박사(D.Min)</p>
        <br/>

        <h2 className={"text-base font-semibold leading-8"}>약력</h2>
        <p className={"text-sm text-[#777777] font-semibold"}>*남양지방 장덕중앙교회</p>
        <p className={"text-sm text-[#777777] font-semibold"}>*철원서지방 장흥교회</p>
        <p className={"text-sm text-[#777777] font-semibold"}>*사강지방 천등교회</p>
        <p className={"text-sm text-[#777777] font-semibold"}>*현재 화성동지방 상리교회를 섬기고 있습니다.</p>
      </div>
    </div>
  );
}