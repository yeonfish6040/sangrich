import mongoose, { Schema, model, models } from 'mongoose';

export interface IEvent {
  _id: string;
  title: string;
  date: Date;
  description?: string;
  color?: string; // Optional color for highlighting (e.g., 'red', 'blue', '#FF0000')
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, '일정 제목을 입력해주세요.'],
    },
    date: {
      type: Date,
      required: [true, '일정 날짜를 입력해주세요.'],
    },
    description: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Event = models.Event || model<IEvent>('Event', EventSchema);

export default Event;
