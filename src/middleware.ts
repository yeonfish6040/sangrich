import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // pathname을 헤더에 추가 (서버 컴포넌트에서 사용)
  const response = NextResponse.next();
  response.headers.set('x-pathname', pathname);

  // /admin 경로 보호 (로그인 페이지와 API 제외)
  // 로그인 페이지는 쿼리 파라미터와 상관없이 항상 접근 허용
  if (pathname.startsWith('/admin') &&
      !pathname.startsWith('/admin/login') &&
      !pathname.startsWith('/api/admin')) {

    const sessionCookie = request.cookies.get('admin_session');

    // 쿠키가 없으면 로그인 페이지로 리다이렉트
    if (!sessionCookie) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  matcher: '/admin/:path*',
};
