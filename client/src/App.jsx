import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Preloader from './components/Preloader/Preloader'
import Home from './pages/Home/Home'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import Cart from './pages/Cart/Cart'
import Checkout from './pages/Checkout/Checkout'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import AdminDashboard from './pages/Admin/Dashboard'
import Navbar from './components/Navbar/Navbar'
import Chatbot from './components/Chatbot/Chatbot'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'

function App() {
  console.log('📦 App Component Initializing...');
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    console.log('🔄 Starting Preloader Timer...');
    const timer = setTimeout(() => {
      console.log('🏁 Preloader Complete, mounting App content...');
      setLoading(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <Preloader />

  return (
    <AuthProvider>
      <CartProvider>
        <div className="bakestro-app">
          <Toaster position="top-center" reverseOrder={false} />
          
          {!location.pathname.startsWith('/admin') && (
            <>
              <Header />
              <Navbar />
            </>
          )}
          
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>

          {!location.pathname.startsWith('/admin') && <Footer />}
          {!location.pathname.startsWith('/admin') && <Chatbot />}
        </div>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
