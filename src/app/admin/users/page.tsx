'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface User {
  _id: string;
  username: string;
  displayName: string;
  role: 'admin' | 'user';
  permissions: string[];
  createdAt: string;
}

const BOARD_PERMISSIONS = {
  POSTS: 'posts',
  SERMONS: 'sermons',
  COLUMNS: 'columns',
  ALBUMS: 'albums',
  CHURCH_ALBUMS: 'church-albums',
  EVENTS: 'events',
  BUSINESSES: 'businesses',
  CHURCH_NEWS: 'church-news',
  FAITH_INFO: 'faith-info',
  NEWCOMERS: 'newcomers',
  ALBUM_EXTRA1: 'album-extra1',
  ALBUM_EXTRA2: 'album-extra2',
  BOARD_EXTRA1: 'board-extra1',
  BOARD_EXTRA2: 'board-extra2',
} as const;

const BOARD_LABELS: Record<string, string> = {
  [BOARD_PERMISSIONS.POSTS]: '주보모음',
  [BOARD_PERMISSIONS.SERMONS]: '주일설교 영상',
  [BOARD_PERMISSIONS.COLUMNS]: '담임목사님 칼럼',
  [BOARD_PERMISSIONS.ALBUMS]: '교회학교 앨범',
  [BOARD_PERMISSIONS.CHURCH_ALBUMS]: '교회앨범',
  [BOARD_PERMISSIONS.EVENTS]: '교회 일정',
  [BOARD_PERMISSIONS.BUSINESSES]: '교우사업터',
  [BOARD_PERMISSIONS.CHURCH_NEWS]: '교회 소식',
  [BOARD_PERMISSIONS.FAITH_INFO]: '신앙정보 공유 터',
  [BOARD_PERMISSIONS.NEWCOMERS]: '새신자 소개',
  [BOARD_PERMISSIONS.ALBUM_EXTRA1]: '앨범 게시판 1',
  [BOARD_PERMISSIONS.ALBUM_EXTRA2]: '앨범 게시판 2',
  [BOARD_PERMISSIONS.BOARD_EXTRA1]: '게시판 1',
  [BOARD_PERMISSIONS.BOARD_EXTRA2]: '게시판 2',
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    displayName: '',
    role: 'user' as 'admin' | 'user',
    permissions: [] as string[],
  });

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      if (data.success) {
        setUsers(data.data);
      }
    } catch (error) {
      console.error('사용자 목록 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenModal = (user?: User) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        username: user.username,
        password: '',
        displayName: user.displayName,
        role: user.role,
        permissions: user.permissions || [],
      });
    } else {
      setEditingUser(null);
      setFormData({
        username: '',
        password: '',
        displayName: '',
        role: 'user',
        permissions: [],
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingUser(null);
    setFormData({
      username: '',
      password: '',
      displayName: '',
      role: 'user',
      permissions: [],
    });
  };

  const handlePermissionToggle = (permission: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingUser) {
        // 수정
        const res = await fetch(`/api/admin/users/${editingUser._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (data.success) {
          alert('사용자가 수정되었습니다.');
          fetchUsers();
          handleCloseModal();
        } else {
          alert(data.error || '수정 실패');
        }
      } else {
        // 생성
        const res = await fetch('/api/admin/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (data.success) {
          alert('사용자가 추가되었습니다.');
          fetchUsers();
          handleCloseModal();
        } else {
          alert(data.error || '추가 실패');
        }
      }
    } catch (error) {
      console.error('사용자 저장 실패:', error);
      alert('서버 오류가 발생했습니다.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (data.success) {
        alert('사용자가 삭제되었습니다.');
        fetchUsers();
      } else {
        alert(data.error || '삭제 실패');
      }
    } catch (error) {
      console.error('사용자 삭제 실패:', error);
      alert('서버 오류가 발생했습니다.');
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-gray-600">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link
                href="/admin"
                className="mb-2 text-sm text-blue-600 hover:underline"
              >
                ← 관리자 대시보드
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">사용자 관리</h1>
            </div>
            <button
              onClick={() => handleOpenModal()}
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              + 새 사용자 추가
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  아이디
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  이름
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  권한
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  가입일
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  관리
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {user.username}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {user.displayName}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-semibold ${
                        user.role === 'admin'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {user.role === 'admin' ? '관리자' : '사용자'}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString('ko-KR')}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <button
                      onClick={() => handleOpenModal(user)}
                      className="mr-2 text-blue-600 hover:text-blue-900"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && (
            <div className="py-10 text-center text-gray-500">
              등록된 사용자가 없습니다.
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <h2 className="mb-4 text-xl font-bold">
              {editingUser ? '사용자 수정' : '새 사용자 추가'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  아이디
                </label>
                <input
                  type="text"
                  required
                  disabled={!!editingUser}
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  비밀번호 {editingUser && '(변경하지 않으려면 비워두세요)'}
                </label>
                <input
                  type="password"
                  required={!editingUser}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  이름
                </label>
                <input
                  type="text"
                  required
                  value={formData.displayName}
                  onChange={(e) =>
                    setFormData({ ...formData, displayName: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  권한
                </label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      role: e.target.value as 'admin' | 'user',
                    })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="user">사용자</option>
                  <option value="admin">관리자</option>
                </select>
              </div>

              {formData.role === 'user' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    게시판 권한 (사용자만 해당)
                  </label>
                  <div className="max-h-60 overflow-y-auto border border-gray-300 rounded-md p-3 space-y-2">
                    {Object.entries(BOARD_LABELS).map(([key, label]) => (
                      <label key={key} className="flex items-center space-x-2 hover:bg-gray-50 p-1 rounded cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.permissions.includes(key)}
                          onChange={() => handlePermissionToggle(key)}
                          className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{label}</span>
                      </label>
                    ))}
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    관리자는 모든 게시판에 접근 가능합니다
                  </p>
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="rounded bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  {editingUser ? '수정' : '추가'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
