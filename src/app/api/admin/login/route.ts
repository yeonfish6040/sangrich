import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

// 환경변수에서 기본 관리자 계정 정보 가져오기
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const ADMIN_DISPLAYNAME = process.env.ADMIN_DISPLAYNAME || '관리자';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // 1. 먼저 환경변수 기본 관리자 계정 확인
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const session = await getSession();
      session.isLoggedIn = true;
      session.username = ADMIN_USERNAME;
      session.displayName = ADMIN_DISPLAYNAME;
      session.role = 'admin';
      session.permissions = []; // admin은 모든 권한
      await session.save();

      return NextResponse.json({
        success: true,
        message: '로그인 성공',
        user: {
          username: ADMIN_USERNAME,
          displayName: ADMIN_DISPLAYNAME,
          role: 'admin',
          permissions: [],
        }
      });
    }

    // 2. 환경변수 인증 실패 시 데이터베이스 사용자 확인
    await dbConnect();
    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json(
        { success: false, error: '아이디 또는 비밀번호가 올바르지 않습니다.' },
        { status: 401 }
      );
    }

    // 비밀번호 확인
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: '아이디 또는 비밀번호가 올바르지 않습니다.' },
        { status: 401 }
      );
    }

    // 서버 세션에 로그인 정보 저장
    const session = await getSession();
    session.isLoggedIn = true;
    session.username = user.username;
    session.displayName = user.displayName;
    session.role = user.role;
    session.permissions = user.permissions || [];
    await session.save();

    return NextResponse.json({
      success: true,
      message: '로그인 성공',
      user: {
        username: user.username,
        displayName: user.displayName,
        role: user.role,
        permissions: user.permissions,
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
