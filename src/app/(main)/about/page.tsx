import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <br/>
      <h1 className="text-4xl text-center text-[#DE5F54] font-medium leading-16" style={{ fontFamily: 'var(--font-nanum-pen)', textShadow: '0.5px 0 0 currentColor' }}>상리교회 Vision : 채워지는 영성, 흘러넘치는 삶.</h1>
      <hr className={"border-[#DE5F54] border-1"}/>
      <br/>
      <p className={"w-full text-center font-medium"} style={{textShadow: '0.5px 0 0 currentColor'}}>2019년 표어 : 일을 행하시는 여호와(렘33:2)</p>
      <br/>
      <div className={"flex flex-row justify-between"}>
        <div className={"w-4/10 relative"}>
          <Image src={"/flower.png"} alt={"꽃들고있는사진"} width={1000} height={500} className={"w-full relative z-10"} />
        </div>
        <div className={"w-6/10 pl-8 z-10"}>
          <h1 className={"text-2xl text-[#CF3A2D] font-semibold leading-12"}>교회소개</h1>
          <div className={"text-sm text-[#545454] font-extrabold"}>
            상리교회는 기독교대한감리회에 속해 있는 교회입니다. <br/>
            1957년 5월 5일, 이산의 아픔을 가진 성도들이 모여 <br/>
            하나님의 나라와 하나님의 뜻이 이 땅에 온전히 이루어지기를 <br/>
            간절히 소망하는 마음으로 세워진 교회입니다.
          </div>
          <br/>
          <br/>
          <h1 className={"text-2xl text-[#CF3A2D] font-semibold leading-12"}>비전설명</h1>
          <div className={"text-sm text-[#545454] font-extrabold"}>
            상리교회의 비전 “Spillover"입니다. 즉 “채워지는 영성, 흘러넘치는 삶”입니다. 채움이 있어야 넘침이 있습니다. <br/>
            지금 우리는 과거 어느 때보다도 더 많은 자유를 누리고, 행동의 제재를 받지 않고, 갖고 싶은 것, 하고 싶은 것, 가고 싶은 곳, 생각하고 싶은 것을 마음대로 하면서도 영원한 기쁨이 없다는 사실입니다. 생수의 근원 기쁨의 근원인 예수 그리스도를 만나시길 바랍니다. 영생하도록 솟아나는 샘물이신 그리스도를 사모하시길 바랍니다. <br/>
            마음에 즐거움이 있어야 얼굴을 빛나게 하는 것처럼 채워져야 넘치게 됩니다. 말씀과 기도로 주님의 영성을 채웁시다. 차고 넘칠 때 까지 채웁시다. 영성은 쥐어짜내는 것이 아니라 차고 넘치는 것입니다. <br/>
            내 맘속에 채워지면 넘치게 됩니다. <br/>
            나의 심령에, 가정에, 교회에 주님의 은혜가 차고 넘치시길 기대하며 기도합니다.
          </div>
        </div>
      </div>
      <br/>
      <br/>
      <div className={"flex flex-row justify-between"}>
        <div className={"w-4/10"}>
          <h1 className={"text-2xl text-[#CF3A2D] font-semibold leading-12"}>표어설명</h1>
          <div className={"text-sm text-[#545454] font-extrabold"}>
            새로운 한해 기해년을 살아가는 우리 모두가 하나님의 인도하심 가운데 살기를 축원합니다. 우리 하나님은 일을 계획하시고, 그 일을 행하시며, 그것을 만들어 성취하시는 분이십니다. 하나님의 계획은 모든 사람들이 구원받게 하는 것이 하나님의 계획입니다. 그리고 모든 믿는 하나님의 자녀들에게 도움을 주시는 은혜와 복을 받게 하는 것이 하나님의 계획입니다. <br/>
            금년에 우리 상리교회를 향한 하나님의 계획은 반드시 성취되고 성취될 줄 믿습니다. 기도는 사람이 하지만 응답은 하나님이 하실 일입니다.
          </div>
        </div>
        <div className={"w-6/10 pl-8"}>
          <Image src={"/group_photo.png"} alt={"꽃들고있는사진"} width={1000} height={500} className={"w-full"} />
        </div>
      </div>
    </>
  );
}