import { Request, Response, NextFunction } from 'express';
import catchAsync from '../utils/catchAsyn';
import AppError from '../utils/AppError';
import Comment from '../models/comment.model';

export const createComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { author, content, post } = req.body;

    if (author !== req.user._id.toString()) {
      return next(
        new AppError(403, 'You are not allowed to create this comment'),
      );
    }
    const newComment = new Comment({
      content,
      post,
      author,
    });
    await newComment.save();
    res.status(201).json({
      success: true,
      data: newComment,
      message: 'comment created successfully',
    });
  },
);

export const getPostComments = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.query;

    if (!postId) {
      return next(new AppError(400, 'Post id is required'));
    }
    const comments = await Comment.find({ post: postId }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      success: true,
      message: 'Comments retrieved successfully',
      data: comments,
    });
  },
);

export const likeUnlikeComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { commentId } = req.query;
    if (!commentId) {
      return next(new AppError(400, 'Comment id is required'));
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return next(new AppError(404, 'Comment not found'));
    }

    if (comment.likes.includes(req.user._id)) {
      comment.likes = comment.likes.filter(
        (like) => like.toString() !== req.user._id.toString(),
      );
      comment.numberOfLikes -= 1;
    } else {
      comment.likes.push(req.user._id);
      comment.numberOfLikes += 1;
    }

    await comment.save();

    res.status(200).json({
      success: true,
      message: 'Comment liked/unliked successfully',
      data: comment,
    });
  },
);

export const editComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id) {
      return next(new AppError(400, 'Comment id is required'));
    }
    const comment = await Comment.findById(id);
    if (!comment) {
      return next(new AppError(404, 'Comment not found'));
    }

    let editedComment;
    if (
      comment.author.toString() === req.user._id.toString() ||
      req.user.role === 'admin'
    ) {
      editedComment = await Comment.findByIdAndUpdate(
        id,
        {
          content: req.body.content,
        },
        {
          new: true,
        },
      );
    } else {
      return next(
        new AppError(403, 'You are not allowed to edit this comment'),
      );
    }

    res.status(200).json({
      success: true,
      message: 'Comment edited successfully',
      data: editedComment,
    });
  },
);
