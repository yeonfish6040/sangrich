import Link from 'next/link';
import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';
import Sermon from '@/models/Sermon';
import Column from '@/models/Column';
import Album from '@/models/Album';
import ChurchAlbum from '@/models/ChurchAlbum';
import Event from '@/models/Event';
import Business from '@/models/Business';

export default async function AdminDashboard() {
  await dbConnect();

  // Get counts for each content type
  const [
    postsCount,
    sermonsCount,
    columnsCount,
    albumsCount,
    churchAlbumsCount,
    eventsCount,
    businessesCount,
  ] = await Promise.all([
    Post.countDocuments(),
    Sermon.countDocuments(),
    Column.countDocuments(),
    Album.countDocuments(),
    ChurchAlbum.countDocuments(),
    Event.countDocuments(),
    Business.countDocuments(),
  ]);

  const menuItems = [
    {
      title: '주보모음',
      description: '주보 이미지 관리',
      href: '/admin/posts',
      count: postsCount,
      color: 'bg-blue-500',
    },
    {
      title: '주일설교 영상',
      description: '설교 영상 관리',
      href: '/admin/sermons',
      count: sermonsCount,
      color: 'bg-green-500',
    },
    {
      title: '담임목사님 칼럼',
      description: '칼럼 글 관리',
      href: '/admin/columns',
      count: columnsCount,
      color: 'bg-purple-500',
    },
    {
      title: '교회학교 앨범',
      description: '교회학교 사진 관리',
      href: '/admin/albums',
      count: albumsCount,
      color: 'bg-yellow-500',
    },
    {
      title: '교회앨범',
      description: '교회 행사 사진 관리',
      href: '/admin/church-albums',
      count: churchAlbumsCount,
      color: 'bg-orange-500',
    },
    {
      title: '교회 일정',
      description: '일정 및 행사 관리',
      href: '/admin/events',
      count: eventsCount,
      color: 'bg-red-500',
    },
    {
      title: '교우사업터',
      description: '교우 사업체 관리',
      href: '/admin/businesses',
      count: businessesCount,
      color: 'bg-indigo-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">관리자 페이지</h1>
            <Link
              href="/"
              className="rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
            >
              메인으로
            </Link>
          </div>
        </div>
      </div>

      {/* Dashboard */}
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            컨텐츠 관리
          </h2>
          <p className="text-gray-600">
            각 섹션을 클릭하여 컨텐츠를 추가, 수정, 삭제할 수 있습니다.
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-xl"
            >
              <div className={`h-2 ${item.color}`} />
              <div className="p-6">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600">
                    {item.title}
                  </h3>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700">
                    {item.count}개
                  </span>
                </div>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-10 rounded-lg bg-white p-6 shadow">
          <h3 className="mb-4 text-lg font-semibold text-gray-800">
            전체 통계
          </h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {postsCount + sermonsCount + columnsCount}
              </div>
              <div className="text-sm text-gray-600">게시글</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {albumsCount + churchAlbumsCount}
              </div>
              <div className="text-sm text-gray-600">앨범</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {eventsCount}
              </div>
              <div className="text-sm text-gray-600">일정</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">
                {businessesCount}
              </div>
              <div className="text-sm text-gray-600">사업체</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
