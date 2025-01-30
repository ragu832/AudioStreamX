// src/components/Home.js
import React from "react";
import { useNavigate } from "react-router-dom";
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/Login'); // Navigate to the Playlist component route
  };

  return (
    <>
      <div className="Home">
        <div className="text-container">
          <h1>Welcome to AudioStreamX</h1>
          <p>Discover, Play, Repeat</p>
        </div>
        <button className="Get-start" onClick={handleStart}>Get Start</button>
      </div>
    </>
  );
};

export default Home;
