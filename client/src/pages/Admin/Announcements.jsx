import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaBox, FaShoppingCart, FaSignOutAlt, FaBullhorn, FaImages, FaPlus, FaTrash, FaEdit, FaSave, FaTimes } from 'react-icons/fa'
import { FaRectangleList } from 'react-icons/fa6'
import { announcementAPI } from '../../services/api'
import { toast } from 'react-hot-toast'
import '../Admin/Dashboard.css'

const AnnouncementManager = () => {
  const [announcements, setAnnouncements] = useState([
    { _id: '1', text: '🎉 Free delivery on orders above Rs. 2000', isActive: true },
    { _id: '2', text: '✨ New collections added every week', isActive: true },
    { _id: '3', text: '🎁 Subscribe to our newsletter for exclusive deals', isActive: true },
    { _id: '4', text: '⏰ Same-day delivery available in Faisalabad', isActive: true },
  ]);
  const [newText, setNewText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const { data } = await announcementAPI.getAnnouncements();
        if (data && data.length > 0) {
          setAnnouncements(data);
        }
      } catch (error) {
        console.log('Using default announcements');
      }
    };
    fetchAnnouncements();
  }, []);

  const addAnnouncement = async () => {
    if (!newText.trim()) return;
    try {
      const { data } = await announcementAPI.createAnnouncement({ text: newText });
      setAnnouncements(prev => [...prev, data]);
    } catch (error) {
      const newItem = { _id: Date.now().toString(), text: newText, isActive: true };
      setAnnouncements(prev => [...prev, newItem]);
    }
    setNewText('');
    toast.success('Announcement added!');
  };

  const deleteAnnouncement = async (id) => {
    try {
      await announcementAPI.deleteAnnouncement(id);
    } catch (error) {}
    setAnnouncements(prev => prev.filter(a => a._id !== id));
    toast.success('Announcement deleted');
  };

  const saveEdit = async (id) => {
    try {
      await announcementAPI.updateAnnouncement(id, { text: editText });
    } catch (error) {}
    setAnnouncements(prev => prev.map(a => a._id === id ? { ...a, text: editText } : a));
    setEditingId(null);
    toast.success('Announcement updated');
  };

  const toggleActive = (id) => {
    setAnnouncements(prev => prev.map(a => a._id === id ? { ...a, isActive: !a.isActive } : a));
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
          <Link to="/admin/announcements" className="admin-nav-item active"><FaBullhorn /> Announcements</Link>
          <Link to="/admin/carousel" className="admin-nav-item"><FaImages /> Carousel</Link>
        </nav>
        <button className="admin-logout" onClick={() => window.location.href = '/login'}><FaSignOutAlt /> Logout</button>
      </div>

      <div className="admin-main">
        <header className="admin-header">
          <h1>Announcement Bar Manager</h1>
          <div className="admin-user-info">
            <span>Welcome, Admin</span>
            <div className="admin-avatar">A</div>
          </div>
        </header>

        <div className="admin-content">
          <div className="add-form clay-card" style={{ padding: '24px' }}>
            <h3 style={{ marginBottom: '16px', fontFamily: 'Outfit' }}>Add New Announcement</h3>
            <div style={{ display: 'flex', gap: '12px' }}>
              <input
                type="text"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                placeholder="Enter announcement text (can include emojis 🎉)"
                style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '2px solid #f0e6db', fontSize: '0.95rem' }}
                onKeyDown={(e) => e.key === 'Enter' && addAnnouncement()}
              />
              <button className="clay-button" onClick={addAnnouncement}>
                <FaPlus /> Add
              </button>
            </div>
          </div>

          <div className="clay-card" style={{ padding: '24px' }}>
            <h3 style={{ marginBottom: '16px', fontFamily: 'Outfit' }}>Current Announcements ({announcements.length})</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {announcements.map((announcement) => (
                <div 
                  key={announcement._id} 
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', 
                    borderRadius: '12px', background: announcement.isActive ? 'var(--accent-light)' : '#f5f5f5',
                    border: '1px solid rgba(139,69,19,0.08)', transition: 'all 0.3s'
                  }}
                >
                  <button 
                    onClick={() => toggleActive(announcement._id)}
                    style={{ 
                      width: '44px', height: '24px', borderRadius: '12px', border: 'none', cursor: 'pointer',
                      background: announcement.isActive ? 'var(--success)' : '#ccc', position: 'relative', flexShrink: 0
                    }}
                  >
                    <span style={{
                      width: '20px', height: '20px', borderRadius: '50%', background: 'white', position: 'absolute',
                      top: '2px', left: announcement.isActive ? '22px' : '2px', transition: 'left 0.2s'
                    }}></span>
                  </button>
                  
                  {editingId === announcement._id ? (
                    <input 
                      value={editText} 
                      onChange={(e) => setEditText(e.target.value)}
                      style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '2px solid var(--secondary)', fontSize: '0.9rem' }}
                      autoFocus
                    />
                  ) : (
                    <span style={{ flex: 1, opacity: announcement.isActive ? 1 : 0.5, fontSize: '0.95rem' }}>
                      {announcement.text}
                    </span>
                  )}

                  <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                    {editingId === announcement._id ? (
                      <>
                        <button className="edit-btn" onClick={() => saveEdit(announcement._id)} style={{ background: '#d4edda', color: '#155724' }}>
                          <FaSave />
                        </button>
                        <button className="edit-btn" onClick={() => setEditingId(null)} style={{ background: '#f8d7da', color: '#721c24' }}>
                          <FaTimes />
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="edit-btn" onClick={() => { setEditingId(announcement._id); setEditText(announcement.text); }}>
                          <FaEdit />
                        </button>
                        <button className="edit-btn" onClick={() => deleteAnnouncement(announcement._id)} style={{ background: '#f8d7da', color: '#721c24' }}>
                          <FaTrash />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnnouncementManager
