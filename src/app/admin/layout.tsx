import { requireAuth } from '@/lib/auth';
import { headers } from 'next/headers';

// 모든 어드민 페이지 동적 렌더링 강제
export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 로그인 페이지는 인증 건너뛰기
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';

  if (!pathname.startsWith('/admin/login')) {
    await requireAuth();
  }

  return <>{children}</>;
}
