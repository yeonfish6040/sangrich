import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import FaithInfo from '@/models/FaithInfo';
import { requireAuthAPI } from '@/lib/auth';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const faithInfo = await FaithInfo.findById(id);
    if (!faithInfo) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });

    // 조회수 증가
    faithInfo.viewCount += 1;
    await faithInfo.save();

    return NextResponse.json({ success: true, data: faithInfo });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // 인증 확인
    const authResult = await requireAuthAPI();
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    const faithInfo = await FaithInfo.findByIdAndUpdate(id, body, { new: true });
    if (!faithInfo) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: faithInfo });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // 인증 확인
    const authResult = await requireAuthAPI();
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    await dbConnect();
    const { id } = await params;
    const faithInfo = await FaithInfo.findByIdAndDelete(id);
    if (!faithInfo) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: faithInfo });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
  }
}
