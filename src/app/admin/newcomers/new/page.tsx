'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { compressImage } from '@/lib/imageCompression';

export default function NewNewComerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    introduction: '',
    author: '관리자',
    images: [] as string[],
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setLoading(true);
    try {
      const compressedImages = await Promise.all(
        Array.from(files).map((file) => compressImage(file, 1200, 1200, 0.8))
      );

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...compressedImages],
      }));
    } catch (error) {
      alert('이미지 처리 중 오류가 발생했습니다.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/newcomers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('새신자가 등록되었습니다.');
        router.push('/admin/newcomers');
      } else {
        alert('등록 실패');
      }
    } catch (error) {
      alert('오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <Link href="/admin/newcomers" className="mb-2 text-sm text-blue-600 hover:underline">
            ← 목록으로
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">새신자 등록</h1>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-10">
        <form onSubmit={handleSubmit} className="rounded-lg bg-white p-6 shadow">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">이름 *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="새신자 이름"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">소개</label>
              <textarea
                value={formData.introduction}
                onChange={(e) => setFormData({ ...formData, introduction: e.target.value })}
                rows={5}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="간단한 소개를 입력하세요"
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
              <label className="block text-sm font-medium text-gray-700">사진</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="mt-1 block w-full"
              />
              <p className="mt-1 text-xs text-gray-500">여러 이미지를 선택할 수 있습니다.</p>
            </div>

            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {formData.images.map((img, index) => (
                  <div key={index} className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={`이미지 ${index + 1}`} className="h-48 w-full rounded object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute right-2 top-2 rounded bg-red-600 px-2 py-1 text-xs text-white"
                    >
                      삭제
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? '등록 중...' : '등록하기'}
            </button>
            <Link href="/admin/newcomers" className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50">
              취소
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
