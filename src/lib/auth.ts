import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { getSession } from './session';

/**
 * 서버 컴포넌트에서 관리자 인증 확인
 * 로그인되지 않은 경우 로그인 페이지로 리다이렉트
 */
export async function requireAuth() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    redirect('/admin/login?clear=true');
  }
  return session;
}

/**
 * 서버 컴포넌트에서 admin 권한 확인
 * admin이 아닌 경우 접근 거부 페이지로 리다이렉트
 */
export async function requireAdmin() {
  const session = await requireAuth();
  if (session.role !== 'admin') {
    redirect('/admin?error=forbidden');
  }
  return session;
}

/**
 * 서버 컴포넌트에서 로그인 상태 확인 (리다이렉트 없이)
 */
export async function checkAuth() {
  const session = await getSession();
  return session.isLoggedIn;
}

/**
 * API Route에서 관리자 인증 확인
 * 로그인되지 않은 경우 401 응답 반환
 * @returns session (로그인된 경우) 또는 NextResponse (로그인 안된 경우)
 */
export async function requireAuthAPI() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json(
      { success: false, error: '인증이 필요합니다.' },
      { status: 401 }
    );
  }
  return session;
}

/**
 * API Route에서 admin 권한 확인
 * admin이 아닌 경우 403 응답 반환
 * @returns session (admin인 경우) 또는 NextResponse (권한 없는 경우)
 */
export async function requireAdminAPI() {
  const authResult = await requireAuthAPI();
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  if (authResult.role !== 'admin') {
    return NextResponse.json(
      { success: false, error: '관리자 권한이 필요합니다.' },
      { status: 403 }
    );
  }

  return authResult;
}
