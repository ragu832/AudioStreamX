import React, { useEffect } from "react";
import './SplashScreen.css';
import { splashAnim } from "../Animation/splasAnimation";
import { useNavigate } from "react-router-dom"; 

const SplashScreen = () => {
  const navigate = useNavigate(); 
  useEffect(() => {
    splashAnim(); 
    setTimeout(() => {
      navigate("/home");
    }, 5000);
  }, [navigate]);

  return (
    <div className="splash">
      <div className="text-container">
        <span>AudioStreamX</span>
      </div>
    </div>
  );
};

export default SplashScreen;
