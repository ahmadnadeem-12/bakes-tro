import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaTag, FaEdit, FaTrash, FaPlus, FaSignOutAlt, FaRectangleList, FaShoppingCart, FaUsers, FaBox } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import './Deals.css'

const AdminDeals = () => {
  const navigate = useNavigate()
  const [deals, setDeals] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    productId: '',
    discountPercentage: '',
    discountPrice: '',
    isActive: true
  })

  useEffect(() => {
    fetchDeals()
    fetchProducts()
  }, [])

  const fetchDeals = async () => {
    try {
      // Mock data for deals
      const mockDeals = [
        {
          _id: '1',
          productId: '1',
          productName: 'Premium Nan Khatai - Badam',
          originalPrice: 1400,
          discountPercentage: 25,
          discountPrice: 1050,
          isActive: true
        },
        {
          _id: '2',
          productId: '4',
          productName: 'Chocolate Party Cupcakes',
          originalPrice: 500,
          discountPercentage: 25,
          discountPrice: 375,
          isActive: true
        }
      ]
      setDeals(mockDeals)
    } catch (error) {
      toast.error('Failed to fetch deals')
    } finally {
      setLoading(false)
    }
  }

  const fetchProducts = async () => {
    try {
      // Mock products
      const mockProducts = [
        { _id: '1', name: 'Premium Nan Khatai - Badam', price: 1400 },
        { _id: '2', name: 'Classic Nan Khatai - Pista', price: 1300 },
        { _id: '3', name: 'Assorted Biscuits Box', price: 500 },
        { _id: '4', name: 'Chocolate Party Cupcakes', price: 500 },
        { _id: '5', name: 'Vanilla Donuts - QT 6', price: 600 }
      ]
      setProducts(mockProducts)
    } catch (error) {
      toast.error('Failed to fetch products')
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (name === 'productId') {
      const product = products.find(p => p._id === value)
      setFormData(prev => ({
        ...prev,
        productId: value,
        originalPrice: product?.price || ''
      }))
    } else if (name === 'discountPercentage') {
      const discountValue = parseFloat(value)
      const originalPrice = formData.originalPrice || 0
      const discountPrice = originalPrice - (originalPrice * discountValue / 100)
      setFormData(prev => ({
        ...prev,
        discountPercentage: discountValue,
        discountPrice: parseFloat(discountPrice.toFixed(2))
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!formData.productId || !formData.discountPercentage) {
        toast.error('Please fill all required fields')
        return
      }

      // Simulate API call
      if (editingId) {
        toast.success('Deal updated successfully')
      } else {
        toast.success('Deal created successfully')
      }
      fetchDeals()
      resetForm()
    } catch (error) {
      toast.error(editingId ? 'Failed to update deal' : 'Failed to create deal')
    }
  }

  const handleEdit = (deal) => {
    setEditingId(deal._id)
    setFormData({
      productId: deal.productId,
      discountPercentage: deal.discountPercentage,
      discountPrice: deal.discountPrice,
      isActive: deal.isActive,
      originalPrice: deal.originalPrice
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      try {
        toast.success('Deal deleted successfully')
        fetchDeals()
      } catch (error) {
        toast.error('Failed to delete deal')
      }
    }
  }

  const resetForm = () => {
    setFormData({
      productId: '',
      discountPercentage: '',
      discountPrice: '',
      isActive: true
    })
    setEditingId(null)
    setShowForm(false)
  }

  const getProductName = (productId) => {
    const product = products.find(p => p._id === productId)
    return product?.name || 'Unknown Product'
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar glass">
        <div className="admin-logo">
          <img src="/images/logo.png" alt="Bakestro" />
          <h2>Admin</h2>
        </div>
        <nav className="admin-nav">
          <Link to="/admin" className="admin-nav-item"><FaRectangleList /> Overview</Link>
          <Link to="/admin/products" className="admin-nav-item"><FaBox /> Products</Link>
          <Link to="/admin/orders" className="admin-nav-item"><FaShoppingCart /> Orders</Link>
          <Link to="/admin/users" className="admin-nav-item"><FaUsers /> Customers</Link>
          <Link to="/admin/deals" className="admin-nav-item active"><FaTag /> Deals</Link>
        </nav>
        <button className="admin-logout" onClick={() => navigate('/login')}><FaSignOutAlt /> Logout</button>
      </div>

      <div className="admin-main">
        <header className="admin-header glass">
          <h1>Deals Management</h1>
          <div className="admin-user-info">
            <button className="clay-button" onClick={() => setShowForm(!showForm)}>
              <FaPlus /> Create Deal
            </button>
          </div>
        </header>

        <div className="admin-content container">
          {showForm && (
            <div className="deal-form-container clay-card">
              <div className="form-header">
                <h2>{editingId ? 'Edit Deal' : 'Create New Deal'}</h2>
                <button className="close-btn" onClick={resetForm}>×</button>
              </div>
              
              <form onSubmit={handleSubmit} className="deal-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Select Product *</label>
                    <select 
                      name="productId" 
                      value={formData.productId} 
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Choose a product...</option>
                      {products.map(product => (
                        <option key={product._id} value={product._id}>
                          {product.name} (Rs. {product.price})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Discount Percentage (%) *</label>
                    <input
                      type="number"
                      name="discountPercentage"
                      value={formData.discountPercentage}
                      onChange={handleInputChange}
                      min="0"
                      max="100"
                      step="1"
                      placeholder="e.g., 25"
                      required
                    />
                    <small className="hint-text">
                      Discount price will be calculated automatically
                    </small>
                  </div>
                  <div className="form-group">
                    <label>Discount Price (Rs.)</label>
                    <input
                      type="number"
                      name="discountPrice"
                      value={formData.discountPrice}
                      onChange={handleInputChange}
                      placeholder="Auto-calculated"
                      readOnly
                      style={{ backgroundColor: '#f5f5f5' }}
                    />
                  </div>
                </div>

                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                    />
                    <span>Active (Show on website)</span>
                  </label>
                </div>

                {formData.originalPrice && (
                  <div className="price-preview">
                    <h4>Price Summary</h4>
                    <div className="price-row">
                      <span>Original Price:</span>
                      <strong>Rs. {formData.originalPrice?.toLocaleString()}</strong>
                    </div>
                    <div className="price-row">
                      <span>Discount ({formData.discountPercentage}%):</span>
                      <strong>-Rs. {(formData.originalPrice * formData.discountPercentage / 100).toFixed(2)}</strong>
                    </div>
                    <div className="price-row final">
                      <span>Final Price:</span>
                      <strong>Rs. {formData.discountPrice?.toLocaleString()}</strong>
                    </div>
                  </div>
                )}

                <div className="form-actions">
                  <button type="submit" className="clay-button">
                    {editingId ? 'Update Deal' : 'Create Deal'}
                  </button>
                  <button type="button" className="clay-button-secondary" onClick={resetForm}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="deals-list clay-card">
            <h2>Active Deals ({deals.filter(d => d.isActive).length})</h2>
            {loading ? (
              <p>Loading deals...</p>
            ) : deals.length === 0 ? (
              <p className="no-data">No deals found. Create one to get started!</p>
            ) : (
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Original Price</th>
                      <th>Discount %</th>
                      <th>Discount Price</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deals.map(deal => (
                      <tr key={deal._id}>
                        <td className="product-name">{deal.productName}</td>
                        <td>Rs. {deal.originalPrice?.toLocaleString()}</td>
                        <td className="discount-badge">
                          <span className="badge">{deal.discountPercentage}% OFF</span>
                        </td>
                        <td className="discount-price">
                          <strong>Rs. {deal.discountPrice?.toLocaleString()}</strong>
                        </td>
                        <td>
                          <span className={`status-badge ${deal.isActive ? 'active' : 'inactive'}`}>
                            {deal.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="action-buttons">
                          <button 
                            className="edit-btn"
                            onClick={() => handleEdit(deal)}
                          >
                            <FaEdit /> Edit
                          </button>
                          <button 
                            className="delete-btn"
                            onClick={() => handleDelete(deal._id)}
                          >
                            <FaTrash /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDeals
