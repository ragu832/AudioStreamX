import express from 'express';
import Song from '../models/songModel.js';
import { authenticateToken } from '../auth.js';

const router = express.Router();

// Add a song to user's library
router.post('/library/add', authenticateToken, async (req, res) => {
    try {
        const { title, artist, album, duration, url, imageUrl } = req.body;
        
        // Validate required fields
        if (!title || !artist || !url) {
            return res.status(400).json({ message: 'Title, artist, and URL are required' });
        }

        // Create new song
        const song = new Song({
            title,
            artist,
            album,
            duration,
            url,
            imageUrl,
            userId: req.user.userId
        });

        await song.save();
        res.status(201).json({
            message: 'Song added to library successfully',
            song
        });
    } catch (error) {
        console.error('Add to library error:', error);
        res.status(500).json({
            message: 'Server error',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Get user's library
router.get('/library', authenticateToken, async (req, res) => {
    try {
        const songs = await Song.find({ userId: req.user.userId })
            .sort({ createdAt: -1 }); // Latest songs first
        res.json(songs);
    } catch (error) {
        console.error('Get library error:', error);
        res.status(500).json({
            message: 'Server error',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Remove song from library
router.delete('/library/:songId', authenticateToken, async (req, res) => {
    try {
        const song = await Song.findOne({
            _id: req.params.songId,
            userId: req.user.userId
        });

        if (!song) {
            return res.status(404).json({ message: 'Song not found in library' });
        }

        await song.deleteOne();
        res.json({ message: 'Song removed from library successfully' });
    } catch (error) {
        console.error('Remove from library error:', error);
        res.status(500).json({
            message: 'Server error',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

export default router;
