import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaBox, FaShoppingCart, FaSignOutAlt, FaBullhorn, FaImages, FaPlus, FaTrash, FaEdit, FaSave, FaTimes } from 'react-icons/fa'
import { FaRectangleList } from 'react-icons/fa6'
import { categoryAPI } from '../../services/api'
import { toast } from 'react-hot-toast'
import '../Admin/Dashboard.css'

const CategoriesManager = () => {
  const [categories, setCategories] = useState([
    { _id: '1', name: 'Nankhatai', slug: 'nankhatai', icon: '🍪', sortOrder: 1, isActive: true },
    { _id: '2', name: 'Cookies', slug: 'cookies', icon: '🍪', sortOrder: 2, isActive: true },
    { _id: '3', name: 'Biscuits', slug: 'biscuits', icon: '🫓', sortOrder: 3, isActive: true },
    { _id: '4', name: 'Cupcakes', slug: 'cupcakes', icon: '🧁', sortOrder: 4, isActive: true },
    { _id: '5', name: 'Cakes', slug: 'cakes', icon: '🎂', sortOrder: 5, isActive: true },
    { _id: '6', name: 'Brownies', slug: 'brownies', icon: '🍫', sortOrder: 6, isActive: true },
    { _id: '7', name: 'Donuts', slug: 'donuts', icon: '🍩', sortOrder: 7, isActive: true },
    { _id: '8', name: 'Speciality', slug: 'speciality', icon: '⭐', sortOrder: 8, isActive: true },
  ]);

  const [newCat, setNewCat] = useState({ name: '', slug: '', icon: '🍰' });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await categoryAPI.getCategories();
        if (data && data.length > 0) setCategories(data);
      } catch (error) {
        console.log('Using default categories');
      }
    };
    fetchCategories();
  }, []);

  const addCategory = async () => {
    if (!newCat.name) return toast.error('Category name is required');
    const slug = newCat.slug || newCat.name.toLowerCase().replace(/\s+/g, '-');
    try {
      const { data } = await categoryAPI.createCategory({ ...newCat, slug });
      setCategories(prev => [...prev, data]);
    } catch (error) {
      setCategories(prev => [...prev, { _id: Date.now().toString(), ...newCat, slug, sortOrder: prev.length + 1, isActive: true }]);
    }
    setNewCat({ name: '', slug: '', icon: '🍰' });
    toast.success('Category added!');
  };

  const deleteCategory = async (id) => {
    try { await categoryAPI.deleteCategory(id); } catch (e) {}
    setCategories(prev => prev.filter(c => c._id !== id));
    toast.success('Category deleted');
  };

  const saveEdit = async () => {
    try { await categoryAPI.updateCategory(editingId, editData); } catch (e) {}
    setCategories(prev => prev.map(c => c._id === editingId ? { ...c, ...editData } : c));
    setEditingId(null);
    toast.success('Category updated');
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
          <Link to="/admin/categories" className="admin-nav-item active"><FaRectangleList /> Categories</Link>
          <Link to="/admin/announcements" className="admin-nav-item"><FaBullhorn /> Announcements</Link>
          <Link to="/admin/carousel" className="admin-nav-item"><FaImages /> Carousel</Link>
        </nav>
        <button className="admin-logout" onClick={() => window.location.href = '/login'}><FaSignOutAlt /> Logout</button>
      </div>

      <div className="admin-main">
        <header className="admin-header">
          <h1>Categories Manager</h1>
          <div className="admin-user-info">
            <span>Welcome, Admin</span>
            <div className="admin-avatar">A</div>
          </div>
        </header>

        <div className="admin-content">
          <div className="clay-card" style={{ padding: '24px' }}>
            <h3 style={{ marginBottom: '16px', fontFamily: 'Outfit' }}>Add New Category</h3>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <input type="text" value={newCat.icon} onChange={e => setNewCat({...newCat, icon: e.target.value})} placeholder="Icon emoji" style={{ width: '70px', padding: '12px', borderRadius: '12px', border: '2px solid #f0e6db', fontSize: '1.2rem', textAlign: 'center' }} />
              <input type="text" value={newCat.name} onChange={e => setNewCat({...newCat, name: e.target.value})} placeholder="Category Name" style={{ flex: 1, minWidth: '150px', padding: '12px 16px', borderRadius: '12px', border: '2px solid #f0e6db', fontSize: '0.95rem' }} />
              <input type="text" value={newCat.slug} onChange={e => setNewCat({...newCat, slug: e.target.value})} placeholder="slug (auto-generated)" style={{ flex: 1, minWidth: '150px', padding: '12px 16px', borderRadius: '12px', border: '2px solid #f0e6db', fontSize: '0.95rem' }} />
              <button className="clay-button" onClick={addCategory}><FaPlus /> Add</button>
            </div>
          </div>

          <div className="clay-card" style={{ padding: '24px' }}>
            <h3 style={{ marginBottom: '16px', fontFamily: 'Outfit' }}>Current Categories ({categories.length})</h3>
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Icon</th>
                    <th>Name</th>
                    <th>Slug</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map(cat => (
                    <tr key={cat._id}>
                      <td style={{ fontSize: '1.5rem' }}>
                        {editingId === cat._id ? (
                          <input value={editData.icon} onChange={e => setEditData({...editData, icon: e.target.value})} style={{ width: '50px', padding: '4px', textAlign: 'center', fontSize: '1.2rem', borderRadius: '8px', border: '2px solid var(--secondary)' }} />
                        ) : cat.icon}
                      </td>
                      <td>
                        {editingId === cat._id ? (
                          <input value={editData.name} onChange={e => setEditData({...editData, name: e.target.value})} style={{ padding: '6px 10px', borderRadius: '8px', border: '2px solid var(--secondary)', fontSize: '0.9rem' }} />
                        ) : <strong>{cat.name}</strong>}
                      </td>
                      <td style={{ fontFamily: 'monospace', color: 'var(--text-muted)' }}>/{cat.slug}</td>
                      <td><span className={`status-badge ${cat.isActive ? 'delivered' : 'cancelled'}`}>{cat.isActive ? 'Active' : 'Inactive'}</span></td>
                      <td>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          {editingId === cat._id ? (
                            <>
                              <button className="edit-btn" onClick={saveEdit} style={{ background: '#d4edda', color: '#155724' }}><FaSave /></button>
                              <button className="edit-btn" onClick={() => setEditingId(null)} style={{ background: '#f8d7da', color: '#721c24' }}><FaTimes /></button>
                            </>
                          ) : (
                            <>
                              <button className="edit-btn" onClick={() => { setEditingId(cat._id); setEditData({ name: cat.name, icon: cat.icon }); }}><FaEdit /></button>
                              <button className="edit-btn" onClick={() => deleteCategory(cat._id)} style={{ background: '#f8d7da', color: '#721c24' }}><FaTrash /></button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoriesManager
