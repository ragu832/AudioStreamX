import React, { useState } from 'react';
import './Search.css';

const Search = () => {
    const [query, setQuery] = useState('');
    const [songs, setSongs] = useState([]);
    const [message, setMessage] = useState('');

    const handleSearch = async () => {
        if (!query) return;

        try {
            const response = await fetch(`http://localhost:5003/api/jamendo/search?q=${query}`);
            const results = await response.json();
            setSongs(results);
        } catch (error) {
            console.error('Error searching songs:', error);
            setMessage('Error searching songs. Please try again.');
        }
    };

    const handleAddToLibrary = async (song) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setMessage('Please login to add songs to your library');
                return;
            }

            const response = await fetch('http://localhost:5003/api/library/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: song.name,
                    artist: song.artist_name,
                    album: song.album_name,
                    duration: song.duration,
                    url: song.audio,
                    imageUrl: song.image
                })
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Song added to library successfully!');
                setTimeout(() => setMessage(''), 3000);
            } else {
                setMessage(data.message || 'Error adding song to library');
            }
        } catch (error) {
            console.error('Error adding to library:', error);
            setMessage('Error adding song to library. Please try again.');
        }
    };

    return (
        <div className="search-container">
            <h2>Search for Songs</h2>
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Enter a song name..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {message && <div className="message">{message}</div>}

            <div className="songs-grid">
                {songs.map((song) => (
                    <div key={song.id} className="song-card">
                        <img src={song.image} alt={song.name} className="song-image" />
                        <div className="song-info">
                            <h3>{song.name}</h3>
                            <p>{song.artist_name}</p>
                        </div>
                        <div className="song-controls">
                            <audio controls>
                                <source src={song.audio} type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                            <button 
                                onClick={() => handleAddToLibrary(song)}
                                className="add-to-library-btn"
                            >
                                Add to Library
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;
