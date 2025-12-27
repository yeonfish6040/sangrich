import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import AlbumExtra1 from '@/models/AlbumExtra1';
import { requireAuthAPI } from '@/lib/auth';
import { hasPermission, BOARD_PERMISSIONS } from '@/lib/permissions';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const album = await AlbumExtra1.findById(id);
    if (!album) {
      return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: album });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAuthAPI();
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  // 권한 체크
  if (!hasPermission(authResult.role, authResult.permissions, BOARD_PERMISSIONS.ALBUM_EXTRA1)) {
    return NextResponse.json(
      { success: false, error: '이 게시판에 접근 권한이 없습니다.' },
      { status: 403 }
    );
  }

  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();

    const existingAlbum = await AlbumExtra1.findById(id);
    if (!existingAlbum) {
      return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    }

    // admin은 모든 글 수정 가능, user는 자기가 쓴 글만
    if (authResult.role !== 'admin' && existingAlbum.createdBy !== authResult.username) {
      return NextResponse.json(
        { success: false, error: '이 글을 수정할 권한이 없습니다.' },
        { status: 403 }
      );
    }

    const album = await AlbumExtra1.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ success: true, data: album });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAuthAPI();
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  // 권한 체크
  if (!hasPermission(authResult.role, authResult.permissions, BOARD_PERMISSIONS.ALBUM_EXTRA1)) {
    return NextResponse.json(
      { success: false, error: '이 게시판에 접근 권한이 없습니다.' },
      { status: 403 }
    );
  }

  try {
    await dbConnect();
    const { id } = await params;

    const existingAlbum = await AlbumExtra1.findById(id);
    if (!existingAlbum) {
      return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    }

    // admin은 모든 글 삭제 가능, user는 자기가 쓴 글만
    if (authResult.role !== 'admin' && existingAlbum.createdBy !== authResult.username) {
      return NextResponse.json(
        { success: false, error: '이 글을 삭제할 권한이 없습니다.' },
        { status: 403 }
      );
    }

    const album = await AlbumExtra1.findByIdAndDelete(id);
    return NextResponse.json({ success: true, data: album });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
  }
}
