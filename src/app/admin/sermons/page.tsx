'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminSermonsPage() {
  const [sermons, setSermons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSermons();
  }, []);

  const fetchSermons = async () => {
    try {
      const res = await fetch('/api/sermons');
      const data = await res.json();
      if (data.success) {
        setSermons(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch sermons:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const res = await fetch(`/api/sermons/${id}`, { method: 'DELETE' });
      if (res.ok) {
        alert('삭제되었습니다.');
        fetchSermons();
      } else {
        alert('삭제 실패');
      }
    } catch (error) {
      alert('오류가 발생했습니다.');
    }
  };

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">로딩 중...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/admin" className="mb-2 text-sm text-blue-600 hover:underline">
                ← 관리자 대시보드
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">주일설교 영상 관리</h1>
            </div>
            <Link
              href="/admin/sermons/new"
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              + 새 설교 등록
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
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">본문</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">설교자</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">날짜</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">조회수</th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">작업</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {sermons.length === 0 ? (
                <tr><td colSpan={6} className="py-10 text-center text-gray-500">등록된 설교가 없습니다.</td></tr>
              ) : (
                sermons.map((sermon) => (
                  <tr key={sermon._id.toString()} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{sermon.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{sermon.scripture}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{sermon.preacher}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                      {new Date(sermon.sermonDate).toLocaleDateString('ko-KR')}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{sermon.viewCount}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                      <Link href={`/admin/sermons/${sermon._id.toString()}`} className="mr-3 text-blue-600 hover:text-blue-900">수정</Link>
                      <button
                        onClick={() => handleDelete(sermon._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        삭제
                      </button>
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
