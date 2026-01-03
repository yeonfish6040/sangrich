import dbConnect from '@/lib/mongodb';
import Album from '@/models/Album';
import { notFound } from 'next/navigation';
import CommentSection from '@/components/CommentSection';
import ShareButtons from '@/components/ShareButtons';
import type { Metadata } from 'next';
import { buildAbsoluteUrl, getBaseUrl } from '@/lib/metadata';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const baseUrl = getBaseUrl();
  const canonical = `${baseUrl}/school/album/${id}`;
  const ogImage = buildAbsoluteUrl(baseUrl, '/logo_horizontal.png');

  await dbConnect();
  const album = await Album.findById(id).lean();

  if (!album) {
    return {
      alternates: { canonical },
      openGraph: {
        url: canonical,
        type: 'article',
        siteName: '상리교회',
        images: [{ url: ogImage }],
      },
      twitter: {
        card: 'summary_large_image',
        images: [ogImage],
      },
    };
  }

  const description = '상리교회 교회학교 앨범';

  return {
    title: `${album.title} | 상리교회`,
    description,
    alternates: { canonical },
    openGraph: {
      title: album.title,
      description,
      url: canonical,
      type: 'article',
      siteName: '상리교회',
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title: album.title,
      description,
      images: [ogImage],
    },
  };
}

export default async function AlbumDetailPage({ params }: PageProps) {
  const { id } = await params;

  await dbConnect();

  // Fetch the album and increment view count
  const album = await Album.findByIdAndUpdate(
    id,
    { $inc: { viewCount: 1 } },
    { new: true }
  ).lean();

  if (!album) {
    notFound();
  }

  const createdDate = new Date(album.createdAt);
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
      {/* Title */}
      <h1 className="mb-4 text-2xl font-bold text-gray-800">{album.title}</h1>

      {/* Meta information */}
      <div className="mb-6 flex items-center gap-3 border-b pb-4 text-sm text-gray-600">
        <span>작성자 {album.author}</span>
        <span>|</span>
        <span>등록일 {formattedDate}</span>
        <span>|</span>
        <span>조회수 {album.viewCount}</span>
        <span>|</span>
        <span>추천 {album.recommendCount}</span>
      </div>

      {/* Image gallery */}
      {album.images && album.images.length > 0 ? (
        <div className="mb-8 space-y-6">
          {album.images.map((imageBase64: string, index: number) => (
            <div key={index} className="relative w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageBase64}
                alt={`${album.title} - 사진 ${index + 1}`}
                className="h-auto w-full rounded shadow-lg"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="mb-8 py-10 text-center text-gray-500">
          이미지가 없습니다.
        </div>
      )}

      {/* Share buttons */}
      <div className="mt-8">
        <ShareButtons title={album.title} />
      </div>

      {/* Comments section */}
      <div className="mt-8">
        <CommentSection postType="Album" postId={id} />
      </div>

      {/* Back to list button */}
      <div className="mt-8 flex justify-center">
        <a
          href="/school/album"
          className="rounded bg-gray-700 px-6 py-2 text-white hover:bg-gray-800"
        >
          목록으로
        </a>
      </div>
    </div>
  );
}
