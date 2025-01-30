// src/components/SplashScreen.js
import React, { useEffect } from "react";
import './SplashScreen.css';
import { splashAnim } from "../Animation/splasAnimation";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const SplashScreen = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    splashAnim(); // Trigger the splash screen animation
    setTimeout(() => {
      navigate("/home"); // After 3 seconds, navigate to the home page
    }, 5000); // Set the delay (3 seconds for splash screen)
  }, [navigate]); // Empty dependency array ensures this runs only once

  return (
    <div className="splash">
      <div className="text-container">
        <span>AudioStreamX</span>
      </div>
    </div>
  );
};

export default SplashScreen;
