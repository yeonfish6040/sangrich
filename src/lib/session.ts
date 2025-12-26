import { getIronSession, SessionOptions } from 'iron-session';
import { cookies } from 'next/headers';

export interface SessionData {
  isLoggedIn: boolean;
  username?: string;
}

// 세션 옵션 설정
export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET || 'complex_password_at_least_32_characters_long_for_security',
  cookieName: 'admin_session',
  cookieOptions: {
    // HTTPS를 사용하는 경우에만 secure: true 설정
    // Docker HTTP 환경에서는 COOKIE_SECURE=false로 설정
    secure: process.env.COOKIE_SECURE === 'true',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24시간
    path: '/',
  },
};

// 세션 가져오기
export async function getSession() {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}

// 기본 세션 데이터
export const defaultSession: SessionData = {
  isLoggedIn: false,
};
