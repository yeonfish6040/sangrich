import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';

/**
 * 세션 쿠키 정리 API
 * 로그인 페이지에서 유효하지 않은 쿠키를 제거하기 위해 사용
 */
export async function POST() {
  try {
    const session = await getSession();
    session.destroy();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Clear session error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
