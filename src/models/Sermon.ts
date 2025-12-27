import mongoose, { Schema, model, models } from 'mongoose';

export interface ISermon {
  _id: string;
  title: string;
  thumbnail: string; // Base64 encoded image (e.g., "data:image/jpeg;base64,...")
  scripture: string;
  preacher: string;
  createdBy: string; // 작성자 username (권한 체크용)
  videoUrl: string;
  viewCount: number;
  isFeatured: boolean;
  sermonDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const SermonSchema = new Schema<ISermon>(
  {
    title: {
      type: String,
      required: [true, '제목을 입력해주세요.'],
    },
    thumbnail: {
      type: String,
      default: '',
    },
    scripture: {
      type: String,
      required: [true, '본문을 입력해주세요.'],
    },
    preacher: {
      type: String,
      default: '박승열 목사',
    },
    createdBy: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      default: '',
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    sermonDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Sermon = models.Sermon || model<ISermon>('Sermon', SermonSchema);

export default Sermon;
