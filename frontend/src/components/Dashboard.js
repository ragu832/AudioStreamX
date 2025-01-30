import React, { useState, useEffect } from "react";
import { FaSearch, FaHome, FaMusic, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./dashboard.css";

const Dashboard = () => {
  const [songs, setSongs] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchDiscoverSongs();
  }, []);

  const fetchDiscoverSongs = async () => {
    try {
      const response = await fetch('http://localhost:5003/api/jamendo/discover');
      const data = await response.json();
      setSongs(data);
    } catch (error) {
      console.error('Error fetching discover songs:', error);
      setMessage('Error loading songs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToLibrary = async (song) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('Please login to add songs to your library');
        setTimeout(() => setMessage(''), 3000);
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
      } else {
        setMessage(data.message || 'Error adding song to library');
      }
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error adding to library:', error);
      setMessage('Error adding song to library. Please try again.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="dashboard">
      <h1 className="title">AudioStreamX</h1>
      <div className="nav-options">
        <Link to="/" className="nav-item active">
          <FaHome className="nav-icon" />
          Home
        </Link>

        <Link to="/my-library" className="nav-item">
          <FaMusic className="nav-icon" />
          My Library
        </Link>

        <Link to="/search" className="nav-item">
          <FaSearch className="nav-icon" />
          Search
        </Link>
      </div>

      {message && <div className="message">{message}</div>}

      <div className="discover-container">
        {loading ? (
          <div className="loading">Loading songs...</div>
        ) : (
          Object.entries(songs).map(([category, categorySongs]) => (
            <div key={category} className="category-section">
              <h2 className="category-title">{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
              <div className="songs-grid">
                {categorySongs.map((song) => (
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
                        <FaPlus /> Add to Library
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
