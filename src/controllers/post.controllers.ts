import { Request, Response, NextFunction } from 'express';
import catchAsync from '../utils/catchAsyn';
import httpStatus from 'http-status';
import Post from '../models/post.model';
import {
  deleteSingleImage,
  uploadSingleImage,
} from '../utils/cloudinaryImageUpload';
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

export const getSinglePost = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) throw new AppError(httpStatus.BAD_REQUEST, 'Post id is required');
  const post = await Post.findById(id);
  if (!post) throw new AppError(httpStatus.BAD_REQUEST, 'Post not found');
  res.status(httpStatus.OK).json({
    success: true,
    data: post,
  });
});

export const updatePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) throw new AppError(httpStatus.BAD_REQUEST, 'Post id is required');
    const post = await Post.findById(id);
    if (!post) throw new AppError(httpStatus.BAD_REQUEST, 'Post not found');
    const isAuthorIdMatch = req.user._id.toString() === post.author.toString();
    if (!isAuthorIdMatch) {
      throw next(
        new AppError(httpStatus.FORBIDDEN, 'You are not permitted to update'),
      );
    }
    let banner;
    if (req.files?.banner) {
      await deleteSingleImage(post?.banner.public_id as string);
      banner = await uploadSingleImage(
        req.files?.banner as UploadedFile,
        'banners',
      );
    }
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        title: req.body.title,
        slug: generateSlug(req.body.title),
        content: req.body.content,
        category: req.body.category,
        banner: req.files?.banner ? banner : post?.banner,
      },
      { new: true },
    );

    res.status(httpStatus.OK).json({
      success: true,
      message: 'Post updated successfully',
      data: updatedPost,
    });
  },
);

export const deletePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) throw new AppError(httpStatus.BAD_REQUEST, 'Post id is required');
    const post = await Post.findById(id);
    if (!post) throw new AppError(httpStatus.BAD_REQUEST, 'Post not found');
    const isAuthorOrAdmin =
      req.user._id.toString() === post.author.toString() ||
      req.user.role === 'admin';
    if (!isAuthorOrAdmin) {
      throw next(
        new AppError(httpStatus.FORBIDDEN, 'You are not permitted to delete'),
      );
    }
    await deleteSingleImage(post?.banner.public_id as string);
    await Post.findByIdAndDelete(id);
    res.status(httpStatus.OK).json({
      success: true,
      message: 'Post deleted successfully',
    });
  },
);
