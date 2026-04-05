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
import Category from './pages/Category/Category'
import AdminDashboard from './pages/Admin/Dashboard'
import AdminProducts from './pages/Admin/Products'
import AdminDeals from './pages/Admin/Deals'
import AdminOrders from './pages/Admin/Orders'
import AdminCategories from './pages/Admin/Categories'
import AdminAnnouncements from './pages/Admin/Announcements'
import AdminCarousel from './pages/Admin/CarouselManager'
import Navbar from './components/Navbar/Navbar'
import Chatbot from './components/Chatbot/Chatbot'
import AnnouncementBar from './components/AnnouncementBar/AnnouncementBar'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import './App.css'

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <Preloader />

  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <AuthProvider>
      <CartProvider>
        <div className="bakestro-app">
          <Toaster 
            position="top-center" 
            reverseOrder={false}
            toastOptions={{
              style: {
                borderRadius: '12px',
                background: '#3E1F0D',
                color: '#fff',
                fontFamily: 'Outfit, sans-serif'
              }
            }}
          />
          <ScrollToTop />
          
          {!isAdminRoute && (
            <>
              <AnnouncementBar />
              <Header />
              <Navbar />
            </>
          )}
          
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/category/:categoryId" element={<Category />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/deals" element={<AdminDeals />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/admin/categories" element={<AdminCategories />} />
              <Route path="/admin/announcements" element={<AdminAnnouncements />} />
              <Route path="/admin/carousel" element={<AdminCarousel />} />
            </Routes>
          </main>

          {!isAdminRoute && <Footer />}
          {!isAdminRoute && <Chatbot />}
        </div>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
