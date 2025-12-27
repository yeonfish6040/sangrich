import mongoose, { Schema, model, models } from 'mongoose';

export interface IAlbumExtra2 {
  _id: string;
  title: string;
  images: string[];
  createdBy: string;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const AlbumExtra2Schema = new Schema<IAlbumExtra2>(
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

const AlbumExtra2 = models.AlbumExtra2 || model<IAlbumExtra2>('AlbumExtra2', AlbumExtra2Schema);

export default AlbumExtra2;
