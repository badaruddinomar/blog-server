import { ObjectId } from 'mongoose';
export interface IComment {
  author: ObjectId;
  content: string;
  post: string;
  likes: [];
  numberOfLikes: number;
}
