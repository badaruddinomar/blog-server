import { updateUser } from './../controllers/user.controllers';
import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  avatar: z.any(),
});

export type UserSchema = z.infer<typeof userSchema>;

export const updateUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  avatar: z.any(),
});
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
