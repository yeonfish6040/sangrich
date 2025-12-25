import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Sermon from '@/models/Sermon';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const sermon = await Sermon.create(body);
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
