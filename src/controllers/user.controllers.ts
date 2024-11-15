import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsyn';
import httpStatus from 'http-status';
import User from '../models/user.model';
import { IUser, IUserSearchQuery } from '../interface/user.interface';
import { UploadedFile } from 'express-fileupload';
import {
  deleteSingleImage,
  uploadSingleImage,
} from '../utils/cloudinaryImageUpload';
import AppError from '../utils/AppError';

export const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const search = req.query.search as string;
  const limit = parseInt(req.query.limit as string) || 10;
  const page = parseInt(req.query.page as string) || 1;
  const skip = (page - 1) * limit;
  const sort = req.query.sort === 'asc' ? 1 : -1;
  const query: IUserSearchQuery = {};
  if (search) {
    query.name = { $regex: search, $options: 'i' };
  }
  const users = await User.find(query)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: sort })
    .select('-password');
  const totalUsers = await User.countDocuments();
  const totalPages = Math.ceil(totalUsers / limit);
  res.status(httpStatus.OK).json({
    success: true,
    data: users,
    meta: {
      total: totalUsers,
      pages: totalPages,
      currentPage: page,
      limit,
    },
  });
});

export const getUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findById(id).select('-password');
  res.status(httpStatus.OK).json({
    success: true,
    data: user,
  });
});

export const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name } = req.body;

    const isExistsUser = await User.findById(id);
    if (!isExistsUser) next(new AppError(400, 'User not found'));

    // upload image--
    let avatar;
    if (req.files?.avatar) {
      await deleteSingleImage(isExistsUser?.avatar.public_id as string);
      avatar = await uploadSingleImage(
        req.files?.avatar as UploadedFile,
        'avatars',
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, avatar: req.files?.avatar ? avatar : isExistsUser?.avatar },
      {
        new: true,
        runValidators: true,
      },
    );

    const { password: _password, ...userData } =
      updatedUser?.toObject() as IUser;

    res.status(httpStatus.OK).json({
      success: true,
      data: userData,
    });
  },
);

export const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const isUserExists = await User.findById(id);
    if (!isUserExists) {
      throw next(new AppError(400, 'User not found'));
    }
    await User.findByIdAndDelete(id);
    res.status(httpStatus.OK).json({
      message: 'User deleted successfully',
      success: true,
    });
  },
);
