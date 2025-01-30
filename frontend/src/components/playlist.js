import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Playlist = () => {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/playlists')
            .then((response) => {
                setPlaylists(response.data);
            })
            .catch((error) => {
                console.error('Error fetching playlists:', error);
            });
    }, []);

    return (
        <div>
            <h1>Your Spotify Playlists</h1>
            <ul>
                {playlists.map((playlist) => (
                    <li key={playlist.id}>
                        <h2>{playlist.name}</h2>
                        <p>{playlist.tracks.total} tracks</p>
                        <a href={playlist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                            Open in Spotify
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Playlist;
