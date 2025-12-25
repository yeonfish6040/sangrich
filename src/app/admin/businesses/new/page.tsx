'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { compressImage } from '@/lib/imageCompression';

export default function NewBusinessPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    category: '음식업' as '음식업' | '개인사업' | '공의사업',
    ownerName: '',
    ownerTitle: '성도',
    phoneNumber: '',
    landlineNumber: '',
    address: '',
    description: '',
    image: '',
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const compressed = await compressImage(file, 1200, 1200, 0.8);
      setFormData((prev) => ({
        ...prev,
        image: compressed,
      }));
    } catch (error) {
      alert('이미지 처리 중 오류가 발생했습니다.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: '',
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/businesses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('교우사업이 등록되었습니다.');
        router.push('/admin/businesses');
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
          <Link href="/admin/businesses" className="mb-2 text-sm text-blue-600 hover:underline">
            ← 교우사업 목록
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">새 교우사업 등록</h1>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-10">
        <form onSubmit={handleSubmit} className="rounded-lg bg-white p-6 shadow">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">사업체명 *</label>
              <input
                type="text"
                required
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="예: 행복한 식당"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">카테고리 *</label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as '음식업' | '개인사업' | '공의사업' })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              >
                <option value="음식업">음식업</option>
                <option value="개인사업">개인사업</option>
                <option value="공의사업">공의사업</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">사업주 이름 *</label>
              <input
                type="text"
                required
                value={formData.ownerName}
                onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="예: 홍길동"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">직분</label>
              <input
                type="text"
                value={formData.ownerTitle}
                onChange={(e) => setFormData({ ...formData, ownerTitle: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="예: 집사, 권사, 성도 등"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">휴대전화</label>
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="예: 010-1234-5678"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">유선전화</label>
              <input
                type="tel"
                value={formData.landlineNumber}
                onChange={(e) => setFormData({ ...formData, landlineNumber: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="예: 02-1234-5678"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">주소</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="사업장 주소를 입력하세요"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">설명</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="사업체에 대한 간단한 설명을 입력하세요"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">사업장 이미지</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mt-1 block w-full"
              />
            </div>

            {formData.image && (
              <div className="relative w-full max-w-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={formData.image} alt="사업장 이미지" className="h-48 w-full rounded object-cover" />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute right-2 top-2 rounded bg-red-600 px-2 py-1 text-xs text-white"
                >
                  삭제
                </button>
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
            <Link href="/admin/businesses" className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50">
              취소
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
