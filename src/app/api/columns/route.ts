import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Column from '@/models/Column';
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
    const column = await Column.create(body);
    return NextResponse.json({ success: true, data: column });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
  }
}
