import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Column from '@/models/Column';
import { requireAuthAPI } from '@/lib/auth';

export async function GET() {
  try {
    await dbConnect();
    const columns = await Column.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: columns });
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

    // 세션에서 사용자 정보 가져오기
    const session = authResult;

    // 작성자 정보 설정
    const columnData = {
      ...body,
      author: session.displayName || '관리자',
      createdBy: session.username || 'admin',
    };

    const column = await Column.create(columnData);
    return NextResponse.json({ success: true, data: column });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
  }
}
