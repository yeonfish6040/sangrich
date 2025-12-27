import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import AlbumExtra2 from '@/models/AlbumExtra2';
import { requireAuthAPI } from '@/lib/auth';
import { hasPermission, BOARD_PERMISSIONS } from '@/lib/permissions';

export async function POST(request: NextRequest) {
  const authResult = await requireAuthAPI();
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  if (!hasPermission(authResult.role, authResult.permissions, BOARD_PERMISSIONS.ALBUM_EXTRA2)) {
    return NextResponse.json(
      { success: false, error: '이 게시판에 접근 권한이 없습니다.' },
      { status: 403 }
    );
  }

  try {
    await dbConnect();
    const body = await request.json();
    const albumData = { ...body, createdBy: authResult.username || 'admin' };
    const album = await AlbumExtra2.create(albumData);
    return NextResponse.json({ success: true, data: album });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const albums = await AlbumExtra2.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: albums });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
  }
}
