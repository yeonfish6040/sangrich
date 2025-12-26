import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /admin 경로 보호 (로그인 페이지와 API 제외)
  if (pathname.startsWith('/admin') &&
      pathname !== '/admin/login' &&
      !pathname.startsWith('/api/admin')) {

    const sessionCookie = request.cookies.get('admin_session');

    // 쿠키가 없으면 로그인 페이지로 리다이렉트
    // 실제 세션 검증은 서버 컴포넌트에서 수행
    if (!sessionCookie) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
