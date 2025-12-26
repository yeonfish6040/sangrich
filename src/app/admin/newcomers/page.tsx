import Link from 'next/link';

async function getNewComers() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/newcomers?limit=100`, {
    cache: 'no-store',
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.data;
}

export default async function AdminNewComersPage() {
  const newcomers = await getNewComers();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">새신자 관리</h1>
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
          <div className="text-sm text-gray-600">전체 {newcomers.length}명</div>
          <Link
            href="/admin/newcomers/new"
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            + 새신자 등록
          </Link>
        </div>

        <div className="overflow-hidden rounded-lg bg-white shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  이름
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                  작성자
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                  사진 수
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                  조회수
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                  등록일
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                  관리
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {newcomers.map((newcomer: any) => (
                <tr key={newcomer._id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{newcomer.name}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">
                    {newcomer.author}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">
                    {newcomer.images?.length || 0}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">
                    {newcomer.viewCount}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">
                    {new Date(newcomer.createdAt).toLocaleDateString('ko-KR')}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-center text-sm">
                    <Link
                      href={`/admin/newcomers/${newcomer._id}`}
                      className="text-blue-600 hover:text-blue-900 hover:underline"
                    >
                      수정
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {newcomers.length === 0 && (
            <div className="py-12 text-center text-gray-500">등록된 새신자가 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
}
