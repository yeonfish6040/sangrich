import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Comment from '@/models/Comment';
import { requireAuthAPI } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const searchParams = request.nextUrl.searchParams;
    const postType = searchParams.get('postType');
    const postId = searchParams.get('postId');

    if (!postType || !postId) {
      return NextResponse.json(
        { success: false, error: 'postType and postId are required' },
        { status: 400 }
      );
    }

    const comments = await Comment.find({ postType, postId }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: comments });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // 인증 확인
    const authResult = await requireAuthAPI();
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    await dbConnect();
    const body = await request.json();
    const comment = await Comment.create(body);
    return NextResponse.json({ success: true, data: comment }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
  }
}
