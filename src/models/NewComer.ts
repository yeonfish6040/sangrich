import mongoose, { Schema, model, models } from 'mongoose';

export interface INewComer {
  _id: string;
  name: string;
  images: string[]; // Array of base64 encoded images
  introduction: string;
  author: string;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const NewComerSchema = new Schema<INewComer>(
  {
    name: {
      type: String,
      required: [true, '새신자 이름을 입력해주세요.'],
    },
    images: {
      type: [String],
      default: [],
    },
    introduction: {
      type: String,
      default: '',
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

const NewComer = models.NewComer || model<INewComer>('NewComer', NewComerSchema);

export default NewComer;
