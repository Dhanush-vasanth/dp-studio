import express from 'express';
import { 
  sendContactMessage, 
  getAllContactMessages 
} from '../controllers/contactController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/', sendContactMessage);
router.get('/', authMiddleware, adminMiddleware, getAllContactMessages);

export default router;
