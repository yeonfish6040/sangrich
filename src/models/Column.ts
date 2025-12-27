import mongoose, { Schema, model, models } from 'mongoose';

export interface IColumn {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdBy: string; // 작성자 username (권한 체크용)
  viewCount: number;
  recommendCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const ColumnSchema = new Schema<IColumn>(
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
    recommendCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Column = models.Column || model<IColumn>('Column', ColumnSchema);

export default Column;
