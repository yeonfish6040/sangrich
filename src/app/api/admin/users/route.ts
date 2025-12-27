import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { requireAdminAPI } from '@/lib/auth';
import bcrypt from 'bcryptjs';

// 전체 사용자 조회 (admin만 가능)
export async function GET() {
  const authResult = await requireAdminAPI();
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  try {
    await dbConnect();
    // 비밀번호 제외하고 조회
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
  }
}

// 새 사용자 생성 (admin만 가능)
export async function POST(request: NextRequest) {
  const authResult = await requireAdminAPI();
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  try {
    await dbConnect();
    const body = await request.json();
    const { username, password, displayName, role, permissions } = body;

    // 중복 체크
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: '이미 존재하는 아이디입니다.' },
        { status: 400 }
      );
    }

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashedPassword,
      displayName,
      role: role || 'user',
      permissions: permissions || [],
    });

    // 비밀번호 제외하고 반환
    const userResponse = user.toObject();
    delete userResponse.password;

    return NextResponse.json({ success: true, data: userResponse });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
  }
}
