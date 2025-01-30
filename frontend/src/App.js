import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import necessary components from react-router-dom
import SplashScreen from './components/SplashScreen'; // Import SplashScreen component
import Home from './components/Home'; // Import Home component
import Login from "./components/Login"; // Import Login component
import Signup from "./components/Signup"; // Import Signup component
import Dashboard from "./components/Dashboard"; // Import Dashboard component (case-sensitive)
import Mylibrary from "./components/Mylibrary"; // Import Mylibrary component
import Search from "./components/Search"; // Ensure Search component is imported

function App() {
  return (
    <Router> {/* Wrap your app with BrowserRouter */}
      <Routes>
        <Route path="/" element={<SplashScreen />} /> {/* SplashScreen for the root path */}
        <Route path="/home" element={<Home />} /> {/* Home page route */}
        <Route path="/login" element={<Login />} /> {/* Login page route */}
        <Route path="/signup" element={<Signup />} /> {/* Signup page route */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard page route */}
        <Route path="/my-library" element={<Mylibrary />} /> {/* MyLibrary page route */}
        <Route path="/search" element={<Search />} /> {/* Ensure Search component is used */}
      </Routes>
    </Router>
  );
}

export default App;
