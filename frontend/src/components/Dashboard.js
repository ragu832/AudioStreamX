import React from "react";
import { FaSearch, FaHome, FaMusic } from "react-icons/fa"; // Import required icons
import { Link } from "react-router-dom"; // Import Link for navigation
import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1 className="title">AudioStreamX</h1>

      {/* Navigation Options */}
      <div className="nav-options">
        <Link to="/" className="nav-item active">
          <FaHome className="nav-icon" />
          Home
        </Link>

        <Link to="/my-library" className="nav-item">
          <FaMusic className="nav-icon" />
          My Libraries
        </Link>

        <Link to="/search" className="nav-item">
          <FaSearch className="nav-icon" />
          Search
        </Link>
      </div>

      {/* Placeholder for Songs */}
      <div className="song-container">
        <h2>Discover Songs</h2>
        <p>This section will display songs fetched from an API.</p>
      </div>
    </div>
  );
};

export default Dashboard;
