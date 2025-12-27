import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';
import { requireAuthAPI } from '@/lib/auth';

export async function POST(request: NextRequest) {
  // 인증 확인
  const authResult = await requireAuthAPI();
  if (authResult instanceof NextResponse) {
    return authResult; // 401 응답
  }

  try {
    await dbConnect();
    const body = await request.json();

    // 세션에서 사용자 정보 가져오기
    const session = authResult;

    // 작성자 정보 설정
    const postData = {
      ...body,
      author: session.displayName || '관리자',
      createdBy: session.username || 'admin',
    };

    const post = await Post.create(postData);
    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const posts = await Post.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: posts });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
  }
}
