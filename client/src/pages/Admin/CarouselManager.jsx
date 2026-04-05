import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBox, FaShoppingCart, FaSignOutAlt, FaBullhorn, FaImages, FaPlus, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa'
import { FaRectangleList } from 'react-icons/fa6'
import { toast } from 'react-hot-toast'
import '../Admin/Dashboard.css'

const CarouselManager = () => {
  const [slides, setSlides] = useState([
    { id: 1, image: '/images/menu.png', tagline: 'The Art of Traditional Baking', title: 'Premium Nan Khatai', cta: 'Shop Speciality', type: 'image' },
    { id: 2, image: '/images/advertisement card.png', tagline: 'Sweeten Your Moments', title: 'Delicious Desserts', cta: 'Order Now', type: 'image' },
    { id: 3, image: '/images/Packaging.png', tagline: 'Perfect Gifts for Loved Ones', title: 'Bakestro Gift Packs', cta: 'View Collection', type: 'image' },
  ]);

  const [newSlide, setNewSlide] = useState({ tagline: '', title: '', cta: '', image: '' });

  const moveSlide = (index, direction) => {
    const newSlides = [...slides];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newSlides.length) return;
    [newSlides[index], newSlides[targetIndex]] = [newSlides[targetIndex], newSlides[index]];
    setSlides(newSlides);
  };

  const deleteSlide = (id) => {
    setSlides(prev => prev.filter(s => s.id !== id));
    toast.success('Slide removed');
  };

  const addSlide = () => {
    if (!newSlide.title) return toast.error('Title is required');
    setSlides(prev => [...prev, { ...newSlide, id: Date.now(), image: newSlide.image || '/images/menu.png', type: 'image' }]);
    setNewSlide({ tagline: '', title: '', cta: '', image: '' });
    toast.success('Slide added!');
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <div className="admin-logo">
          <img src="/images/logo.png" alt="Bakestro" />
          <h2>Admin</h2>
        </div>
        <nav className="admin-nav">
          <Link to="/admin" className="admin-nav-item"><FaRectangleList /> Overview</Link>
          <Link to="/admin/products" className="admin-nav-item"><FaBox /> Products</Link>
          <Link to="/admin/orders" className="admin-nav-item"><FaShoppingCart /> Orders</Link>
          <Link to="/admin/categories" className="admin-nav-item"><FaRectangleList /> Categories</Link>
          <Link to="/admin/announcements" className="admin-nav-item"><FaBullhorn /> Announcements</Link>
          <Link to="/admin/carousel" className="admin-nav-item active"><FaImages /> Carousel</Link>
        </nav>
        <button className="admin-logout" onClick={() => window.location.href = '/login'}><FaSignOutAlt /> Logout</button>
      </div>

      <div className="admin-main">
        <header className="admin-header">
          <h1>Carousel Manager</h1>
          <div className="admin-user-info">
            <span>Welcome, Admin</span>
            <div className="admin-avatar">A</div>
          </div>
        </header>

        <div className="admin-content">
          {/* Add New Slide */}
          <div className="clay-card" style={{ padding: '24px' }}>
            <h3 style={{ marginBottom: '16px', fontFamily: 'Outfit' }}>Add New Slide</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label>Tagline</label>
                <input type="text" value={newSlide.tagline} onChange={e => setNewSlide({...newSlide, tagline: e.target.value})} placeholder="e.g. The Art of Baking" />
              </div>
              <div className="form-group">
                <label>Title</label>
                <input type="text" value={newSlide.title} onChange={e => setNewSlide({...newSlide, title: e.target.value})} placeholder="e.g. Premium Nan Khatai" />
              </div>
              <div className="form-group">
                <label>CTA Button Text</label>
                <input type="text" value={newSlide.cta} onChange={e => setNewSlide({...newSlide, cta: e.target.value})} placeholder="e.g. Shop Now" />
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input type="text" value={newSlide.image} onChange={e => setNewSlide({...newSlide, image: e.target.value})} placeholder="/images/your-image.png" />
              </div>
            </div>
            <button className="clay-button" onClick={addSlide} style={{ marginTop: '12px' }}>
              <FaPlus /> Add Slide
            </button>
          </div>

          {/* Current Slides */}
          <div className="clay-card" style={{ padding: '24px' }}>
            <h3 style={{ marginBottom: '16px', fontFamily: 'Outfit' }}>Current Slides ({slides.length})</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {slides.map((slide, index) => (
                <div key={slide.id} style={{
                  display: 'flex', gap: '16px', padding: '16px', borderRadius: '12px',
                  background: 'var(--accent-light)', border: '1px solid rgba(139,69,19,0.08)', alignItems: 'center'
                }}>
                  <div style={{ width: '120px', height: '70px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                    <img src={slide.image} alt={slide.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>{slide.tagline}</p>
                    <h4 style={{ fontSize: '1.05rem', marginBottom: '4px' }}>{slide.title}</h4>
                    <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '500' }}>{slide.cta}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flexShrink: 0 }}>
                    <button className="edit-btn" onClick={() => moveSlide(index, -1)} disabled={index === 0}><FaArrowUp /></button>
                    <button className="edit-btn" onClick={() => moveSlide(index, 1)} disabled={index === slides.length - 1}><FaArrowDown /></button>
                  </div>
                  <button className="edit-btn" onClick={() => deleteSlide(slide.id)} style={{ background: '#f8d7da', color: '#721c24' }}>
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarouselManager
