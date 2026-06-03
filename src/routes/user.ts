import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import {
  getUsers,
  approveUser,
  deleteUser,
  setRole,
} from '../controllers/userController.js';

const router = Router();

router.get('/', authenticate, getUsers);
router.post('/approve', authenticate, approveUser);
router.post('/set-role', authenticate, setRole);
router.delete('/', authenticate, deleteUser);

export default router;
