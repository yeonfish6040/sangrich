'use client';

import Script from 'next/script';

export default function KakaoScript() {
  const handleLoad = () => {
    // 카카오 SDK가 로드되면 초기화
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init('67974bb23d4f798e20fb2c4b9d86264a');
      console.log('Kakao SDK initialized successfully');
      console.log('Kakao.isInitialized():', window.Kakao.isInitialized());
    }
  };

  return (
    <Script
      src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.7/kakao.min.js"
      integrity="sha384-tJkjbtDbvoxO+diRuDtwRO9JXR7pjWnfjfRn5ePUpl7e7RJCxKCwwnfqUAdXh53p"
      crossOrigin="anonymous"
      strategy="afterInteractive"
      onLoad={handleLoad}
    />
  );
}
