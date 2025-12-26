import mongoose, { Schema, model, models } from 'mongoose';

export interface IComment {
  _id: string;
  postType: 'Post' | 'Sermon' | 'Column' | 'Album' | 'ChurchAlbum' | 'FaithInfo' | 'ChurchNews' | 'NewComer';
  postId: string;
  author: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    postType: {
      type: String,
      required: [true, '게시물 타입을 지정해주세요.'],
      enum: ['Post', 'Sermon', 'Column', 'Album', 'ChurchAlbum', 'FaithInfo', 'ChurchNews', 'NewComer'],
    },
    postId: {
      type: String,
      required: [true, '게시물 ID를 지정해주세요.'],
    },
    author: {
      type: String,
      required: [true, '작성자를 입력해주세요.'],
    },
    content: {
      type: String,
      required: [true, '댓글 내용을 입력해주세요.'],
    },
  },
  {
    timestamps: true,
  }
);

// 특정 게시물의 댓글을 빠르게 조회하기 위한 인덱스
CommentSchema.index({ postType: 1, postId: 1, createdAt: -1 });

const Comment = models.Comment || model<IComment>('Comment', CommentSchema);

export default Comment;
