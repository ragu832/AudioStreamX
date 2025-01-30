import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    album: {
        type: String
    },
    duration: {
        type: Number
    },
    url: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

const Song = mongoose.model('Song', songSchema);
export default Song;
