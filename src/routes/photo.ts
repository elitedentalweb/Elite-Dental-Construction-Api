import { Router } from 'express';
import * as photoControllers from '../controllers/photoController.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.get('/', authenticate, photoControllers.getPhotos);
router.get('/:id', authenticate, photoControllers.getPhotoById);
router.post('/', authenticate, photoControllers.createPhoto);
router.patch('/:id', authenticate, photoControllers.updatePhoto);
router.delete('/:id', authenticate, photoControllers.deletePhoto);

export default router;
