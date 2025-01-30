import React from "react";
import { FaSearch, FaHome, FaMusic } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./dashboard.css";

const Dashboard = () => {
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
          My Libraries
        </Link>

        <Link to="/search" className="nav-item">
          <FaSearch className="nav-icon" />
          Search
        </Link>
      </div>

      <div className="song-container">
        <h2>Discover Songs</h2>
      </div>
    </div>
  );
};

export default Dashboard;
