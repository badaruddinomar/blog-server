import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsyn';
import httpStatus from 'http-status';
import User from '../models/user.model';
import { IUserSearchQuery } from '../interface/user.interface';

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
