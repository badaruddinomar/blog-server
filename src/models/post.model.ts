import mongoose from 'mongoose';
import { IPost } from '../interface/post.interface';

const postSchema = new mongoose.Schema<IPost>(
  {
    author: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'User id is required'],
    },
    content: {
      type: String,
      required: [true, 'Post content is required'],
    },
    title: {
      type: String,
      required: [true, 'Post title is required'],
      unique: true,
    },
    banner: {
      url: {
        type: String,
        required: [true, 'Banner url is required'],
      },
      public_id: {
        type: String,
        required: [true, 'Banner public id is required'],
      },
    },
    category: {
      type: String,
      default: 'uncategorized',
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
    },
  },
  { timestamps: true },
);

const Post = mongoose.model('Post', postSchema);
export default Post;
