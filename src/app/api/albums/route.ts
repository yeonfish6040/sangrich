import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Album from '@/models/Album';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const album = await Album.create(body);
    return NextResponse.json({ success: true, data: album });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
  }
}
