import React, { useState } from 'react';

const Search = () => {
    const [query, setQuery] = useState('');
    const [songs, setSongs] = useState([]);

    const handleSearch = async () => {
        if (!query) return;

        try {
            const response = await fetch(`http://localhost:5003/api/jamendo/search?q=${query}`);
            const results = await response.json();
            setSongs(results);
        } catch (error) {
            console.error('Error searching songs:', error);
        }
    };

    return (
        <div className="search-container">
            <h2>Search for Songs</h2>
            <input
                type="text"
                placeholder="Enter a song name..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            <ul>
                {songs.map((song) => (
                    <li key={song.id}>
                        <strong>{song.name}</strong> by {song.artist_name}
                        <br />
                        <img src={song.image} alt={song.name} width="100" />
                        <br />
                        <audio controls>
                            <source src={song.audio} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Search;
