import { Request, Response, NextFunction } from 'express';
import catchAsync from '../utils/catchAsyn';
import httpStatus from 'http-status';
import Post from '../models/post.model';
import { uploadSingleImage } from '../utils/cloudinaryImageUpload';
import { UploadedFile } from 'express-fileupload';
import { generateSlug } from '../utils/generateSlug';
import AppError from '../utils/AppError';

export const createPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, content, category } = req.body;

    if (!req.files?.banner) {
      throw next(new AppError(httpStatus.BAD_REQUEST, 'Banner is required'));
    }
    // upload image--
    let banner;
    if (req.files?.banner) {
      banner = await uploadSingleImage(
        req.files?.banner as UploadedFile,
        'banners',
      );
    }

    const slug = generateSlug(title);
    const post = await Post.create({
      author: req.user._id,
      title,
      content,
      category,
      slug,
      banner,
    });

    res.status(httpStatus.OK).json({
      success: true,
      message: 'Post created successfully',
      data: post,
    });
  },
);

export const getAllPosts = catchAsync(async (req: Request, res: Response) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.status(httpStatus.OK).json({
    success: true,
    data: posts,
  });
});
