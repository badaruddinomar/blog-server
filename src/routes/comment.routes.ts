import express from 'express';
import { createComment } from '../controllers/comment.controller';
import { isAuthenticatedUser } from '../middleware/authGuard';

const router = express.Router();

router.post('/create', isAuthenticatedUser, createComment);

export default router;
