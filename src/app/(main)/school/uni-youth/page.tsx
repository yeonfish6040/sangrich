import Image from "next/image";

export default function UniYouthPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <Image
        src={"/uni-youth.png"}
        alt={"대학/청년부"}
        width={1000}
        height={500}
        className="w-full h-auto"
        priority
      />

      <div className="mt-10 space-y-12 text-gray-700">
        {/* 표어 & 성구 */}
        <section className={"space-y-4 font-bold"}>
          <p className="text-lg font-semibold">(1) 표어</p>
          <p className="text-lg">“바로 알고! 바로 믿고! 바로 사는 청년부!”</p>

          <p className="pt-4 text-lg font-semibold">(2) 성구</p>
          <p className="leading-relaxed">
            “그러므로 예수께서 자기를 믿은 유대인들에게 이르시되 너희가 내 말에 거하면
            참으로 내 제자가 되고 진리를 알지니 진리가 너희를 자유롭게 하리라”
            (요 8:31~32)
          </p>
        </section>

        {/* 교육목표 */}
        <section className={"font-bold"}>
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
            <span className="h-3 w-3 rounded-full bg-green-500" /> 교육목표
          </h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>오게 한다. 영혼구원</li>
            <li>자라게 한다. 신앙생활</li>
            <li>거하게 한다. 생활훈련</li>
          </ul>
        </section>

        {/* 교육방침 */}
        <section className={"font-bold"}>
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
            <span className="h-3 w-3 rounded-full bg-green-500" /> 교육방침
          </h2>
          <ol className="list-decimal space-y-2 pl-6">
            <li>예배시간을 잘 지키고 하나님을 경외하는 마음으로 경건한 예배를 드리게 한다.</li>
            <li>구원의 확신을 가지고 복음을 선포하고 열심히 전도하게 한다.</li>
            <li>헌신적 봉사와 예수의 사랑을 실천하며 나눔의 삶을 살게 한다.</li>
          </ol>
        </section>

        {/* 핵심 교육 내용 */}
        <section className={"font-bold"}>
          <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
            <span className="h-3 w-3 rounded-full bg-green-500" /> 핵심 교육 내용 (예배, 말씀, 삶)
          </h2>

          <div className="space-y-6">
            <div>
              <p className="font-semibold">(1) 예배(결코 타협할 수 없는 영역)</p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>
                  거룩하게 구별하여 드리는 예배 <br/>
                  - 주일성수 <br/>
                  - 예배 시간 지키기
                </li>
                <li>
                  달란트를 통한 예배 섬김 <br/>
                  - 찬양단 : 반주, 베이스기타, 드럼, 찬양 <br/>
                  - 친교부 : 친교를 통하여 더욱 풍성한 예배를 만들어간다.
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold">(2) 말씀(우리를 풍성하게 해주는 근원)</p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>
                  QT로 여는 말씀의 생활화 <br/>
                  - QT 교재를 정하고 말씀을 매일 묵상하여 생활속에서 말씀을 실천하며 살아간다.
                </li>
                <li>
                  쉽고 편안한 말씀 <br/>
                  - 설교말씀과 성경공부가 일치되어 청년들이 쉽게 성경을 깨닫도록 한다.
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold">(3) 삶(우리가 믿음을 실현해야하는 현장)</p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>
                  제자훈련 <br/>
                  - 제자로 성장할 수 있도록 가능한 기회를 제공하여 제자훈련을 받을 수 있도록 인도한다.
                </li>
                <li>
                  충전 받는 청년 공동체 <br/>
                  - 엠티와 수련회 등을 통해 영적으로 방전되지 않고 충전 받을 수 있는 장을 열어준다.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 예배시간 및 장소 */}
        <section>
          <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
            <span className="h-3 w-3 rounded-full bg-green-500" /> 예배시간 및 장소
          </h2>

          <div className="overflow-hidden rounded-md border border-gray-300">
            <div className="grid grid-cols-2">
              <div className="bg-yellow-50 px-6 py-4 text-center font-semibold">예배시간</div>
              <div className="px-6 py-4 text-center">주일오후 1시</div>
            </div>
            <div className="grid grid-cols-2 border-t">
              <div className="bg-yellow-50 px-6 py-4 text-center font-semibold">장소</div>
              <div className="px-6 py-4 text-center">소예배실(지하1층)</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}