import express from 'express'; 
import { registerUser, login, logoutUser, updateProfile, viewProfile } from '../controllers/userController.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();  

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', login);

// Logout route
router.get('/logout', logoutUser);

// Profile view route
router.get("/updateprofile", authMiddleware, viewProfile);

// Profile update route
router.post('/viewprofile', authMiddleware, updateProfile);

export default router;