import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ChurchAlbum from '@/models/ChurchAlbum';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const album = await ChurchAlbum.create(body);
    return NextResponse.json({ success: true, data: album });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
  }
}
