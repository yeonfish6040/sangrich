import dbConnect from '@/lib/mongodb';
import NewComer from '@/models/NewComer';
import { notFound } from 'next/navigation';
import CommentSection from '@/components/CommentSection';
import ShareButtons from '@/components/ShareButtons';
import Link from 'next/link';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function NewComerDetailPage({ params }: PageProps) {
  const { id } = await params;

  await dbConnect();

  // Fetch the newcomer and increment view count
  const newcomer = await NewComer.findByIdAndUpdate(
    id,
    { $inc: { viewCount: 1 } },
    { new: true }
  ).lean();

  if (!newcomer) {
    notFound();
  }

  const createdDate = new Date(newcomer.createdAt);
  const formattedDate = createdDate
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\. /g, '.')
    .replace(/\.$/, '');

  const thumbnail = newcomer.images?.[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <Link href="/news/newbie" className="mb-2 text-sm text-blue-600 hover:underline">
            ← 목록으로
          </Link>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">{newcomer.name}</h1>
          <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
            <span>작성자: {newcomer.author}</span>
            <span>•</span>
            <span>조회수: {newcomer.viewCount}</span>
            <span>•</span>
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-10">
        {/* 소개글 */}
        {newcomer.introduction && (
          <div className="mb-8 rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">소개</h2>
            <p className="whitespace-pre-wrap text-gray-700">{newcomer.introduction}</p>
          </div>
        )}

        {/* 이미지 갤러리 */}
        {newcomer.images && newcomer.images.length > 0 ? (
          <div className="mb-8 space-y-6">
            {newcomer.images.map((imageBase64, index) => (
              <div key={index} className="relative w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageBase64}
                  alt={`${newcomer.name} - 사진 ${index + 1}`}
                  className="h-auto w-full rounded shadow-lg"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="mb-8 py-10 text-center text-gray-500">
            등록된 사진이 없습니다.
          </div>
        )}

        {/* Share buttons */}
        <div className="mt-8">
          <ShareButtons
            title={`새신자 소개 - ${newcomer.name}`}
            description={newcomer.introduction || '새가족을 소개합니다.'}
            imageUrl={thumbnail}
          />
        </div>

        {/* Comments section */}
        <div className="mt-8">
          <CommentSection postType="NewComer" postId={id} />
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/news/newbie"
            className="inline-block rounded-md border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-50"
          >
            목록으로
          </Link>
        </div>
      </div>
    </div>
  );
}
