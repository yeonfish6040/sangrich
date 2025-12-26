import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /admin 경로 보호 (로그인 페이지와 API 제외)
  if (pathname.startsWith('/admin') &&
      pathname !== '/admin/login' &&
      !pathname.startsWith('/api/admin')) {

    const sessionCookie = request.cookies.get('admin_session');

    if (!sessionCookie) {
      // 세션 쿠키가 없으면 로그인 페이지로 리다이렉트
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
