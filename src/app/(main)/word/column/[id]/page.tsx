import dbConnect from '@/lib/mongodb';
import Column from '@/models/Column';
import { notFound } from 'next/navigation';
import CommentSection from '@/components/CommentSection';
import ShareButtons from '@/components/ShareButtons';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ColumnDetailPage({ params }: PageProps) {
  const { id } = await params;

  await dbConnect();

  // Fetch the column and increment view count
  const column = await Column.findByIdAndUpdate(
    id,
    { $inc: { viewCount: 1 } },
    { new: true }
  ).lean();

  if (!column) {
    notFound();
  }

  const createdDate = new Date(column.createdAt);
  const formattedDate = createdDate
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\. /g, '.')
    .replace(/\.$/, '');

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10">
      {/* Post title in gray box */}
      <div className="mb-6 bg-gray-600 px-6 py-4">
        <h1 className="text-xl font-semibold text-white">{column.title}</h1>
      </div>

      {/* Meta information */}
      <div className="mb-6 flex items-center gap-3 border-b pb-4 text-sm text-gray-600">
        <span>{column.author}</span>
        <span>|</span>
        <span>등록일 : {formattedDate}</span>
        <span>|</span>
        <span>조회수 : {column.viewCount}</span>
        <span>|</span>
        <span>추천 : {column.recommendCount}</span>
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <div
          className="whitespace-pre-wrap leading-relaxed text-2xl font-semibold text-gray-800"
          dangerouslySetInnerHTML={{ __html: column.content }}
        />
      </div>

      {/* Share buttons */}
      <div className="mt-8">
        <ShareButtons title={column.title} />
      </div>

      {/* Comments section */}
      <div className="mt-10">
        <CommentSection postType="Column" postId={id} />
      </div>

      {/* Back to list button */}
      <div className="mt-10 flex justify-center">
        <a
          href="/word/column"
          className="rounded bg-gray-700 px-6 py-2 text-white hover:bg-gray-800"
        >
          목록으로
        </a>
      </div>
    </div>
  );
}
