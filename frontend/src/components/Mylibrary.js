import React, { useState, useEffect } from 'react';
import './Mylibrary.css';

const Mylibrary = () => {
    const [songs, setSongs] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLibrary();
    }, []);

    const fetchLibrary = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setMessage('Please login to view your library');
                setLoading(false);
                return;
            }

            const response = await fetch('http://localhost:5003/api/library', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (response.ok) {
                setSongs(data);
            } else {
                setMessage(data.message || 'Error fetching library');
            }
        } catch (error) {
            console.error('Error fetching library:', error);
            setMessage('Error loading your library. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveFromLibrary = async (songId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await fetch(`http://localhost:5003/api/library/${songId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setSongs(songs.filter(song => song._id !== songId));
                setMessage('Song removed from library');
                setTimeout(() => setMessage(''), 3000);
            } else {
                const data = await response.json();
                setMessage(data.message || 'Error removing song');
            }
        } catch (error) {
            console.error('Error removing song:', error);
            setMessage('Error removing song. Please try again.');
        }
    };

    if (loading) {
        return <div className="mylibrary">Loading...</div>;
    }

    return (
        <div className="mylibrary">
            <h1 className="title">My Library</h1>
            
            {message && <div className="message">{message}</div>}

            {songs.length === 0 ? (
                <div className="empty-library">
                    <p>Your library is empty. Start adding songs from the Search page!</p>
                </div>
            ) : (
                <div className="songs-grid">
                    {songs.map((song) => (
                        <div key={song._id} className="song-card">
                            <img 
                                src={song.imageUrl || 'default-album-art.jpg'} 
                                alt={song.title} 
                                className="song-image"
                            />
                            <div className="song-info">
                                <h3>{song.title}</h3>
                                <p>{song.artist}</p>
                                {song.album && <p className="album">{song.album}</p>}
                            </div>
                            <div className="song-controls">
                                <audio controls>
                                    <source src={song.url} type="audio/mpeg" />
                                    Your browser does not support the audio element.
                                </audio>
                                <button 
                                    onClick={() => handleRemoveFromLibrary(song._id)}
                                    className="remove-btn"
                                >
                                    Remove from Library
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Mylibrary;