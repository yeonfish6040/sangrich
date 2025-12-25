import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Business from '@/models/Business';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const business = await Business.create(body);
    return NextResponse.json({ success: true, data: business });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
  }
}
