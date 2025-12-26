import Link from 'next/link';
import dbConnect from '@/lib/mongodb';
import Event from '@/models/Event';
import { requireAuth } from '@/lib/auth';

export default async function AdminEventsPage() {
  await requireAuth();
  await dbConnect();
  const events = await Event.find().sort({ date: -1 }).lean();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/admin" className="mb-2 text-sm text-blue-600 hover:underline">
                ← 관리자 대시보드
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">교회 일정 관리</h1>
            </div>
            <Link
              href="/admin/events/new"
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              + 새 일정 등록
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">제목</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">날짜</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">설명</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">등록일</th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">작업</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {events.length === 0 ? (
                <tr><td colSpan={5} className="py-10 text-center text-gray-500">등록된 일정이 없습니다.</td></tr>
              ) : (
                events.map((event) => (
                  <tr key={event._id.toString()} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{event.title}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                      {new Date(event.date).toLocaleDateString('ko-KR')}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{event.description || '-'}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                      {new Date(event.createdAt).toLocaleDateString('ko-KR')}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                      <Link href={`/admin/events/${event._id.toString()}`} className="mr-3 text-blue-600 hover:text-blue-900">수정</Link>
                      <button className="text-red-600 hover:text-red-900">삭제</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
