import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';
import { requireAuthAPI } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const post = await Post.findById(id);
    if (!post) {
      return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // 인증 확인
  const authResult = await requireAuthAPI();
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();

    // 기존 글 조회
    const existingPost = await Post.findById(id);
    if (!existingPost) {
      return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    }

    // 권한 체크: admin은 모든 글 수정 가능, user는 자기가 쓴 글만 수정 가능
    if (authResult.role !== 'admin' && existingPost.createdBy !== authResult.username) {
      return NextResponse.json(
        { success: false, error: '이 글을 수정할 권한이 없습니다.' },
        { status: 403 }
      );
    }

    const post = await Post.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // 인증 확인
  const authResult = await requireAuthAPI();
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  try {
    await dbConnect();
    const { id } = await params;

    // 기존 글 조회
    const existingPost = await Post.findById(id);
    if (!existingPost) {
      return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    }

    // 권한 체크: admin은 모든 글 삭제 가능, user는 자기가 쓴 글만 삭제 가능
    if (authResult.role !== 'admin' && existingPost.createdBy !== authResult.username) {
      return NextResponse.json(
        { success: false, error: '이 글을 삭제할 권한이 없습니다.' },
        { status: 403 }
      );
    }

    const post = await Post.findByIdAndDelete(id);
    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
  }
}
