import React from "react";

export default function HistoryPage() {
  const history: {[k: string] : {[k: string] : string[]}} = {
    "2020's": {
      "2020년 2월": ["박성수 장로 지방회에서 안수받다."],
    },
    "2010's": {
      "2018년 2월": ["김영대 장로 지방회에서 안수받다."],
      "2018년 1월 15일": ["제 12대 박승열 목사 부임하시다."],
      "2018년 1월": ["박성수 장로 당회에서 피택되다."],
      "2016년 1월": ["김영대 장로 당회에서 피택되다."],
      "2013년 2월": ["서현하 장로 지방회에서 은퇴하다."]
    },
    "2000's": {
      "2009년 2월": ["최이성 장로 지방회에서 은퇴하다."],
      "2008년 4월 1일": ["제 11대 김성학 목사 재임하시다."],
      "2005년 4월": ["제 10대 홍기섭목사 재임하시다."],
    },
    "1980's" : {
      "1988년": ["제 9대 이석진 목사 재임하시다."],
      "1984년": ["최이성 장로, 서현하 장로 지방회에서 안수받다."],
      "1983년 2월 22일": ["제 8대 박동원 목사 재임하시다."],
      "1981년 11월": ["제 7대 박충구 목사 재임하시다."],
      "1980년 8월": ["제 6대 이인재 목사 재임하시다."],
    },
    "1970's" : {
      "1979년 11월": ["제 5대 이수만 전도사 재임하시다."],
      "1979년": ["최이성 장로, 서현하 장로 당회에서 피택되다."],
      "1978년 8월": ["제 4대 김상길 목사 재임하시다."],
      "1978년 1월": ["제 3대 김효섭 목사 재임하시다."],
      "1976년 4월": ["제 2대 조창희 전도사 재임하시다."],
    },
    "1960's" : {
      "1964년 3월 29일": ["제 1대 양준택목사 재임하시다.\n원로목사로 추대하다", "상리 나사렛교회를 기독교 대한 감리회\n수원서지방 상리교회로 명칭 변경하다.\n설립자: 양준택 목사"],
    },
    "1950's" : {
      "1957년 5월 5일": ["상리 나사렛교회로 창립예배\n설립자 故김가진 전도사"],
    },
  }

  return (
    <>
      <div className={"flex flex-row border-t-4 border-t-[#fd6d52] border-b-2 border-b-[#fd6d52] justify-around p-1"}>
        <div>&nbsp;</div>
        {Object.keys(history).map((year, i) => {
          return (
            <React.Fragment key={year}>
              <a href={"#"+year} className="text-[#646464] text-center font-bold text-lg">{year}</a>
              {Object.keys(history).length - 1 === i ? null : (<div className="w-0">|</div>)}
            </React.Fragment>
          )
        })}
        <div>&nbsp;</div>
      </div>
      <br/>
      <br/>
      <p className={"text-right text-6xl text-[#fd6d52] leading-9"} style={{ fontFamily: 'var(--font-nanum-myeongjo)' }}>HISTORY</p>
      {Object.keys(history).map((year, i) => {
        return (
          <div key={year} id={year} className={"flex flex-row h-fit w-full mb-8 gap-8"}>
            <div className={"bg-cover bg-center w-1/4 aspect-square text-right flex flex-col justify-between"} style={{ backgroundImage: `url(/yearBG${i%2+1}.png)` }}>
              <div className="spacer">&nbsp;</div>
              <div className={"mb-8 mr-4 text-4xl text-white italic font-semibold"} style={{ fontFamily: 'var(--font-nanum-myeongjo)' }}>{year}</div>
            </div>
            <div className={"border-t-2 border-t-[#fd6d52] flex-1"}>
              {Object.keys(history[year]).map((month, j) => {
                return history[year][month].map((event, k) => {
                  return (
                    <div key={year+month+event+k} className={"flex flex-row items-center gap-2 mt-4"}>
                      <span className={"text-xs text-[#fd6d52]"}>■</span>
                      <span className={"text-base font-bold"}>{month}</span>
                      &nbsp;
                      <span className={"text-base font-base"}>{event}</span>
                    </div>
                  )
                })
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}