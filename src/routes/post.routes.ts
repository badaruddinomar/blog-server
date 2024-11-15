import express from 'express';
import {
  createPost,
  getAllPosts,
  getSinglePost,
} from '../controllers/post.controllers';
import { isAuthenticatedUser } from '../middleware/authGuard';
import validateRequest from '../middleware/validateRequest';
import { postSchema } from '../validation/post.validation';

const router = express.Router();

router.post(
  '/create',
  isAuthenticatedUser,
  validateRequest(postSchema),
  createPost,
);
router.get('/all', getAllPosts);
router.get('/single/:id', getSinglePost);

export default router;
