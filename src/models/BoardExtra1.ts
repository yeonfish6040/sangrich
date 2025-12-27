import mongoose, { Schema, model, models } from 'mongoose';

export interface IBoardExtra1 {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdBy: string;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const BoardExtra1Schema = new Schema<IBoardExtra1>(
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

const BoardExtra1 = models.BoardExtra1 || model<IBoardExtra1>('BoardExtra1', BoardExtra1Schema);

export default BoardExtra1;
