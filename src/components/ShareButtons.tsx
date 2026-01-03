'use client';

import { useEffect, useState } from 'react';

interface ShareButtonsProps {
  title: string;
  url?: string;
  description?: string;
  imageUrl?: string;
}

export default function ShareButtons({ title, url, description, imageUrl }: ShareButtonsProps) {
  const [resolvedUrl, setResolvedUrl] = useState('');

  const normalizeUrl = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return '';
    if (typeof window !== 'undefined' && trimmed.startsWith('/')) {
      return `${window.location.origin}${trimmed}`;
    }
    return trimmed;
  };

  const resolveShareUrl = () => {
    if (resolvedUrl) return resolvedUrl;
    if (url) return normalizeUrl(url);
    if (typeof window !== 'undefined') return window.location.href;
    return process.env.NEXT_PUBLIC_SITE_URL || '';
  };

  const resolveShareImage = () => {
    if (imageUrl) return normalizeUrl(imageUrl);
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/logo_horizontal.png`;
    }
    const base = process.env.NEXT_PUBLIC_SITE_URL;
    return base ? `${base}/logo_horizontal.png` : '';
  };

  useEffect(() => {
    if (url) {
      setResolvedUrl(normalizeUrl(url));
      return;
    }
    if (typeof window !== 'undefined') {
      setResolvedUrl(window.location.href);
    }
  }, [url]);

  const shareDescription = description || '상리교회 소식을 공유합니다.';
  const shareImage = resolveShareImage() || 'https://via.placeholder.com/300x300.png?text=상리치교회';

  const handleNaverBlog = () => {
    const safeUrl = resolveShareUrl();
    window.open(
      `https://blog.naver.com/openapi/share?url=${encodeURIComponent(safeUrl)}&title=${encodeURIComponent(title)}`,
      '_blank',
      'width=600,height=600'
    );
  };

  const handleTwitter = () => {
    const safeUrl = resolveShareUrl();
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(safeUrl)}&text=${encodeURIComponent(title)}`,
      '_blank',
      'width=600,height=600'
    );
  };

  const handleFacebook = () => {
    const safeUrl = resolveShareUrl();
    // Facebook Share Dialog 사용
    // 더 많은 옵션은 Facebook App ID가 필요합니다
    const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(safeUrl)}&quote=${encodeURIComponent(title)}`;
    window.open(
      fbShareUrl,
      'facebook-share-dialog',
      'width=800,height=600'
    );
  };

  const handleKakao = () => {
    if (typeof window !== 'undefined' && window.Kakao) {
      try {
        // 카카오 SDK가 초기화되어 있는지 확인
        if (!window.Kakao.isInitialized()) {
          alert('카카오톡 공유 기능 초기화 중입니다. 잠시 후 다시 시도해주세요.');
          return;
        }

        const safeUrl = resolveShareUrl();
        if (!safeUrl) {
          alert('공유 링크를 불러오지 못했습니다. 페이지를 새로고침 해주세요.');
          return;
        }

        if (window.Kakao.Share?.sendScrap) {
          window.Kakao.Share.sendScrap({
            requestUrl: safeUrl,
          });
          return;
        }

        if (window.Kakao.Link?.sendScrap) {
          window.Kakao.Link.sendScrap({
            requestUrl: safeUrl,
          });
          return;
        }

        alert('카카오톡 공유 기능을 사용할 수 없습니다.');
      } catch (error) {
        console.error('카카오톡 공유 실패:', error);
        alert('카카오톡 공유에 실패했습니다.');
      }
    } else {
      alert('카카오톡 SDK가 로드되지 않았습니다. 페이지를 새로고침 해주세요.');
    }
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(resolveShareUrl());
      alert('링크가 복사되었습니다.');
    } catch (err) {
      alert('링크 복사에 실패했습니다.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert('다운로드 기능은 관리자에게 문의하세요.');
  };

  const handleWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: title,
          url: resolveShareUrl(),
        });
      } catch (err) {
        // 사용자가 취소한 경우 무시
        if ((err as Error).name !== 'AbortError') {
          console.error('공유 실패:', err);
        }
      }
    } else {
      handleCopyUrl();
    }
  };

  return (
    <div className="border-t pt-6">
      <div className="mb-3 text-center text-sm font-medium text-gray-700">
        공유하기
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {/* Naver Blog */}
        <button
          onClick={handleNaverBlog}
          className="flex h-12 w-12 items-center justify-center rounded bg-[#03C75A] text-lg font-bold text-white transition hover:opacity-80"
          title="네이버 블로그"
          type="button"
        >
          N
        </button>

        {/* Twitter */}
        <button
          onClick={handleTwitter}
          className="flex h-12 w-12 items-center justify-center rounded bg-[#1DA1F2] text-lg text-white transition hover:opacity-80"
          title="트위터"
          type="button"
        >
          𝕏
        </button>

        {/* Facebook */}
        <button
          onClick={handleFacebook}
          className="flex h-12 w-12 items-center justify-center rounded bg-[#1877F2] text-lg font-bold text-white transition hover:opacity-80"
          title="페이스북"
          type="button"
        >
          f
        </button>

        {/* KakaoTalk */}
        <button
          onClick={handleKakao}
          className="flex h-12 w-12 items-center justify-center rounded bg-[#FEE500] text-lg font-bold text-[#3C1E1E] transition hover:opacity-80"
          title="카카오톡"
          type="button"
        >
          K
        </button>

        {/* Mobile Web Share API or URL Copy */}
        <button
          onClick={handleWebShare}
          className="flex h-12 w-12 items-center justify-center rounded bg-blue-600 text-white transition hover:opacity-80"
          title="공유"
          type="button"
        >
          📤
        </button>

        {/* URL Copy */}
        <button
          onClick={handleCopyUrl}
          className="flex h-12 w-12 items-center justify-center rounded bg-gray-600 text-white transition hover:opacity-80"
          title="주소 복사"
          type="button"
        >
          🔗
        </button>

        {/* Print */}
        <button
          onClick={handlePrint}
          className="flex h-12 w-12 items-center justify-center rounded bg-gray-500 text-white transition hover:opacity-80"
          title="인쇄"
          type="button"
        >
          🖨
        </button>

        {/* Download */}
        <button
          onClick={handleDownload}
          className="flex h-12 w-12 items-center justify-center rounded bg-gray-500 text-white transition hover:opacity-80"
          title="파일 다운로드"
          type="button"
        >
          📥
        </button>
      </div>
    </div>
  );
}
