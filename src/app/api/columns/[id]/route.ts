import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Column from '@/models/Column';
import { requireAuthAPI } from '@/lib/auth';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const column = await Column.findById(id);
    if (!column) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: column });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // 인증 확인
    const authResult = await requireAuthAPI();
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    await dbConnect();
    const { id } = await params;
    const body = await request.json();

    // 기존 글 조회
    const existingColumn = await Column.findById(id);
    if (!existingColumn) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });

    // 권한 체크: admin은 모든 글 수정 가능, user는 자기가 쓴 글만 수정 가능
    if (authResult.role !== 'admin' && existingColumn.createdBy !== authResult.username) {
      return NextResponse.json(
        { success: false, error: '이 글을 수정할 권한이 없습니다.' },
        { status: 403 }
      );
    }

    const column = await Column.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ success: true, data: column });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // 인증 확인
    const authResult = await requireAuthAPI();
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    await dbConnect();
    const { id } = await params;

    // 기존 글 조회
    const existingColumn = await Column.findById(id);
    if (!existingColumn) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });

    // 권한 체크: admin은 모든 글 삭제 가능, user는 자기가 쓴 글만 삭제 가능
    if (authResult.role !== 'admin' && existingColumn.createdBy !== authResult.username) {
      return NextResponse.json(
        { success: false, error: '이 글을 삭제할 권한이 없습니다.' },
        { status: 403 }
      );
    }

    const column = await Column.findByIdAndDelete(id);
    return NextResponse.json({ success: true, data: column });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
  }
}
