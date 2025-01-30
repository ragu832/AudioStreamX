import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret-key';

export function authenticateToken(req, res, next) {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid or expired token' });
            }
            req.user = decoded;
            next();
        });
    } catch (error) {
        console.error('Auth error:', error);
        res.status(500).json({ message: 'Server error during authentication' });
    }
}

export default router;