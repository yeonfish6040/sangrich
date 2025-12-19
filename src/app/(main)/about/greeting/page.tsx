import Image from "next/image";

export default function GreetingPage() {
  return (
    <div className={"flex flex-col gap-2"}>
      <Image
        src="/main_character.png"
        alt="담임목사님"
        width={260}
        height={100}
        priority
        className="w-1/3 object-contain"
      />
      <div>
        <div className={"text-right"}>
          <p>할렐루야</p>
          <p>예수 그리스도의 이름으로</p>
          <p>여러분의 을 합니다.</p>
        </div>
      </div>
    </div>
  );
}