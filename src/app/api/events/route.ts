import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Event from '@/models/Event';
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
    const event = await Event.create(body);
    return NextResponse.json({ success: true, data: event });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
  }
}
