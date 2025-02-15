import express from 'express'; 
import { ytVideoAnalysis } from '../controllers/ytController.js';

const router = express.Router();  

// Register route
router.post('/yt', ytVideoAnalysis);

export default router;