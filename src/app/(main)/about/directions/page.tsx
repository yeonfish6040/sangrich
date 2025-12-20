"use client"

import { MapPin, Phone, Share2, Copy } from "lucide-react";
import { useState } from "react";

export default function DirectionsPage() {
  const [copied, setCopied] = useState(false);

  const address = "(18305) 경기도 화성시 봉담읍 상리2길 114 상리교회";
  const phone = "031-227-1477";

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy address:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <h1 className="text-xl font-semibold text-gray-900 text-center">
          오시는 길
        </h1>
      </header>

      {/* Map Container */}
      <div className="w-full h-[420px] bg-gray-200">
        <iframe
          src="https://map.kakao.com/?urlX=462115&urlY=1066825&name=%EC%83%81%EB%A6%AC%EA%B5%90%ED%9A%8C&map_type=TYPE_MAP&from=roughmap"
          className="w-full h-full border-0"
          allowFullScreen
          title="상리교회 위치"
        />
      </div>

      {/* Kakao Map Branding */}
      <div className="bg-white px-4 py-2 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium text-gray-700">kakao</span>
          <span className="text-sm font-medium text-yellow-500">map</span>
        </div>
        <a
          href="https://map.kakao.com/?urlX=462115&urlY=1066825&name=%EC%83%81%EB%A6%AC%EA%B5%90%ED%9A%8C"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          길찾기
        </a>
      </div>

      {/* Info Section */}
      <div className="bg-white mt-2">
        {/* Address */}
        <div className="flex items-start gap-4 px-4 py-4 border-b border-gray-100">
          <div className="flex-shrink-0 w-16 flex items-center gap-2 text-gray-500">
            <MapPin className="w-5 h-5" />
            <span className="text-sm font-medium">주소</span>
          </div>
          <div className="flex-1">
            <p className="text-gray-800 text-sm leading-relaxed">{address}</p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-4 px-4 py-4 border-b border-gray-100">
          <div className="flex-shrink-0 w-16 flex items-center gap-2 text-gray-500">
            <Phone className="w-5 h-5" />
            <span className="text-sm font-medium">전화</span>
          </div>
          <div className="flex-1">
            <a
              href={`tel:${phone}`}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              {phone}
            </a>
          </div>
        </div>
      </div>

      {/* Share Section */}
      <div className="bg-white mt-2 px-4 py-3">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={handleCopyAddress}
            className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
          >
            <Copy className="w-4 h-4" />
            <span>{copied ? "복사됨!" : "주소복사"}</span>
          </button>
          <a
            href={`https://map.kakao.com/link/map/상리교회,37.2267,126.9528`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>공유하기</span>
          </a>
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-white mt-2 px-4 py-4">
        <h2 className="text-base font-semibold text-gray-900 mb-3">
          교통 안내
        </h2>
        <div className="space-y-3 text-sm text-gray-600">
          <div>
            <p className="font-medium text-gray-800 mb-1">🚌 버스</p>
            <p className="pl-5">봉담읍사무소 정류장 하차 후 도보 5분</p>
          </div>
          <div>
            <p className="font-medium text-gray-800 mb-1">🚗 자가용</p>
            <p className="pl-5">봉담IC에서 약 10분 거리</p>
            <p className="pl-5 text-gray-500">주차장 이용 가능</p>
          </div>
        </div>
      </div>
    </div>
  );
}