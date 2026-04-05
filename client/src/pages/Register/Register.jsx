import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaUser, FaEnvelope, FaPhone, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import { GoogleLogin } from '@react-oauth/google'
import { authAPI } from '../../services/api'
import { useAuth } from '../../context/AuthContext'
import { toast } from 'react-hot-toast'
import './Register.css'

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authAPI.register(formData);
      toast.success('Registration Successful! Please login.');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      const { data } = await authAPI.googleLogin({ credential: credentialResponse.credential });
      login(data, data.token);
      toast.success(`Welcome to Bakestro, ${data.name}!`);
      navigate('/');
    } catch (error) {
      toast.error('Google sign-up failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page container">
      <motion.div 
        className="register-container clay-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="register-header">
           <img src="/images/logo.png" alt="Bakestro" className="register-logo" />
           <h1>Create Account</h1>
           <p>Join the Bakestro family today</p>
        </div>

        <div className="google-login-section">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error('Google Sign-Up failed')}
            theme="outline"
            shape="pill"
            size="large"
            text="signup_with"
          />
        </div>

        <div className="login-divider">
          <span>or register with email</span>
        </div>

        <form className="register-form" onSubmit={handleRegister}>
          <div className="form-group">
            <label>Full Name</label>
            <div className="input-with-icon">
              <FaUser />
              <input 
                type="text" 
                name="name"
                placeholder="John Doe" 
                required 
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <div className="input-with-icon">
              <FaEnvelope />
              <input 
                type="email" 
                name="email"
                placeholder="email@example.com" 
                required 
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <div className="input-with-icon">
              <FaPhone />
              <input 
                type="tel" 
                name="phone"
                placeholder="03xx-xxxxxxx" 
                required 
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-with-icon">
              <FaLock />
              <input 
                type={showPassword ? "text" : "password"} 
                name="password"
                placeholder="••••••••" 
                required 
                value={formData.password}
                onChange={handleChange}
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

          <button type="submit" className="clay-button register-btn" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="register-footer">
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </motion.div>
    </div>
  )
}

export default Register
