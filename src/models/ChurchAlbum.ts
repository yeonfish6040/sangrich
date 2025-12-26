import mongoose, { Schema, model, models } from 'mongoose';

export interface IChurchAlbum {
  _id: string;
  title: string;
  author: string;
  images: string[]; // Array of base64 encoded images
  thumbnail: string; // First image or custom thumbnail (base64)
  viewCount: number;
  recommendCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const ChurchAlbumSchema = new Schema<IChurchAlbum>(
  {
    title: {
      type: String,
      required: [true, '제목을 입력해주세요.'],
    },
    author: {
      type: String,
      default: '관리자',
    },
    images: {
      type: [String],
      default: [],
    },
    thumbnail: {
      type: String,
      default: '',
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

const ChurchAlbum = models.ChurchAlbum || model<IChurchAlbum>('ChurchAlbum', ChurchAlbumSchema);

export default ChurchAlbum;
