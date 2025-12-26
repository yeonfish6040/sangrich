import mongoose, { Schema, model, models } from 'mongoose';

export interface IBusiness {
  _id: string;
  businessName: string;
  category: '음식업' | '개인사업' | '공의사업';
  ownerName: string;
  ownerTitle: string; // 집사, 권사, 성도, 목사 등
  phoneNumber: string;
  landlineNumber?: string;
  image?: string; // Base64 encoded image
  address?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BusinessSchema = new Schema<IBusiness>(
  {
    businessName: {
      type: String,
      required: [true, '사업체명을 입력해주세요.'],
    },
    category: {
      type: String,
      required: [true, '카테고리를 선택해주세요.'],
      enum: ['음식업', '개인사업', '공의사업'],
    },
    ownerName: {
      type: String,
      required: [true, '이름을 입력해주세요.'],
    },
    ownerTitle: {
      type: String,
      default: '성도',
    },
    phoneNumber: {
      type: String,
      default: '',
    },
    landlineNumber: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    address: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Business = models.Business || model<IBusiness>('Business', BusinessSchema);

export default Business;
