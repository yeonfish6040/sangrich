import mongoose, { Schema, model, models } from 'mongoose';

export interface IUser {
  _id: string;
  username: string;
  password: string;
  displayName: string;
  role: 'admin' | 'user';
  permissions: string[]; // 관리 가능한 게시판 목록 (예: ['posts', 'columns', 'sermons'])
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, '아이디를 입력해주세요.'],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, '비밀번호를 입력해주세요.'],
    },
    displayName: {
      type: String,
      required: [true, '이름을 입력해주세요.'],
      trim: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    permissions: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model<IUser>('User', UserSchema);

export default User;
