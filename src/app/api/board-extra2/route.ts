import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import BoardExtra2 from '@/models/BoardExtra2';
import { requireAuthAPI } from '@/lib/auth';
import { hasPermission, BOARD_PERMISSIONS } from '@/lib/permissions';

export async function POST(request: NextRequest) {
  const authResult = await requireAuthAPI();
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  if (!hasPermission(authResult.role, authResult.permissions, BOARD_PERMISSIONS.BOARD_EXTRA2)) {
    return NextResponse.json(
      { success: false, error: '이 게시판에 접근 권한이 없습니다.' },
      { status: 403 }
    );
  }

  try {
    await dbConnect();
    const body = await request.json();
    const boardData = {
      ...body,
      author: authResult.displayName || '관리자',
      createdBy: authResult.username || 'admin',
    };
    const board = await BoardExtra2.create(boardData);
    return NextResponse.json({ success: true, data: board });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const boards = await BoardExtra2.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: boards });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
  }
}
