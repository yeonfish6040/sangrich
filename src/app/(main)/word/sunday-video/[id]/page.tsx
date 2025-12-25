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

  // Handle different YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/ // Direct video ID
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
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
      <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          {sermon.scripture}
        </h2>
        <div className="space-y-3 text-gray-700">
          <p>1절. 황제들만 내 마음에 원하는 바와 하나님께 구하는 바는 이스라엘을 위함이니 곧 그들로 구원을 받게 함이라</p>
          <p>2절. 내가 증언하노니 그들이 하나님께 열심이 있으나 올바른 지식을 따른 것이 아니니라</p>
          <p>3절. 하나님의 의를 모르고 자기 의를 세우려고 힘써 하나님의 의에 복종하지 아니하였느니라</p>
          <p>4절. 그리스도는 모든 믿는 자에게 의를 이루기 위하여 율법의 마침이 되시니라</p>
        </div>
      </div>

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
