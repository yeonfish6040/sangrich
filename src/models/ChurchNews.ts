import mongoose, { Schema, model, models } from 'mongoose';

export interface IChurchNews {
  _id: string;
  title: string;
  content: string;
  author: string;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const ChurchNewsSchema = new Schema<IChurchNews>(
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
    viewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const ChurchNews = models.ChurchNews || model<IChurchNews>('ChurchNews', ChurchNewsSchema);

export default ChurchNews;
