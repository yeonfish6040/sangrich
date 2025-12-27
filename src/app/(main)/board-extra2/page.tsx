import dbConnect from '@/lib/mongodb';
import BoardExtra2 from '@/models/BoardExtra2';
import Link from 'next/link';

interface PageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    searchType?: string;
  }>;
}

export default async function BoardExtra2Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const searchQuery = params.search || '';
  const searchType = params.searchType || '제목';
  const itemsPerPage = 15;

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
  const totalItems = await BoardExtra2.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Fetch items for current page
  const boards = await BoardExtra2.find(filter)
    .sort({ createdAt: -1 })
    .skip((currentPage - 1) * itemsPerPage)
    .limit(itemsPerPage)
    .lean();

  // Calculate item numbers (reverse order for display)
  const startNumber = totalItems - (currentPage - 1) * itemsPerPage;

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-10">
      <h1 className="mb-6 text-3xl font-bold">게시판 Extra 2</h1>

      {/* Search bar */}
      <div className="mb-6 flex gap-2">
        <form className="flex w-full gap-2" action="/board-extra2" method="get">
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
            검색
          </button>
        </form>
      </div>

      {/* Boards table */}
      <div className="overflow-x-auto border-t-2 border-gray-800">
        <table className="w-full">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="w-16 px-4 py-3 text-center text-sm font-semibold">
                번호
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold">
                제목
              </th>
              <th className="w-32 px-4 py-3 text-center text-sm font-semibold">
                작성자
              </th>
              <th className="w-32 px-4 py-3 text-center text-sm font-semibold">
                등록일
              </th>
              <th className="w-24 px-4 py-3 text-center text-sm font-semibold">
                조회수
              </th>
            </tr>
          </thead>
          <tbody>
            {boards.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-10 text-center text-gray-500">
                  게시글이 없습니다.
                </td>
              </tr>
            ) : (
              boards.map((board, index) => {
                const itemNumber = startNumber - index;
                const createdDate = new Date(board.createdAt);
                const formattedDate = createdDate
                  .toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })
                  .replace(/\. /g, '.')
                  .replace(/\.$/, '');

                return (
                  <tr
                    key={board._id.toString()}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 text-center text-sm">
                      {itemNumber}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <Link
                        href={`/board-extra2/${board._id.toString()}`}
                        className="hover:underline"
                      >
                        <div className="flex items-center gap-2">
                          {board.title}
                          {board.images && board.images.length > 0 && (
                            <span className="text-gray-400">📎</span>
                          )}
                        </div>
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-center text-sm">
                      {board.author}
                    </td>
                    <td className="px-4 py-3 text-center text-sm">
                      {formattedDate}
                    </td>
                    <td className="px-4 py-3 text-center text-sm">
                      {board.viewCount}
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
              href={`/board-extra2?page=1${searchQuery ? `&search=${searchQuery}&searchType=${searchType}` : ''}`}
              className="rounded border px-3 py-1 hover:bg-gray-100"
            >
              &laquo;
            </a>
          )}

          {/* Previous page */}
          {currentPage > 1 && (
            <a
              href={`/board-extra2?page=${currentPage - 1}${searchQuery ? `&search=${searchQuery}&searchType=${searchType}` : ''}`}
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
                href={`/board-extra2?page=${pageNum}${searchQuery ? `&search=${searchQuery}&searchType=${searchType}` : ''}`}
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
              href={`/board-extra2?page=${currentPage + 1}${searchQuery ? `&search=${searchQuery}&searchType=${searchType}` : ''}`}
              className="rounded border px-3 py-1 hover:bg-gray-100"
            >
              &rsaquo;
            </a>
          )}

          {/* Last page */}
          {currentPage < totalPages && (
            <a
              href={`/board-extra2?page=${totalPages}${searchQuery ? `&search=${searchQuery}&searchType=${searchType}` : ''}`}
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
