import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Sermon from '@/models/Sermon';
import { requireAuthAPI } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // 인증 확인
    const authResult = await requireAuthAPI();
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    await dbConnect();
    const body = await request.json();

    // Sermon은 기존 preacher 필드 사용 (author 대신)
    // body에 preacher가 없으면 세션의 displayName 사용
    const sermonData = {
      ...body,
      preacher: body.preacher || authResult.displayName || '박승열 목사',
      createdBy: authResult.username || 'admin',
    };

    const sermon = await Sermon.create(sermonData);
    return NextResponse.json({ success: true, data: sermon });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const sermons = await Sermon.find().sort({ sermonDate: -1 });
    return NextResponse.json({ success: true, data: sermons });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
  }
}
