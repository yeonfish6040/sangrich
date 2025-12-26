import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';

// 환경변수에서 관리자 계정 정보 가져오기
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // 관리자 인증
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // 서버 세션에 로그인 정보 저장
      const session = await getSession();
      session.isLoggedIn = true;
      session.username = username;
      await session.save();

      return NextResponse.json({ success: true, message: '로그인 성공' });
    } else {
      return NextResponse.json(
        { success: false, error: '아이디 또는 비밀번호가 올바르지 않습니다.' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
