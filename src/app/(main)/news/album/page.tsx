import dbConnect from '@/lib/mongodb';
import ChurchAlbum from '@/models/ChurchAlbum';
import Link from 'next/link';

interface PageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    searchType?: string;
  }>;
}

export default async function NewsAlbumPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const searchQuery = params.search || '';
  const searchType = params.searchType || '제목';
  const albumsPerPage = 12;

  await dbConnect();

  // Build search filter
  const filter: Record<string, unknown> = {};
  if (searchQuery) {
    if (searchType === '제목') {
      filter.title = { $regex: searchQuery, $options: 'i' };
    } else if (searchType === '작성자') {
      filter.author = { $regex: searchQuery, $options: 'i' };
    }
  }

  // Get total count
  const totalAlbums = await ChurchAlbum.countDocuments(filter);
  const totalPages = Math.ceil(totalAlbums / albumsPerPage);

  // Fetch albums for current page
  const albums = await ChurchAlbum.find(filter)
    .sort({ createdAt: -1 })
    .skip((currentPage - 1) * albumsPerPage)
    .limit(albumsPerPage)
    .lean();

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-10">
      {/* Header with post count */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          새글 0/{totalAlbums}
        </p>
      </div>

      {/* Search bar */}
      <div className="mb-8 flex gap-2">
        <form className="flex w-full gap-2" action="/news/album" method="get">
          <select
            name="searchType"
            defaultValue={searchType}
            className="rounded border border-gray-300 px-4 py-2"
          >
            <option value="제목">제목</option>
            <option value="작성자">작성자</option>
          </select>
          <input
            type="text"
            name="search"
            defaultValue={searchQuery}
            placeholder="검색어를 입력하세요"
            className="flex-1 rounded border border-gray-300 px-4 py-2"
          />
          <button
            type="submit"
            className="rounded bg-gray-700 px-6 py-2 text-white hover:bg-gray-800"
          >
            🔍
          </button>
        </form>
      </div>

      {/* Albums grid */}
      {albums.length === 0 ? (
        <div className="py-20 text-center text-gray-500">
          앨범이 없습니다.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {albums.map((album) => {
            const createdDate = new Date(album.createdAt);
            const formattedDate = createdDate
              .toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })
              .replace(/\. /g, '.')
              .replace(/\.$/, '');

            // Use thumbnail or first image
            const thumbnailImage = album.thumbnail || (album.images && album.images[0]);

            return (
              <Link
                key={album._id.toString()}
                href={`/news/album/${album._id.toString()}`}
                className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-lg"
              >
                {/* Thumbnail */}
                <div className="aspect-video overflow-hidden bg-gray-100">
                  {thumbnailImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={thumbnailImage}
                      alt={album.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="mb-2 line-clamp-2 text-base font-semibold text-gray-800 group-hover:text-blue-600">
                    {album.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{formattedDate}</span>
                    <span>조회 {album.viewCount}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 0 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          {/* First page */}
          {currentPage > 1 && (
            <a
              href={`/news/album?page=1${searchQuery ? `&search=${searchQuery}&searchType=${searchType}` : ''}`}
              className="rounded border px-3 py-1 hover:bg-gray-100"
            >
              &laquo;
            </a>
          )}

          {/* Previous page */}
          {currentPage > 1 && (
            <a
              href={`/news/album?page=${currentPage - 1}${searchQuery ? `&search=${searchQuery}&searchType=${searchType}` : ''}`}
              className="rounded border px-3 py-1 hover:bg-gray-100"
            >
              &lsaquo;
            </a>
          )}

          {/* Page numbers */}
          {Array.from({ length: Math.min(8, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 8) {
              pageNum = i + 1;
            } else if (currentPage <= 4) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 3) {
              pageNum = totalPages - 7 + i;
            } else {
              pageNum = currentPage - 3 + i;
            }

            return (
              <a
                key={pageNum}
                href={`/news/album?page=${pageNum}${searchQuery ? `&search=${searchQuery}&searchType=${searchType}` : ''}`}
                className={`rounded border px-3 py-1 ${
                  currentPage === pageNum
                    ? 'bg-gray-700 text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                {pageNum}
              </a>
            );
          })}

          {/* Next page */}
          {currentPage < totalPages && (
            <a
              href={`/news/album?page=${currentPage + 1}${searchQuery ? `&search=${searchQuery}&searchType=${searchType}` : ''}`}
              className="rounded border px-3 py-1 hover:bg-gray-100"
            >
              &rsaquo;
            </a>
          )}

          {/* Last page */}
          {currentPage < totalPages && (
            <a
              href={`/news/album?page=${totalPages}${searchQuery ? `&search=${searchQuery}&searchType=${searchType}` : ''}`}
              className="rounded border px-3 py-1 hover:bg-gray-100"
            >
              last
            </a>
          )}
        </div>
      )}
    </div>
  );
}
