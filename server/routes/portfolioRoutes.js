import express from 'express';
import { 
  getAllPortfolioImages, 
  uploadPortfolioImage, 
  deletePortfolioImage 
} from '../controllers/portfolioController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';
import upload from '../config/multer.js';

const router = express.Router();

router.get('/', getAllPortfolioImages);
router.post('/', authMiddleware, adminMiddleware, upload.single('image'), uploadPortfolioImage);
router.delete('/:id', authMiddleware, adminMiddleware, deletePortfolioImage);

export default router;
