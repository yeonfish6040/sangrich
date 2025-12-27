import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { requireAdminAPI } from '@/lib/auth';
import bcrypt from 'bcryptjs';

// 특정 사용자 조회 (admin만 가능)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAdminAPI();
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  try {
    await dbConnect();
    const { id } = await params;
    const user = await User.findById(id).select('-password');

    if (!user) {
      return NextResponse.json(
        { success: false, error: '사용자를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
  }
}

// 사용자 정보 수정 (admin만 가능)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAdminAPI();
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    const { username, password, displayName, role, permissions } = body;

    const updateData: any = {};
    if (username) updateData.username = username;
    if (displayName) updateData.displayName = displayName;
    if (role) updateData.role = role;
    if (permissions !== undefined) updateData.permissions = permissions;

    // 비밀번호가 제공된 경우에만 해시화하여 업데이트
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return NextResponse.json(
        { success: false, error: '사용자를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: user,
      // 본인 계정을 수정한 경우 알림
      needsReload: authResult.username === user.username
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
  }
}

// 사용자 삭제 (admin만 가능)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAdminAPI();
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  try {
    await dbConnect();
    const { id } = await params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return NextResponse.json(
        { success: false, error: '사용자를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: '사용자가 삭제되었습니다.' });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
  }
}
