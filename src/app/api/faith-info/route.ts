import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import FaithInfo from '@/models/FaithInfo';
import { requireAuthAPI } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '15');
    const search = searchParams.get('search') || '';

    const query = search ? { title: { $regex: search, $options: 'i' } } : {};
    const total = await FaithInfo.countDocuments(query);
    const faithInfos = await FaithInfo.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      data: faithInfos,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
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
    const faithInfo = await FaithInfo.create(body);
    return NextResponse.json({ success: true, data: faithInfo }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
  }
}
