import { ObjectId } from 'mongoose';
export interface IPost {
  author: ObjectId;
  content: string;
  title: string;
  banner: {
    url: string;
    public_id: string;
  };
  category: string;
  slug: string;
}
type QueryCondition = {
  $regex: string;
  $options: string;
};
export interface IPostQuery {
  $or?: Array<{
    title?: QueryCondition;
    content?: QueryCondition;
  }>;
}
