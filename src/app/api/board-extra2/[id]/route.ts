import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import BoardExtra2 from '@/models/BoardExtra2';
import { requireAuthAPI } from '@/lib/auth';
import { hasPermission, BOARD_PERMISSIONS } from '@/lib/permissions';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const board = await BoardExtra2.findById(id);
    if (!board) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: board });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authResult = await requireAuthAPI();
  if (authResult instanceof NextResponse) return authResult;
  if (!hasPermission(authResult.role, authResult.permissions, BOARD_PERMISSIONS.BOARD_EXTRA2)) {
    return NextResponse.json({ success: false, error: '이 게시판에 접근 권한이 없습니다.' }, { status: 403 });
  }

  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    const existingBoard = await BoardExtra2.findById(id);
    if (!existingBoard) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    if (authResult.role !== 'admin' && existingBoard.createdBy !== authResult.username) {
      return NextResponse.json({ success: false, error: '이 글을 수정할 권한이 없습니다.' }, { status: 403 });
    }
    const board = await BoardExtra2.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ success: true, data: board });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authResult = await requireAuthAPI();
  if (authResult instanceof NextResponse) return authResult;
  if (!hasPermission(authResult.role, authResult.permissions, BOARD_PERMISSIONS.BOARD_EXTRA2)) {
    return NextResponse.json({ success: false, error: '이 게시판에 접근 권한이 없습니다.' }, { status: 403 });
  }

  try {
    await dbConnect();
    const { id } = await params;
    const existingBoard = await BoardExtra2.findById(id);
    if (!existingBoard) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    if (authResult.role !== 'admin' && existingBoard.createdBy !== authResult.username) {
      return NextResponse.json({ success: false, error: '이 글을 삭제할 권한이 없습니다.' }, { status: 403 });
    }
    const board = await BoardExtra2.findByIdAndDelete(id);
    return NextResponse.json({ success: true, data: board });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
  }
}
