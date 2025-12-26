import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData } from '@/lib/session';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /admin 경로 보호 (로그인 페이지와 API 제외)
  if (pathname.startsWith('/admin') &&
      pathname !== '/admin/login' &&
      !pathname.startsWith('/api/admin')) {

    try {
      const response = NextResponse.next();
      const session = await getIronSession<SessionData>(
        // eslint-disable-next-line
        // @ts-ignore
        request.cookies,
        response.cookies,
        sessionOptions
      );

      // 실제 세션 데이터 검증
      if (!session.isLoggedIn) {
        const loginUrl = new URL('/admin/login', request.url);
        return NextResponse.redirect(loginUrl);
      }

      return response;
    } catch (error) {
      // 세션 파싱 실패 시에도 리다이렉트
      console.error('Session validation error:', error);
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
