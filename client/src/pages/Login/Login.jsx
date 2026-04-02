import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaEye, FaEyeSlash, FaLock, FaEnvelope } from 'react-icons/fa'
import { authAPI } from '../../services/api'
import { useAuth } from '../../context/AuthContext'
import './Login.css'

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await authAPI.login({ email, password });
      login(data, data.token);
      toast.success('Login Successful! Welcome back.');
      
      if (data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Please check credentials.');
    }
  };

  return (
    <div className="login-page container">
      <motion.div 
        className="login-container clay-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="login-header">
           <img src="/images/logo.png" alt="Bakestro" className="login-logo" />
           <h1>Welcome Back</h1>
           <p>Log in to your Bakestro account</p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email Address</label>
            <div className="input-with-icon">
              <FaEnvelope />
              <input 
                type="email" 
                placeholder="email@example.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-with-icon">
              <FaLock />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button" 
                className="toggle-password" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="forgot-password">
            <a href="#">Forgot Password?</a>
          </div>

          <button type="submit" className="clay-button login-btn">Login</button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <Link to="/register">Register Now</Link></p>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
