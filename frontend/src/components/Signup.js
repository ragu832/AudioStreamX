import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import './Signup.css'; 

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5003/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage('User registered successfully');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Error signing up');
    }
  };

  return (
    <>
      <div className="signup">
        <div className="container">
          <h1 className="signup-text">Sign Up</h1><br/>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label><br/>
            <input
              type="email"
              id="email"
              placeholder="Enter your Email"
              name="email"
              value={email}
              onChange={handleChange}
            /><br/><br/>
            
            <label htmlFor="password">Password</label><br/>
            <input
              type="password"
              id="password"
              placeholder="Enter your Password"
              name="password"
              value={password}
              onChange={handleChange}
            />
            <br/><br/>
            <button type="submit" className="signup-button">Sign Up</button><br/>
          </form>
          {message && <p>{message}</p>}
          <div className="login-link">
            <span>Already Registered? </span>
            <Link to="/Login">Log In</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
