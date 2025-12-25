import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Column from '@/models/Column';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const column = await Column.create(body);
    return NextResponse.json({ success: true, data: column });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
  }
}
