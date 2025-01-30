import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './userModel.js';

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret-key';

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = new User({
            email,
            password: hashedPassword
        });

        await user.save();

        // Generate JWT token with userId
        const token = jwt.sign(
            { 
                userId: user._id,
                email: user.email
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: user._id,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            message: 'Server error',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

export default router;