import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';

export async function POST() {
  try {
    // 서버 세션 삭제
    const session = await getSession();
    session.destroy();

    return NextResponse.json({ success: true, message: '로그아웃 성공' });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, error: '로그아웃 실패' },
      { status: 500 }
    );
  }
}
