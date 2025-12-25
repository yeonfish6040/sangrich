'use client';

interface ShareButtonsProps {
  title: string;
  url?: string;
  description?: string;
  imageUrl?: string;
}

export default function ShareButtons({ title, url, description, imageUrl }: ShareButtonsProps) {
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const shareDescription = description || '상리치교회 소식을 공유합니다.';
  const shareImage = imageUrl || 'https://via.placeholder.com/300x300.png?text=상리치교회';

  const handleNaverBlog = () => {
    window.open(
      `https://blog.naver.com/openapi/share?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`,
      '_blank',
      'width=600,height=600'
    );
  };

  const handleTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
      '_blank',
      'width=600,height=600'
    );
  };

  const handleFacebook = () => {
    // Facebook Share Dialog 사용
    // 더 많은 옵션은 Facebook App ID가 필요합니다
    const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(title)}`;
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

        window.Kakao.Share.sendDefault({
          objectType: 'feed',
          content: {
            title: title,
            description: shareDescription,
            imageUrl: shareImage,
            link: {
              mobileWebUrl: shareUrl,
              webUrl: shareUrl,
            },
          },
          buttons: [
            {
              title: '자세히 보기',
              link: {
                mobileWebUrl: shareUrl,
                webUrl: shareUrl,
              },
            },
          ],
        });
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
      await navigator.clipboard.writeText(shareUrl);
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
          url: shareUrl,
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
