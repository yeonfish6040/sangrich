import dbConnect from '@/lib/mongodb';
import Sermon from '@/models/Sermon';
import { notFound } from 'next/navigation';
import CommentSection from '@/components/CommentSection';
import ShareButtons from '@/components/ShareButtons';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// Extract YouTube video ID from URL
function getYouTubeVideoId(url: string): string | null {
  if (!url) return null;
  const raw = url.trim();
  if (!raw) return null;

  const directMatch = raw.match(/^([a-zA-Z0-9_-]{11})$/);
  if (directMatch) return directMatch[1];

  const patterns = [
    /(?:youtu\.be\/)([^?&#/]+)/,
    /(?:youtube\.com\/watch\?v=)([^&?#]+)/,
    /(?:youtube\.com\/embed\/)([^?&#/]+)/,
    /(?:youtube\.com\/shorts\/)([^?&#/]+)/,
    /(?:youtube\.com\/live\/)([^?&#/]+)/,
  ];

  for (const pattern of patterns) {
    const match = raw.match(pattern);
    if (match) return match[1];
  }

  return null;
}

export default async function SermonDetailPage({ params }: PageProps) {
  const { id } = await params;

  await dbConnect();

  // Fetch the sermon and increment view count
  const sermon = await Sermon.findByIdAndUpdate(
    id,
    { $inc: { viewCount: 1 } },
    { new: true }
  ).lean();

  if (!sermon) {
    notFound();
  }

  const sermonDate = new Date(sermon.sermonDate);
  const formattedDate = sermonDate
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\. /g, '.')
    .replace(/\.$/, '');

  const youtubeVideoId = getYouTubeVideoId(sermon.videoUrl);

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10">
      {/* Video Player */}
      <div className="mb-8">
        {youtubeVideoId ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black shadow-lg">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeVideoId}`}
              title={sermon.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        ) : sermon.thumbnail ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-100 shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={sermon.thumbnail}
              alt={sermon.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <span className="text-4xl text-white">▶</span>
            </div>
          </div>
        ) : (
          <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-gray-200">
            <span className="text-gray-500">동영상이 없습니다</span>
          </div>
        )}
      </div>

      {/* Sermon Info Card */}
      <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-start gap-3">
          <span className="text-2xl">🎤</span>
          <h1 className="flex-1 text-2xl font-bold text-gray-800">
            {sermon.title}
          </h1>
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <p>
            <span className="font-semibold">{sermon.preacher}</span> | {sermon.scripture} | {formattedDate}
          </p>
        </div>
      </div>

      {/* Sermon Outline */}
      {sermon.scriptureText && (
        <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-gray-800">
            {sermon.scripture}
          </h2>
          <div className="whitespace-pre-line text-lg font-semibold text-gray-700">
            {sermon.scriptureText}
          </div>
        </div>
      )}

      {/* Share buttons */}
      <div className="mt-8">
        <ShareButtons title={sermon.title} />
      </div>

      {/* Comments section */}
      <div className="mt-8">
        <CommentSection postType="Sermon" postId={id} />
      </div>

      {/* Navigation buttons */}
      <div className="mt-8 flex justify-center gap-3">
        <a
          href="#"
          className="rounded border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-50"
        >
          &lt; 이전
        </a>
        <a
          href="/word/sunday-video"
          className="rounded bg-gray-700 px-6 py-2 text-white hover:bg-gray-800"
        >
          목록
        </a>
      </div>
    </div>
  );
}
