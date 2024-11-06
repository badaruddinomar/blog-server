import { Request, Response, NextFunction } from 'express';
import catchAsync from '../utils/catchAsyn';
import httpStatus from 'http-status';
import User from '../models/user.model';

export const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 10;
  const page = parseInt(req.query.page as string) || 1;
  const skip = (page - 1) * limit;
  const sort = req.query.sort === 'asc' ? 1 : -1;

  const users = await User.find()
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
      limit,
    },
  });
});
