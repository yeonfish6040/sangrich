import dbConnect from '@/lib/mongodb';
import Sermon from '@/models/Sermon';
import Link from 'next/link';

interface PageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    searchType?: string;
  }>;
}

export default async function SundayVideoPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const searchQuery = params.search || '';
  const searchType = params.searchType || '제목';
  const sermonsPerPage = 15;

  await dbConnect();

  // Build search filter
  const filter: Record<string, unknown> = {};
  if (searchQuery) {
    if (searchType === '제목') {
      filter.title = { $regex: searchQuery, $options: 'i' };
    } else if (searchType === '설교자') {
      filter.preacher = { $regex: searchQuery, $options: 'i' };
    } else if (searchType === '본문') {
      filter.scripture = { $regex: searchQuery, $options: 'i' };
    }
  }

  // Get total count
  const totalSermons = await Sermon.countDocuments(filter);
  const totalPages = Math.ceil(totalSermons / sermonsPerPage);

  // Fetch sermons for current page
  const sermons = await Sermon.find(filter)
    .sort({ sermonDate: -1 })
    .skip((currentPage - 1) * sermonsPerPage)
    .limit(sermonsPerPage)
    .lean();

  // Calculate sermon numbers (reverse order for display)
  const startNumber = totalSermons - (currentPage - 1) * sermonsPerPage;

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-10">
      {/* Breadcrumb */}
      <div className="mb-4 text-sm text-gray-600">
        홈 &gt; 생명말씀 &gt; 주일설교 영상
      </div>

      {/* Title */}
      <h1 className="mb-8 text-3xl font-bold text-gray-800">주일설교 영상</h1>

      {/* Search bar */}
      <div className="mb-6 flex gap-2">
        <form className="flex w-full gap-2" action="/word/sunday-video" method="get">
          <select
            name="searchType"
            defaultValue={searchType}
            className="rounded border border-gray-300 px-4 py-2"
          >
            <option value="제목">제목</option>
            <option value="설교자">설교자</option>
            <option value="본문">본문</option>
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
            검색
          </button>
        </form>
      </div>

      {/* Sermons table */}
      <div className="overflow-x-auto border-t-2 border-gray-300">
        <table className="w-full">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="w-16 px-4 py-3 text-center text-sm font-semibold">
                번호
              </th>
              <th className="w-32 px-4 py-3 text-center text-sm font-semibold">
                사진
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold">
                제목
              </th>
              <th className="w-40 px-4 py-3 text-center text-sm font-semibold">
                본문
              </th>
              <th className="w-32 px-4 py-3 text-center text-sm font-semibold">
                설교자
              </th>
              <th className="w-32 px-4 py-3 text-center text-sm font-semibold">
                날짜
              </th>
              <th className="w-20 px-4 py-3 text-center text-sm font-semibold">
                보기
              </th>
            </tr>
          </thead>
          <tbody>
            {sermons.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-gray-500">
                  설교 영상이 없습니다.
                </td>
              </tr>
            ) : (
              sermons.map((sermon, index) => {
                const sermonNumber = startNumber - index;
                const sermonDate = new Date(sermon.sermonDate);
                const formattedDate = sermonDate
                  .toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })
                  .replace(/\. /g, '-')
                  .replace(/\.$/, '');

                return (
                  <tr
                    key={sermon._id.toString()}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 text-center">
                      {sermon.isFeatured ? (
                        <div className="flex justify-center">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-700">
                            <span className="text-white">★</span>
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm">{sermonNumber}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center">
                        {sermon.thumbnail ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={sermon.thumbnail}
                            alt={sermon.title}
                            className="h-[75px] w-[100px] rounded object-cover"
                          />
                        ) : (
                          <div className="flex h-[75px] w-[100px] items-center justify-center rounded bg-gray-200 text-xs text-gray-500">
                            No Image
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <Link
                        href={`/word/sunday-video/${sermon._id.toString()}`}
                        className="hover:underline"
                      >
                        {sermon.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-center text-sm">
                      {sermon.scripture}
                    </td>
                    <td className="px-4 py-3 text-center text-sm">
                      {sermon.preacher}
                    </td>
                    <td className="px-4 py-3 text-center text-sm">
                      {formattedDate}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center">
                        <Link
                          href={`/word/sunday-video/${sermon._id.toString()}`}
                          className="flex h-8 w-8 items-center justify-center rounded bg-gray-600 hover:bg-gray-700"
                        >
                          <span className="text-sm text-white">▶</span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 0 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {/* First page */}
          {currentPage > 1 && (
            <a
              href={`/word/sunday-video?page=1${searchQuery ? `&search=${searchQuery}&searchType=${searchType}` : ''}`}
              className="rounded border px-3 py-1 hover:bg-gray-100"
            >
              &laquo;
            </a>
          )}

          {/* Previous page */}
          {currentPage > 1 && (
            <a
              href={`/word/sunday-video?page=${currentPage - 1}${searchQuery ? `&search=${searchQuery}&searchType=${searchType}` : ''}`}
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
                href={`/word/sunday-video?page=${pageNum}${searchQuery ? `&search=${searchQuery}&searchType=${searchType}` : ''}`}
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
              href={`/word/sunday-video?page=${currentPage + 1}${searchQuery ? `&search=${searchQuery}&searchType=${searchType}` : ''}`}
              className="rounded border px-3 py-1 hover:bg-gray-100"
            >
              &rsaquo;
            </a>
          )}

          {/* Last page */}
          {currentPage < totalPages && (
            <a
              href={`/word/sunday-video?page=${totalPages}${searchQuery ? `&search=${searchQuery}&searchType=${searchType}` : ''}`}
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
