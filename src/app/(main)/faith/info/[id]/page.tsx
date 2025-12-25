import Link from 'next/link';
import CommentSection from '@/components/CommentSection';
import ShareButtons from '@/components/ShareButtons';

async function getFaithInfo(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/faith-info/${id}`, {
    cache: 'no-store',
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.data;
}

export default async function FaithInfoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const faithInfo = await getFaithInfo(id);

  if (!faithInfo) {
    return (
      <div className="min-h-screen bg-gray-50 py-20 text-center">
        <p className="text-gray-600">게시물을 찾을 수 없습니다.</p>
        <Link href="/faith/info" className="mt-4 inline-block text-blue-600 hover:underline">
          목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <Link href="/faith/info" className="mb-2 text-sm text-blue-600 hover:underline">
            ← 목록으로
          </Link>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">{faithInfo.title}</h1>
          <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
            <span>작성자: {faithInfo.author}</span>
            <span>•</span>
            <span>조회수: {faithInfo.viewCount}</span>
            <span>•</span>
            <span>{new Date(faithInfo.createdAt).toLocaleDateString('ko-KR')}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="rounded-lg bg-white p-8 shadow">
          <div className="prose max-w-none whitespace-pre-wrap text-gray-700">{faithInfo.content}</div>
        </div>

        {/* Share buttons */}
        <div className="mt-8">
          <ShareButtons title={faithInfo.title} />
        </div>

        <CommentSection postType="FaithInfo" postId={id} />

        <div className="mt-8 text-center">
          <Link
            href="/faith/info"
            className="inline-block rounded-md border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-50"
          >
            목록으로
          </Link>
        </div>
      </div>
    </div>
  );
}
