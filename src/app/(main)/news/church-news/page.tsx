import Link from 'next/link';

async function getChurchNews(page: number, search: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/church-news?page=${page}&limit=15&search=${search}`,
    { cache: 'no-store' }
  );
  if (!res.ok) return { data: [], pagination: { page: 1, limit: 15, total: 0, totalPages: 0 } };
  return res.json();
}

export default async function ChurchNewsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || '1');
  const searchQuery = params.search || '';
  const result = await getChurchNews(currentPage, searchQuery);
  const { data: newsList, pagination } = result;

  const getPageNumbers = () => {
    const pages = [];
    const maxPages = 8;
    let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
    let endPage = Math.min(pagination.totalPages, startPage + maxPages - 1);

    if (endPage - startPage + 1 < maxPages) {
      startPage = Math.max(1, endPage - maxPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <h1 className="text-3xl font-bold text-gray-900">교회 소식</h1>
          <p className="mt-2 text-gray-600">교회의 다양한 소식을 전합니다.</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-6 flex items-center justify-between">
          <form method="GET" className="flex gap-2">
            <input
              type="text"
              name="search"
              defaultValue={searchQuery}
              placeholder="검색어를 입력하세요"
              className="rounded-md border border-gray-300 px-4 py-2"
            />
            <button type="submit" className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
              검색
            </button>
          </form>
          <div className="text-sm text-gray-600">전체 {pagination.total}개</div>
        </div>

        <div className="overflow-hidden rounded-lg bg-white shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                  번호
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  제목
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                  작성자
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                  조회수
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                  작성일
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {newsList.map((news: any, index: number) => {
                const displayNumber = pagination.total - (currentPage - 1) * pagination.limit - index;
                return (
                  <tr key={news._id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-900">
                      {displayNumber}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <Link href={`/news/church-news/${news._id}`} className="hover:text-blue-600 hover:underline">
                        {news.title}
                      </Link>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">{news.author}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">
                      {news.viewCount}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">
                      {new Date(news.createdAt).toLocaleDateString('ko-KR')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {newsList.length === 0 && (
            <div className="py-12 text-center text-gray-500">등록된 게시물이 없습니다.</div>
          )}
        </div>

        {pagination.totalPages > 1 && (
          <div className="mt-6 flex justify-center gap-2">
            {currentPage > 1 && (
              <Link
                href={`/news/church-news?page=${currentPage - 1}${searchQuery ? `&search=${searchQuery}` : ''}`}
                className="rounded border border-gray-300 px-3 py-1 hover:bg-gray-50"
              >
                이전
              </Link>
            )}

            {getPageNumbers().map((pageNum) => (
              <Link
                key={pageNum}
                href={`/news/church-news?page=${pageNum}${searchQuery ? `&search=${searchQuery}` : ''}`}
                className={`rounded border px-3 py-1 ${
                  pageNum === currentPage
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                {pageNum}
              </Link>
            ))}

            {currentPage < pagination.totalPages && (
              <Link
                href={`/news/church-news?page=${currentPage + 1}${searchQuery ? `&search=${searchQuery}` : ''}`}
                className="rounded border border-gray-300 px-3 py-1 hover:bg-gray-50"
              >
                다음
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
