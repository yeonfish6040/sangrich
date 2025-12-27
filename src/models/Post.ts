import mongoose, { Schema, model, models } from 'mongoose';

export interface IPost {
  _id: string;
  title: string;
  author: string;
  createdBy: string; // 작성자 username (권한 체크용)
  images: string[]; // Array of base64 encoded images (e.g., "data:image/jpeg;base64,...")
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: [true, '제목을 입력해주세요.'],
    },
    author: {
      type: String,
      default: '관리자',
    },
    createdBy: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
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

const Post = models.Post || model<IPost>('Post', PostSchema);

export default Post;
