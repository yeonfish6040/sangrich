'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EditChurchNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
  });

  useEffect(() => {
    fetch(`/api/church-news/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setFormData({
            title: data.data.title,
            content: data.data.content,
            author: data.data.author,
          });
        }
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/church-news/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('소식이 수정되었습니다.');
        router.push('/admin/church-news');
      } else {
        alert('수정 실패');
      }
    } catch (error) {
      alert('오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const res = await fetch(`/api/church-news/${id}`, { method: 'DELETE' });
      if (res.ok) {
        alert('소식이 삭제되었습니다.');
        router.push('/admin/church-news');
      }
    } catch (error) {
      alert('삭제 실패');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <Link href="/admin/church-news" className="mb-2 text-sm text-blue-600 hover:underline">
            ← 목록으로
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">소식 수정</h1>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-10">
        <form onSubmit={handleSubmit} className="rounded-lg bg-white p-6 shadow">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">제목 *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">작성자</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">내용 *</label>
              <textarea
                required
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={15}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? '수정 중...' : '수정하기'}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              삭제
            </button>
            <Link href="/admin/church-news" className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50">
              취소
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
