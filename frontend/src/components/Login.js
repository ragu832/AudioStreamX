import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Attempting to log in...');
    try {
      const response = await fetch('http://localhost:5003/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });
      
      const data = await response.json();
      console.log('Login response:', data);

      if (response.ok) {
        setMessage('Login successful! Redirecting...');
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setTimeout(() => {
          navigate('/dashboard');
        }, 500);
      } else {
        setMessage(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Server error. Please try again later.');
    }
  };

  return (
    <>
      <div className="login">
        <div className="container">
          <h1 className="login-text">Log In</h1><br/>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label><br/>
            <input
              type="email"
              id="email"
              placeholder="Enter your Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            /><br/><br/>
            
            <label htmlFor="password">Password</label><br/>
            <input
              type="password"
              id="password"
              placeholder="Enter your Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br/><br/>
            <button type="submit" className="login-button">Log In</button><br/><br/>
          </form>
          {message && <p>{message}</p>}
          <div className="signup-link">
            <span>Don't have an account? </span>
            <Link to="/Signup">Sign Up</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
