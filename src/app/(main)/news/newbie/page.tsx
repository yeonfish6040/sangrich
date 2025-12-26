import Link from 'next/link';

async function getNewComers(page: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/newcomers?page=${page}&limit=12`,
    { cache: 'no-store' }
  );
  if (!res.ok) return { data: [], pagination: { page: 1, limit: 12, total: 0, totalPages: 0 } };
  return res.json();
}

export default async function NewComerPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || '1');
  const result = await getNewComers(currentPage);
  const { data: newcomers, pagination } = result;

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-6 text-right text-sm text-gray-600">전체 {pagination.total}명</div>

        {newcomers.length === 0 ? (
          <div className="py-20 text-center text-gray-500">등록된 새신자가 없습니다.</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {newcomers.map((newcomer: any) => {
              const thumbnail = newcomer.images?.[0] || '';
              return (
                <Link
                  key={newcomer._id}
                  href={`/news/newbie/${newcomer._id}`}
                  className="group overflow-hidden rounded-lg bg-white shadow transition hover:shadow-lg"
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
                    {thumbnail ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={thumbnail}
                        alt={newcomer.name}
                        className="h-full w-full object-cover transition group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-gray-400">
                        <span className="text-6xl">👤</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">{newcomer.name}</h3>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{new Date(newcomer.createdAt).toLocaleDateString('ko-KR')}</span>
                      <span>조회 {newcomer.viewCount}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {pagination.totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            {currentPage > 1 && (
              <Link
                href={`/news/newbie?page=${currentPage - 1}`}
                className="rounded border border-gray-300 px-4 py-2 hover:bg-gray-50"
              >
                이전
              </Link>
            )}

            {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => {
              const pageNum = currentPage > 3 ? currentPage - 2 + i : i + 1;
              if (pageNum > pagination.totalPages) return null;
              return (
                <Link
                  key={pageNum}
                  href={`/news/newbie?page=${pageNum}`}
                  className={`rounded border px-4 py-2 ${
                    pageNum === currentPage
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </Link>
              );
            })}

            {currentPage < pagination.totalPages && (
              <Link
                href={`/news/newbie?page=${currentPage + 1}`}
                className="rounded border border-gray-300 px-4 py-2 hover:bg-gray-50"
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
