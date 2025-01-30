import express from 'express';
import bcrypt from 'bcryptjs';
import User from './userModel.js';

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the new user to the database
        const newUser = new User({
            email,
            password: hashedPassword,
        });

        await newUser.save();

        console.log(newUser)

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during signup:', error); // Add logging
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
