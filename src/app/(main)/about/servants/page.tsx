export default function ServantsPage() {
  const servants: {[k: string] : string[][]} = {
    "담임목사": [
      ["박승열", "목사", "BAKSEUNGNYEOL.png"]
    ],
    "전도사": [
      ["김성민", "전도사", "GIMSEONGMIN.png"]
    ],
    "시무장로": [
      ["김영대", "장로", "GIMYEONGDAE.png"],
      ["박성수", "장로", "sspark.png"]
    ],
    "원로장로": [
      ["최이성", "원로장로", "CHOEISEONG.png"],
      ["염동설", "원로장로", "YEOMDONGSEOL.png"],
      ["서현하", "원로장로", "SEOHYEONHA.png"]
    ],
    "명예장로": [
      ["황풍수", "명예장로", "HWANGPUNGSU.png"]
    ],
  }

  return (
    <>
      <br/>
      <div>
        {Object.keys(servants).map((k) => {
          return (
            <div key={k}>
              <h2 className="text-lg text-[#bcbcbc] font-semibold" style={{ fontFamily: 'var(--font-nanum-myeongjo)' }}>Category</h2>
              <div className={"flex flex-row items-center gap-6"}>
                <h2 className={"text-2xl font-bold"}>{k}</h2>
                <div className={"relative flex-1 h-0.5 bottom-1.5 bg-[#e5e5e5]"}></div>
              </div>
              <br/>
              <div className={"flex flex-row gap-8"}>
                {servants[k].map((p) => {
                  return (
                    <div key={k+p}>
                      <div className={"w-56 h-80 border-4 border-[#dedede] bg-cover bg-center flex flex-col justify-between"} style={{ backgroundImage: "url(/servants/"+p[2]+")" }}>
                        <div className={"spacer"}>&nbsp;</div>
                        <div className={"p-5"}>
                          <div className={"text-white text-lg font-extrabold leading-8"} style={{textShadow: '1px 0 0 #000'}}>{p[0]}</div>
                          <div className={"text-white text-sm font-semibold"} style={{textShadow: '0.5px 0 0 #000'}}>{p[1]}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

      </div>
    </>
  );
}