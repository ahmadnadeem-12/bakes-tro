import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaUser, FaEnvelope, FaPhone, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import { authAPI } from '../../services/api'
import { toast } from 'react-hot-toast'
import './Register.css'

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await authAPI.register(formData);
      toast.success('Registration Successful! Please login.');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-page container">
      <motion.div 
        className="register-container clay-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="register-header">
           <img src="/images/logo.png" alt="Bakestro" className="register-logo" />
           <h1>Create Account</h1>
           <p>Join the Bakestro family today</p>
        </div>

        <form className="register-form" onSubmit={handleRegister}>
          <div className="form-group">
            <label>Full Name</label>
            <div className="input-with-icon">
              <FaUser />
              <input type="text" placeholder="John Doe" required />
            </div>
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <div className="input-with-icon">
              <FaEnvelope />
              <input type="email" placeholder="email@example.com" required />
            </div>
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <div className="input-with-icon">
              <FaPhone />
              <input type="tel" placeholder="03xx-xxxxxxx" required />
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

          <p className="terms-text">By registering, you agree to our Terms of Service and Privacy Policy.</p>

          <button type="submit" className="clay-button register-btn">Create Account</button>
        </form>

        <div className="register-footer">
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </motion.div>
    </div>
  )
}

export default Register
