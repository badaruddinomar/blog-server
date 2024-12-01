import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Author id is required'],
    },
    content: {
      type: String,
      required: [true, 'Comment content is required'],
    },
    post: {
      type: mongoose.Types.ObjectId,
      ref: 'Post',
      required: [true, 'Post id is required'],
    },
    likes: {
      type: Array,
      default: [],
    },
    numberOfLikes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);
const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
