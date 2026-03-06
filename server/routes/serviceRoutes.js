import express from 'express';
import { 
  getAllServices, 
  createService, 
  deleteService 
} from '../controllers/serviceController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllServices);
router.post('/', authMiddleware, adminMiddleware, createService);
router.delete('/:id', authMiddleware, adminMiddleware, deleteService);

export default router;
