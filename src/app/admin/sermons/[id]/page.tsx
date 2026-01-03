'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { compressImage } from '@/lib/imageCompression';

export default function EditSermonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    scripture: '',
    scriptureText: '',
    preacher: '',
    videoUrl: '',
    sermonDate: '',
    thumbnail: '',
    isFeatured: false,
  });

  useEffect(() => {
    fetch(`/api/sermons/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const sermon = data.data;
          setFormData({
            title: sermon.title,
            scripture: sermon.scripture,
            scriptureText: sermon.scriptureText || '',
            preacher: sermon.preacher,
            videoUrl: sermon.videoUrl || '',
            sermonDate: new Date(sermon.sermonDate).toISOString().split('T')[0],
            thumbnail: sermon.thumbnail || '',
            isFeatured: sermon.isFeatured || false,
          });
        }
      });
  }, [id]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const compressed = await compressImage(file, 1200, 1200, 0.8);
      setFormData((prev) => ({
        ...prev,
        thumbnail: compressed,
      }));
    } catch (error) {
      alert('이미지 처리 중 오류가 발생했습니다.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const removeThumbnail = () => {
    setFormData((prev) => ({
      ...prev,
      thumbnail: '',
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/sermons/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('설교가 수정되었습니다.');
        router.push('/admin/sermons');
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
      const res = await fetch(`/api/sermons/${id}`, { method: 'DELETE' });
      if (res.ok) {
        alert('설교가 삭제되었습니다.');
        router.push('/admin/sermons');
      }
    } catch (error) {
      alert('삭제 실패');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <Link href="/admin/sermons" className="mb-2 text-sm text-blue-600 hover:underline">
            ← 설교 목록
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">설교 수정</h1>
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
              <label className="block text-sm font-medium text-gray-700">본문 *</label>
              <input
                type="text"
                required
                value={formData.scripture}
                onChange={(e) => setFormData({ ...formData, scripture: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">성경내용</label>
              <textarea
                value={formData.scriptureText}
                onChange={(e) => setFormData({ ...formData, scriptureText: e.target.value })}
                className="mt-1 block min-h-[140px] w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="필요한 경우에만 입력하세요."
              />
              <p className="mt-1 text-xs text-gray-500">
                비워두면 상세 페이지에 표시되지 않습니다.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">설교자</label>
              <input
                type="text"
                value={formData.preacher}
                onChange={(e) => setFormData({ ...formData, preacher: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">설교 날짜 *</label>
              <input
                type="date"
                required
                value={formData.sermonDate}
                onChange={(e) => setFormData({ ...formData, sermonDate: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">YouTube URL</label>
              <input
                type="text"
                value={formData.videoUrl}
                onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">썸네일 이미지 변경</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mt-1 block w-full"
              />
            </div>

            {formData.thumbnail && (
              <div className="relative w-full max-w-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={formData.thumbnail} alt="썸네일" className="h-48 w-full rounded object-cover" />
                <button
                  type="button"
                  onClick={removeThumbnail}
                  className="absolute right-2 top-2 rounded bg-red-600 px-2 py-1 text-xs text-white"
                >
                  삭제
                </button>
              </div>
            )}

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isFeatured"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-blue-600"
              />
              <label htmlFor="isFeatured" className="ml-2 text-sm text-gray-700">
                추천 설교로 표시
              </label>
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
            <Link href="/admin/sermons" className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50">
              취소
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
