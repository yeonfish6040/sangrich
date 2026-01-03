import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function POST() {
  const session = await getSession();

  if (!session.isLoggedIn || !session.username) {
    return NextResponse.json({ success: false, error: 'Not logged in' }, { status: 401 });
  }

  try {
    await dbConnect();
    const user = await User.findOne({ username: session.username });

    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    // 세션 업데이트
    session.displayName = user.displayName;
    session.role = user.role;
    session.permissions = user.permissions || [];
    await session.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
