import express from 'express';
import { getAllUsers } from '../controllers/user.controllers';
import { authorizeRoles, isAuthenticatedUser } from '../middleware/authGuard';

const router = express.Router();

router.get('/all', isAuthenticatedUser, authorizeRoles('admin'), getAllUsers);

export default router;
