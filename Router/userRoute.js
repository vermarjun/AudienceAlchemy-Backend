import express from 'express'; 
import { registerUser, login, logoutUser, updateProfile } from '../controllers/userController.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();  

// Register route
router.post('/register',registerUser);

// Login route
router.post('/login', login);

// Logout route
router.get('/logout', logoutUser);

// Profile update route (with authentication middleware)
router.post('/profile', authMiddleware, updateProfile);


export default router;
