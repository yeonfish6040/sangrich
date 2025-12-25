"use client";
import { useEffect, useState } from "react";

export default function Footer() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isEmailRefusalOpen, setIsEmailRefusalOpen] = useState(false);
  const privacyText = `< 상리교회 >('http://www.sangrich.or.kr'이하 '상리교회')은(는) 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.

○ 이 개인정보처리방침은 2019년 3월 22일부터 적용됩니다.


제1조(개인정보의 처리 목적)

< 상리교회 >('http://www.sangrich.or.kr'이하 '상리교회')은(는) 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.

1. 홈페이지 회원가입 및 관리

회원 가입의사 확인, 회원자격 유지·관리, 각종 고지·통지 등을 목적으로 개인정보를 처리합니다.


2. 재화 또는 서비스 제공

서비스 제공, 콘텐츠 제공을 목적으로 개인정보를 처리합니다.

3. 마케팅 및 광고에의 활용
접속빈도 파악 또는 회원의 서비스 이용에 대한 통계 등을 목적으로 개인정보를 처리합니다.


제2조(개인정보의 처리 및 보유 기간)

① < 상리교회 >은(는) 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.

② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.

1.<홈페이지 회원가입 및 관리>
<홈페이지 회원가입 및 관리>와 관련한 개인정보는 수집.이용에 관한 동의일로부터<준영구>까지 위 이용목적을 위하여 보유.이용됩니다.
보유근거 : 회원가입일로부터 서비스를 제공하는 기간 동안에 한하여 이용자의 개인정보를 보유 및 이용
관련법령 : 
1)신용정보의 수집/처리 및 이용 등에 관한 기록 : 3년
2) 소비자의 불만 또는 분쟁처리에 관한 기록 : 3년
3) 대금결제 및 재화 등의 공급에 관한 기록 : 5년
4) 계약 또는 청약철회 등에 관한 기록 : 5년
5) 표시/광고에 관한 기록 : 6개월

제3조(처리하는 개인정보의 항목)

① < 상리교회 >은(는) 다음의 개인정보 항목을 처리하고 있습니다.

1. < 홈페이지 회원가입 및 관리 >
  - 필수항목 :     비밀번호 질문과 답, 비밀번호, 로그인ID,  이름, 쿠키
  - 선택항목 :


제5조(개인정보처리의 위탁에 관한 사항)

① < 상리교회 >은(는) 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.

1. < 개인정보 처리 위탁 >
위탁받는 자 (수탁자) : 애니라인(주)
위탁하는 업무의 내용 : 회원가입
위탁기간 : 처리목적 달성 시 또는 위탁계약 종료시까지
② < 상리교회 >은(는) 위탁계약 체결시 「개인정보 보호법」 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적․관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리․감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.

③ 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본 개인정보 처리방침을 통하여 공개하도록 하겠습니다.



제6조(개인정보의 파기절차 및 파기방법)


① < 상리교회 > 은(는) 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.

② 개인정보 파기의 절차 및 방법은 다음과 같습니다.
1. 파기절차
< 상리교회 > 은(는) 파기 사유가 발생한 개인정보를 선정하고, < 상리교회 > 의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.

2. 파기방법

전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다
종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.


제7조(정보주체와 법정대리인의 권리·의무 및 그 행사방법에 관한 사항)



① 정보주체는 상리교회에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.

② 제1항에 따른 권리 행사는상리교회에 대해 「개인정보 보호법」 시행령 제41조제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 상리교회은(는) 이에 대해 지체 없이 조치하겠습니다.

③ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다.이 경우 “개인정보 처리 방법에 관한 고시(제2020-7호)” 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.

④ 개인정보 열람 및 처리정지 요구는 「개인정보 보호법」 제35조 제4항, 제37조 제2항에 의하여 정보주체의 권리가 제한 될 수 있습니다.

⑤ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.

⑥ 상리교회은(는) 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.



제8조(개인정보의 안전성 확보조치에 관한 사항)

< 상리교회 >은(는) 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.

1. 내부관리계획의 수립 및 시행
개인정보의 안전한 처리를 위하여 내부관리계획을 수립하고 시행하고 있습니다.

2. 개인정보의 암호화
이용자의 개인정보는 비밀번호는 암호화 되어 저장 및 관리되고 있어, 본인만이 알 수 있으며 중요한 데이터는 파일 및 전송 데이터를 암호화 하거나 파일 잠금 기능을 사용하는 등의 별도 보안기능을 사용하고 있습니다.



제9조(개인정보를 자동으로 수집하는 장치의 설치·운영 및 그 거부에 관한 사항)



① 상리교회 은(는) 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다.
② 쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터내의 하드디스크에 저장되기도 합니다.
가. 쿠키의 사용 목적 : 이용자가 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속 여부, 등을 파악하여 이용자에게 최적화된 정보 제공을 위해 사용됩니다.
나. 쿠키의 설치•운영 및 거부 : 웹브라우저 상단의 도구>인터넷 옵션>개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부 할 수 있습니다.
다. 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.


제10조(추가적인 이용·제공 판단기준)

< 상리교회 > 은(는) ｢개인정보 보호법｣ 제15조제3항 및 제17조제4항에 따라 ｢개인정보 보호법 시행령｣ 제14조의2에 따른 사항을 고려하여 정보주체의 동의 없이 개인정보를 추가적으로 이용·제공할 수 있습니다.
이에 따라 < 상리교회 > 가(이) 정보주체의 동의 없이 추가적인 이용·제공을 하기 위해서 다음과 같은 사항을 고려하였습니다.
▶ 개인정보를 추가적으로 이용·제공하려는 목적이 당초 수집 목적과 관련성이 있는지 여부

▶ 개인정보를 수집한 정황 또는 처리 관행에 비추어 볼 때 추가적인 이용·제공에 대한 예측 가능성이 있는지 여부

▶ 개인정보의 추가적인 이용·제공이 정보주체의 이익을 부당하게 침해하는지 여부

▶ 가명처리 또는 암호화 등 안전성 확보에 필요한 조치를 하였는지 여부

※ 추가적인 이용·제공 시 고려사항에 대한 판단기준은 사업자/단체 스스로 자율적으로 판단하여 작성·공개함



제11조 (개인정보 보호책임자에 관한 사항)

① 상리교회 은(는) 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.

▶ 개인정보 보호책임자
성명 :  
직책 :  
직급 :  
연락처 :  ,  
※ 개인정보 보호 담당부서로 연결됩니다.


▶ 개인정보 보호 담당부서
부서명 :  
담당자 :  
연락처 :  ,  
② 정보주체께서는 상리교회 의 서비스(또는 사업)을 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다. 상리교회 은(는) 정보주체의 문의에 대해 지체 없이 답변 및 처리해드릴 것입니다.



제12조(개인정보의 열람청구를 접수·처리하는 부서)
정보주체는 ｢개인정보 보호법｣ 제35조에 따른 개인정보의 열람 청구를 아래의 부서에 할 수 있습니다.
< 상리교회 >은(는) 정보주체의 개인정보 열람청구가 신속하게 처리되도록 노력하겠습니다.

▶ 개인정보 열람청구 접수·처리 부서
부서명 :  
담당자 :  
연락처 :  ,


제13조(정보주체의 권익침해에 대한 구제방법)



정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기 바랍니다.

1. 개인정보분쟁조정위원회 : (국번없이) 1833-6972 (www.kopico.go.kr)
2. 개인정보침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr)
3. 대검찰청 : (국번없이) 1301 (www.spo.go.kr)
4. 경찰청 : (국번없이) 182 (ecrm.cyber.go.kr)

「개인정보보호법」제35조(개인정보의 열람), 제36조(개인정보의 정정·삭제), 제37조(개인정보의 처리정지 등)의 규정에 의한 요구에 대 하여 공공기관의 장이 행한 처분 또는 부작위로 인하여 권리 또는 이익의 침해를 받은 자는 행정심판법이 정하는 바에 따라 행정심판을 청구할 수 있습니다.

※ 행정심판에 대해 자세한 사항은 중앙행정심판위원회(www.simpan.go.kr) 홈페이지를 참고하시기 바랍니다.

제14조(개인정보 처리방침 변경)


① 이 개인정보처리방침은 2019년 3월 22일부터 적용됩니다.`;
  const emailRefusalText = `웹사이트에 게시된 이메일 주소가 전자우편수집 프로그램이나 그 밖의 기술적장치를 이용하여 무단으로 수집되는 것을 거부하며,
이를 위반시 정보통신망법에 의해 형사처벌됨을 유념하시기 바랍니다

정보통신망 이용촉진 및 정보보호등에 관한 법률 제 50조의 2

전자우편주소의 무단수집행위 등 금지

1항  누구든지 전자우편 주소의 수집을 거부하는 의사가 명시된 인터넷 홈페이지에서 자동으로 전자우편 주소를 수집하는 프로그램 및 그 밖의 기술적 장치를 이용한 전자우편 주소를 수집하여서는 아니 된다

2항  누구든지 제 1항의 규정을 위반하여 수집된 전자우편 주소를 판매·유통 하여서는 안 된다

3항  누구든지 제 1항 및 제 2항의 규정에 의하여 수집·판매 및 유통이 금지된 전자우편주소임을 알고 이를 정보전송에 이용하여서는 아니된다`;

  useEffect(() => {
    if (!isPrivacyOpen && !isEmailRefusalOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setIsPrivacyOpen(false);
      setIsEmailRefusalOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isPrivacyOpen, isEmailRefusalOpen]);

  return (
    <footer
      className="w-full min-h-[153px] bg-repeat bg-left-top flex items-center justify-center"
      style={{
        backgroundImage:
          "url(/footerBG.jpg)",
      }}
    >
      <div className="relative mx-auto flex w-full max-w-screen-xl flex-col items-center px-4 py-4">
        {/* Top buttons */}
        <div className="flex w-full flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={() => setIsPrivacyOpen(true)}
            className="inline-flex h-7 w-28 items-center justify-center border border-white text-center text-[12px] leading-[1.6] text-white"
          >
            개인정보보호정책
          </button>
          <button
            type="button"
            onClick={() => setIsEmailRefusalOpen(true)}
            className="inline-flex h-7 w-28 items-center justify-center border border-white text-center text-[12px] leading-[1.6] text-white"
          >
            이메일수집거부
          </button>
        </div>

        {/* Address */}
        <p className="mt-4 md:mt-4 w-full text-center text-[13px] leading-[1.6] text-[#CECECE]">
          (18305) 경기도 화성시 봉담읍 상리2길 114  TEL : 031-227-1477
        </p>

        {/* Copyright */}
        <p className="mt-2 w-full text-center text-[13px] leading-[1.6] text-[#CECECE]">
          Copyright(C) 상리교회 all rights reserved.
        </p>
      </div>
      {isPrivacyOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="개인정보 처리방침"
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setIsPrivacyOpen(false)}
          />
          {/* Panel */}
          <div className="relative z-10 w-full max-w-3xl rounded-lg bg-white shadow-lg">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <h2 className="text-base font-semibold">개인정보 처리방침</h2>
              <button
                type="button"
                onClick={() => setIsPrivacyOpen(false)}
                className="rounded px-2 py-1 text-sm hover:bg-black/5"
                aria-label="닫기"
              >
                ✕
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto px-4 py-4 text-sm leading-7 text-neutral-800">
              <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-7 text-neutral-800">
                {privacyText}
              </pre>
            </div>

            <div className="flex justify-end gap-2 border-t px-4 py-3">
              <button
                type="button"
                onClick={() => setIsPrivacyOpen(false)}
                className="rounded border px-3 py-1.5 text-sm hover:bg-black/5"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
      {isEmailRefusalOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="이메일 무단수집거부"
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setIsEmailRefusalOpen(false)}
          />
          {/* Panel */}
          <div className="relative z-10 w-full max-w-3xl rounded-lg bg-white shadow-lg">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <h2 className="text-base font-semibold">이메일무단수집거부</h2>
              <button
                type="button"
                onClick={() => setIsEmailRefusalOpen(false)}
                className="rounded px-2 py-1 text-sm hover:bg-black/5"
                aria-label="닫기"
              >
                ✕
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto px-4 py-4 text-sm leading-7 text-neutral-800">
              <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-7 text-neutral-800">
                {emailRefusalText}
              </pre>
            </div>

            <div className="flex justify-end gap-2 border-t px-4 py-3">
              <button
                type="button"
                onClick={() => setIsEmailRefusalOpen(false)}
                className="rounded border px-3 py-1.5 text-sm hover:bg-black/5"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}