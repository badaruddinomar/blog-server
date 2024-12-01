import express from 'express';
import {
  createComment,
  getPostComments,
} from '../controllers/comment.controller';
import { isAuthenticatedUser } from '../middleware/authGuard';

const router = express.Router();

router.post('/create', isAuthenticatedUser, createComment);
router.get('/all', isAuthenticatedUser, getPostComments);

export default router;
