import Link from 'next/link';
import { requireAuth } from '@/lib/auth';

async function getFaithInfos() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/faith-info?limit=100`, {
    cache: 'no-store',
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.data;
}

export default async function AdminFaithInfoPage() {
  await requireAuth();
  const faithInfos = await getFaithInfos();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">신앙정보 공유 터 관리</h1>
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
          <div className="text-sm text-gray-600">전체 {faithInfos.length}개</div>
          <Link
            href="/admin/faith-info/new"
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            + 새 글 작성
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
              {faithInfos.map((info: any) => (
                <tr key={info._id}>
                  <td className="px-6 py-4 text-sm text-gray-900">{info.title}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">{info.author}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">{info.viewCount}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">
                    {new Date(info.createdAt).toLocaleDateString('ko-KR')}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-center text-sm">
                    <Link
                      href={`/admin/faith-info/${info._id}`}
                      className="text-blue-600 hover:text-blue-900 hover:underline"
                    >
                      수정
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {faithInfos.length === 0 && (
            <div className="py-12 text-center text-gray-500">등록된 게시물이 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
}
