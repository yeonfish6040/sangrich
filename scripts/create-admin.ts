/**
 * 초기 관리자 계정 생성 스크립트
 *
 * 사용법:
 * npx tsx scripts/create-admin.ts
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import * as readline from 'readline';

// User 스키마 정의
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  displayName: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function createAdmin() {
  try {
    // MongoDB 연결
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI 환경변수를 설정해주세요.');
    }

    console.log('MongoDB에 연결 중...');
    await mongoose.connect(MONGODB_URI);
    console.log('연결 성공!\n');

    // 사용자 입력 받기
    const username = await question('관리자 아이디: ');
    const password = await question('비밀번호: ');
    const displayName = await question('이름: ');

    if (!username || !password || !displayName) {
      console.error('모든 필드를 입력해주세요.');
      process.exit(1);
    }

    // 중복 체크
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.error(`\n오류: "${username}" 아이디가 이미 존재합니다.`);
      process.exit(1);
    }

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 생성
    const user = await User.create({
      username,
      password: hashedPassword,
      displayName,
      role: 'admin',
    });

    console.log(`\n✅ 관리자 계정이 생성되었습니다!`);
    console.log(`아이디: ${user.username}`);
    console.log(`이름: ${user.displayName}`);
    console.log(`권한: ${user.role}`);

  } catch (error) {
    console.error('\n❌ 오류 발생:', error);
    process.exit(1);
  } finally {
    rl.close();
    await mongoose.disconnect();
    process.exit(0);
  }
}

createAdmin();
