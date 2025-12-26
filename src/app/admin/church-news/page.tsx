import Link from 'next/link';

async function getChurchNews() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/church-news?limit=100`, {
    cache: 'no-store',
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.data;
}

export default async function AdminChurchNewsPage() {
  const newsList = await getChurchNews();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">교회 소식 관리</h1>
            <Link
              href="/admin"
              className="rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
            >
              관리자 메인
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-6 flex justify-between">
          <div className="text-sm text-gray-600">전체 {newsList.length}개</div>
          <Link
            href="/admin/church-news/new"
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            + 새 소식 작성
          </Link>
        </div>

        <div className="overflow-hidden rounded-lg bg-white shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
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
                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                  관리
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {newsList.map((news: any) => (
                <tr key={news._id}>
                  <td className="px-6 py-4 text-sm text-gray-900">{news.title}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">{news.author}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">{news.viewCount}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">
                    {new Date(news.createdAt).toLocaleDateString('ko-KR')}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-center text-sm">
                    <Link
                      href={`/admin/church-news/${news._id}`}
                      className="text-blue-600 hover:text-blue-900 hover:underline"
                    >
                      수정
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {newsList.length === 0 && (
            <div className="py-12 text-center text-gray-500">등록된 소식이 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
}
