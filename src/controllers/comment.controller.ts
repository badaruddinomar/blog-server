import { Request, Response, NextFunction } from 'express';
import catchAsync from '../utils/catchAsyn';
import AppError from '../utils/AppError';
import Comment from '../models/comment.model';

export const createComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { author, content, post } = req.body;
    console.log(author, req.user._id.toString());
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
