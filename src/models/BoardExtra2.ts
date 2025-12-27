import mongoose, { Schema, model, models } from 'mongoose';

export interface IBoardExtra2 {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdBy: string;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const BoardExtra2Schema = new Schema<IBoardExtra2>(
  {
    title: {
      type: String,
      required: [true, '제목을 입력해주세요.'],
    },
    content: {
      type: String,
      required: [true, '내용을 입력해주세요.'],
    },
    author: {
      type: String,
      default: '관리자',
    },
    createdBy: {
      type: String,
      required: true,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const BoardExtra2 = models.BoardExtra2 || model<IBoardExtra2>('BoardExtra2', BoardExtra2Schema);

export default BoardExtra2;
