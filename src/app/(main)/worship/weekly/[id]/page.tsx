import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';
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
  const canonical = `${baseUrl}/worship/weekly/${id}`;
  const ogImage = buildAbsoluteUrl(baseUrl, '/logo_horizontal.png');

  await dbConnect();
  const post = await Post.findById(id).lean();

  if (!post) {
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

  const description = '상리교회 주보';

  return {
    title: `${post.title} | 상리교회`,
    description,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description,
      url: canonical,
      type: 'article',
      siteName: '상리교회',
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [ogImage],
    },
  };
}

export default async function WeeklyDetailPage({ params }: PageProps) {
  const { id } = await params;

  await dbConnect();

  // Fetch the post and increment view count
  const post = await Post.findByIdAndUpdate(
    id,
    { $inc: { viewCount: 1 } },
    { new: true }
  ).lean();

  if (!post) {
    notFound();
  }

  const createdDate = new Date(post.createdAt);
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
        <h1 className="text-xl font-semibold text-white">{post.title}</h1>
      </div>

      {/* Meta information */}
      <div className="mb-6 flex items-center gap-3 border-b pb-4 text-sm text-gray-600">
        <span>{post.author}</span>
        <span>|</span>
        <span>등록일 : {formattedDate}</span>
        <span>|</span>
        <span>조회수 : {post.viewCount}</span>
        <span>|</span>
        <span>추천 : 0</span>
      </div>

      {/* Image gallery - display all bulletin images (base64) */}
      {post.images && post.images.length > 0 ? (
        <div className="space-y-6">
          {post.images.map((imageBase64: string, index: number) => (
            <div key={index} className="relative w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageBase64}
                alt={`${post.title} - 페이지 ${index + 1}`}
                className="h-auto w-full rounded shadow-lg"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="py-10 text-center text-gray-500">
          이미지가 없습니다.
        </div>
      )}

      {/* Share buttons */}
      <div className="mt-8">
        <ShareButtons title={post.title} />
      </div>

      {/* Comments section */}
      <div className="mt-10">
        <CommentSection postType="Post" postId={id} />
      </div>

      {/* Back to list button */}
      <div className="mt-10 flex justify-center gap-3">
        <a
          href="/worship/weekly"
          className="rounded bg-gray-700 px-6 py-2 text-white hover:bg-gray-800"
        >
          목록으로
        </a>
      </div>
    </div>
  );
}
