import express from 'express';
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from '../controllers/user.controllers';
import { authorizeRoles, isAuthenticatedUser } from '../middleware/authGuard';
import validateRequest from '../middleware/validateRequest';
import { updateUserSchema } from '../validation/user.validation';

const router = express.Router();

router.get('/all', isAuthenticatedUser, authorizeRoles('admin'), getAllUsers);
router.get('/single/:id', isAuthenticatedUser, getUser);
router.put(
  '/update/:id',
  isAuthenticatedUser,
  validateRequest(updateUserSchema),
  updateUser,
);
router.delete(
  '/delete/:id',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  deleteUser,
);

export default router;
