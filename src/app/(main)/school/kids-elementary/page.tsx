import Image from "next/image";

export default function KidsElementaryPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <Image
        src={"/kids.png"}
        alt={"예배안내"}
        width={1000}
        height={500}
        className="w-full h-auto"
        priority
      />

      {/* Content below the hero image */}
      <div className="mt-10 space-y-10">
        {/* 의미 */}
        <section>
          <div className="mb-4 flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 text-sky-600">
              ✓
            </span>
            <h2 className="text-2xl font-bold text-gray-800">의미</h2>
          </div>

          <div className="rounded-md border border-gray-200 bg-gray-50 p-6 text-gray-700">
            <p className="leading-relaxed font-bold">
              “하나님께서는 창세기부터 요한계시록까지 예수그리스도를 통한 구원의 계획을 성경을
              통하여 우리에게 계시하셨다. 그러나 여전히 많은 그리스도인들은 성경에 계시된
              하나님의 뜻을 알지 못한 채 세상의 지식과 가치만을 추구하며 살아가고 있다. 이러한
              때에 우리가 주목해야 할 것은 오직 하나님의 말씀이다. 우리가 하나님의 말씀에 다시
              한 번 집중할 때 우리를 향한 구원의 계획을 깨닫고, 하나님께서 원하시는 하나님의
              자녀로서의 삶을 살아가게 될 것이다.”
            </p>
          </div>
        </section>

        {/* 교육목적 */}
        <section>
          <div className="mb-4 flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 text-sky-600">
              ✓
            </span>
            <h2 className="text-2xl font-bold text-gray-800">교육목적</h2>
          </div>

          <div className="rounded-md border border-gray-200 bg-white p-6">
            <div className="space-y-8 text-gray-700">
              <div className={"font-bold"}>
                <h3 className="mb-2 text-lg font-semibold">(1) 어린이</h3>
                <ul className="list-disc space-y-2 pl-6 leading-relaxed">
                  <li>예배를 적극적으로 참여함으로 우리를 사랑하시는 하나님의 마음을 깨닫게 된다.</li>
                  <li>성경을 단편적인 사건이 아닌 전체 흐름을 볼 수 있는 안목이 생기게 된다.</li>
                  <li>세상 역사의 주관자가 하나님이심을 알게 된다.</li>
                </ul>
              </div>

              <div className={"font-bold"}>
                <h3 className="mb-2 text-lg font-semibold">(2) 교 사</h3>
                <ul className="list-disc space-y-2 pl-6 leading-relaxed">
                  <li>어린이가 예배 안에서 하나님을 만나는 기쁨을 전달하는 중요성을 깨닫게 된다.</li>
                  <li>복음의 감격을 가지고 어린이들에게 복음을 명확하게 제시하게 된다.</li>
                  <li>어린이들에게 섬김이 무엇인지 몸소 실천하며, 기도와 나눔으로 어린이들을 돕게 된다.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 예배시간 및 장소 */}
        <section>
          <div className="mb-4 flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 text-sky-600">
              ✓
            </span>
            <h2 className="text-2xl font-bold text-gray-800">예배시간 및 장소</h2>
          </div>

          <div className="overflow-hidden rounded-md border border-gray-200 bg-white">
            <div className="grid grid-cols-2">
              <div className="bg-teal-400/70 px-6 py-4 text-center font-semibold text-white">
                예배시간
              </div>
              <div className="bg-teal-400/70 px-6 py-4 text-center font-semibold text-white">장소</div>
            </div>
            <div className="grid grid-cols-2 border-t border-gray-200">
              <div className="bg-gray-100 px-6 py-6 text-center text-gray-800">주일오전 9시</div>
              <div className="px-6 py-6 text-center text-gray-800">소예배실</div>
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
                  src={`/kids/img${num}.png`}
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