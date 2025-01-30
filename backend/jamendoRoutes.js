import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

const CLIENT_ID = process.env.CLIENT_ID;

router.get('/search', async (req, res) => {
    const { q } = req.query;

    try {
        const response = await fetch(`https://api.jamendo.com/v3.0/tracks/?client_id=${CLIENT_ID}&format=json&limit=10&search=${encodeURIComponent(q)}`);
        const data = await response.json();

        res.json(data.results);
    } catch (error) {
        console.error('Error searching Jamendo:', error);
        res.status(500).json({ error: 'Failed to search Jamendo' });
    }
});

// Get random songs for different categories
router.get('/discover', async (req, res) => {
    try {
        const categories = ['rock', 'pop', 'electronic', 'jazz', 'classical'];
        const results = {};

        // Fetch 5 songs for each category
        await Promise.all(categories.map(async (category) => {
            const response = await fetch(
                `https://api.jamendo.com/v3.0/tracks/?client_id=${CLIENT_ID}&format=json&limit=5&tags=${category}&orderby=random`
            );
            const data = await response.json();
            results[category] = data.results;
        }));

        res.json(results);
    } catch (error) {
        console.error('Error fetching discover songs:', error);
        res.status(500).json({ error: 'Failed to fetch discover songs' });
    }
});

export default router;
