import Image from "next/image";

export default function YouthPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <Image
        src={"/middle.png"}
        alt={"중등부"}
        width={1000}
        height={500}
        className="w-full h-auto"
        priority
      />

      <div className="mt-10 space-y-12">
        {/* 성구 */}
        <section>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-[#8B5A2B]">성구</h2>
          <p className="text-lg font-semibold leading-relaxed text-gray-700">
            “무릇 하나님께로부터 난 자마다 세상을 이기느니라. 세상을 이기는 승리는 이것이니 우리의
            믿음이니라 (요한일서 5장 4절)”
          </p>
        </section>

        {/* 의미 */}
        <section>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-[#8B5A2B]">의 미</h2>
          <p className="text-lg font-semibold leading-relaxed text-gray-700">
            “성경은 우리들에게 하나님을 만난 사람들을 소개하고 있다. 그리고 그들이 세상을 어떻게
            변화시켰는지 보여주고 있다. 우리는 청소년들이 이러한 사람들을 본받아 살도록 가르쳐야 한다.
            청소년부 교육과정을 통해 청소년들이 성경에서 롤모델을 발견하고 믿음으로 세상을 이기게 되기를
            소망한다.”
          </p>
        </section>

        {/* 교육목적 */}
        <section>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-[#8B5A2B]">교육목적</h2>
          <div className="space-y-2 text-lg font-semibold leading-relaxed text-gray-700">
            <p>(1) 하나님의 말씀을 마음에 새기며 순종하는 것을 알게 한다.</p>
            <p>(2) 예배를 통해서 예수님의 사랑을 경험하게 한다.</p>
            <p>(3) 하나님의 말씀과 예수님의 사랑을 가정과 친구들과 세상에 실천하게 한다.</p>
          </div>
        </section>

        {/* 교육목표 */}
        <section>
          <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-[#8B5A2B]">교육목표</h2>

          <div className="space-y-8 text-lg font-semibold leading-relaxed text-gray-700">
            <div>
              <h3 className="mb-3 text-xl font-extrabold text-gray-800">(1) 학 생</h3>
              <ul className="list-disc space-y-2 pl-6">
                <li>말씀을 통해서 창조주 하나님이 누구신지 깨닫게 된다.</li>
                <li>예배와 교육활동을 통해서 우리를 구원해주신 예수님의 사랑을 느끼게 된다.</li>
                <li>이웃을 사랑하고 섬기며 하나님 나라의 복음을 세상에 전하는 제자로 살게 된다.</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-xl font-extrabold text-gray-800">(2) 교 사</h3>
              <ul className="list-disc space-y-2 pl-6">
                <li>교사는 어린이들에게 하나님의 빛을 전달하는 사람임을 깨닫게 된다.</li>
                <li>교사는 예수님의 사랑을 어린이들에게 전달하는 제자라는 것을 경험하게 된다.</li>
                <li>교사가 먼저 자신의 삶 속에서 착한 행실로 하나님께 영광 돌리는 삶을 살게 된다.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 예배시간 및 장소 */}
        <section>
          <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-[#8B5A2B]">예배시간 및 장소</h2>

          <div className="overflow-hidden rounded-md border border-gray-300 bg-white">
            <div className="grid grid-cols-2">
              <div className="bg-gray-100 px-6 py-6 text-center text-lg font-bold text-gray-700">예배시간</div>
              <div className="px-6 py-6 text-center text-lg font-semibold text-gray-700">주일오전 11시</div>
            </div>
            <div className="grid grid-cols-2 border-t border-gray-300">
              <div className="bg-gray-100 px-6 py-6 text-center text-lg font-bold text-gray-700">장소</div>
              <div className="px-6 py-6 text-center text-lg font-semibold text-gray-700">소예배실(지하1층)</div>
            </div>
          </div>
        </section>

        {/* 활동 사진 */}
        <section>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/middle/img${num}.png`}
                  alt={`교회학교 활동 사진 ${num}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}