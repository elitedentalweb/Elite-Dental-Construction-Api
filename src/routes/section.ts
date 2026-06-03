import { Router } from 'express';
import * as sectionControllers from '../controllers/sectionController.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.get('/', authenticate, sectionControllers.getSections);
router.get('/:id', authenticate, sectionControllers.getSectionById);
router.post('/', authenticate, sectionControllers.createSection);
router.patch('/:id', authenticate, sectionControllers.updateSection);
router.delete('/:id', authenticate, sectionControllers.deleteSection);

export default router;
