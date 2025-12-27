import mongoose, { Schema, model, models } from 'mongoose';

export interface IAlbumExtra1 {
  _id: string;
  title: string;
  images: string[];
  createdBy: string;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const AlbumExtra1Schema = new Schema<IAlbumExtra1>(
  {
    title: {
      type: String,
      required: [true, '제목을 입력해주세요.'],
    },
    images: {
      type: [String],
      default: [],
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

const AlbumExtra1 = models.AlbumExtra1 || model<IAlbumExtra1>('AlbumExtra1', AlbumExtra1Schema);

export default AlbumExtra1;
