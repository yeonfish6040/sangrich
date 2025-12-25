'use client';

import { useState, useEffect } from 'react';

interface Comment {
  _id: string;
  author: string;
  content: string;
  createdAt: string;
}

interface CommentSectionProps {
  postType: 'Post' | 'Sermon' | 'Column' | 'Album' | 'ChurchAlbum' | 'FaithInfo' | 'ChurchNews' | 'NewComer';
  postId: string;
}

export default function CommentSection({ postType, postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ author: '', content: '' });
  const [submitting, setSubmitting] = useState(false);

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comments?postType=${postType}&postId=${postId}`);
      if (res.ok) {
        const data = await res.json();
        setComments(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postType, postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.author.trim() || !formData.content.trim()) {
      alert('이름과 댓글 내용을 모두 입력해주세요.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postType,
          postId,
          author: formData.author,
          content: formData.content,
        }),
      });

      if (res.ok) {
        setFormData({ author: '', content: '' });
        fetchComments();
      } else {
        alert('댓글 작성에 실패했습니다.');
      }
    } catch (error) {
      alert('오류가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm('댓글을 삭제하시겠습니까?')) return;

    try {
      const res = await fetch(`/api/comments/${commentId}`, { method: 'DELETE' });
      if (res.ok) {
        fetchComments();
      } else {
        alert('삭제에 실패했습니다.');
      }
    } catch (error) {
      alert('오류가 발생했습니다.');
    }
  };

  return (
    <div className="mt-10">
      <h2 className="mb-4 text-xl font-bold text-gray-900">댓글 {comments.length}개</h2>

      <form onSubmit={handleSubmit} className="mb-8 rounded-lg bg-white p-6 shadow">
        <div className="mb-4">
          <input
            type="text"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            placeholder="이름"
            className="block w-full rounded-md border border-gray-300 px-3 py-2"
            maxLength={20}
          />
        </div>
        <div className="mb-4">
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="댓글을 입력하세요"
            rows={3}
            className="block w-full rounded-md border border-gray-300 px-3 py-2"
            maxLength={500}
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {submitting ? '등록 중...' : '댓글 등록'}
        </button>
      </form>

      <div className="space-y-4">
        {loading ? (
          <div className="py-8 text-center text-gray-500">댓글을 불러오는 중...</div>
        ) : comments.length === 0 ? (
          <div className="py-8 text-center text-gray-500">첫 댓글을 작성해보세요!</div>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="rounded-lg bg-white p-4 shadow">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-3 text-sm">
                  <span className="font-medium text-gray-900">{comment.author}</span>
                  <span className="text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <button
                  onClick={() => handleDelete(comment._id)}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  삭제
                </button>
              </div>
              <p className="whitespace-pre-wrap text-gray-700">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
