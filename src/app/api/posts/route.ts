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
    const post = await Post.create(body);
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
