import { Router } from 'express';
import authRouter from './auth.js';
import sectionRouter from './section.js';
import photoRouter from './photo.js';
import userRouter from './user.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/sections', sectionRouter);
router.use('/photos', photoRouter);
router.use('/users', userRouter);
export default router;
