import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaBox, FaEdit, FaTrash, FaPlus, FaSignOutAlt, FaShoppingCart, FaUsers, FaTag } from 'react-icons/fa'
import { FaRectangleList } from 'react-icons/fa6'
import { productAPI } from '../../services/api'
import { toast } from 'react-hot-toast'
import './Products.css'

const AdminProducts = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'speciality',
    description: '',
    image: '',
    pricingUnit: 'piece',
    rating: 4.5
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const { data } = await productAPI.getProducts()
      setProducts(data)
    } catch (error) {
      toast.error('Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'rating' ? parseFloat(value) : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        await productAPI.updateProduct(editingId, formData)
        toast.success('Product updated successfully')
      } else {
        await productAPI.createProduct(formData)
        toast.success('Product created successfully')
      }
      fetchProducts()
      resetForm()
    } catch (error) {
      toast.error(editingId ? 'Failed to update product' : 'Failed to create product')
    }
  }

  const handleEdit = (product) => {
    setEditingId(product._id)
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      image: product.image,
      pricingUnit: product.pricingUnit || 'piece',
      rating: product.rating
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productAPI.deleteProduct(id)
        toast.success('Product deleted successfully')
        fetchProducts()
      } catch (error) {
        toast.error('Failed to delete product')
      }
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      category: 'speciality',
      description: '',
      image: '',
      pricingUnit: 'piece',
      rating: 4.5
    })
    setEditingId(null)
    setShowForm(false)
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
          <Link to="/admin/products" className="admin-nav-item active"><FaBox /> Products</Link>
          <Link to="/admin/orders" className="admin-nav-item"><FaShoppingCart /> Orders</Link>
          <Link to="/admin/users" className="admin-nav-item"><FaUsers /> Customers</Link>
          <Link to="/admin/deals" className="admin-nav-item"><FaTag /> Deals</Link>
        </nav>
        <button className="admin-logout" onClick={() => navigate('/login')}><FaSignOutAlt /> Logout</button>
      </div>

      <div className="admin-main">
        <header className="admin-header glass">
          <h1>Products Management</h1>
          <div className="admin-user-info">
            <button className="clay-button" onClick={() => setShowForm(!showForm)}>
              <FaPlus /> Add Product
            </button>
          </div>
        </header>

        <div className="admin-content container">
          {showForm && (
            <div className="product-form-container clay-card">
              <div className="form-header">
                <h2>{editingId ? 'Edit Product' : 'Add New Product'}</h2>
                <button className="close-btn" onClick={resetForm}>×</button>
              </div>
              
              <form onSubmit={handleSubmit} className="product-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Product Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter product name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Category *</label>
                    <select name="category" value={formData.category} onChange={handleInputChange}>
                      <option value="speciality">Speciality</option>
                      <option value="cookies">Cookies</option>
                      <option value="biscuits">Biscuits</option>
                      <option value="cupcakes">Cupcakes</option>
                      <option value="cakes">Cakes</option>
                      <option value="brownies">Brownies</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Price (Rs.) *</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="Enter price"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Pricing Unit *</label>
                    <select name="pricingUnit" value={formData.pricingUnit} onChange={handleInputChange}>
                      <option value="piece">Per Piece</option>
                      <option value="kg">Per KG</option>
                      <option value="box">Per Box</option>
                      <option value="dozen">Per Dozen</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Rating</label>
                    <input
                      type="number"
                      name="rating"
                      min="0"
                      max="5"
                      step="0.1"
                      value={formData.rating}
                      onChange={handleInputChange}
                      placeholder="Enter rating (0-5)"
                    />
                  </div>
                  <div className="form-group">
                    <label>Image URL</label>
                    <input
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="Enter image URL"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter product description"
                    rows="4"
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="clay-button">
                    {editingId ? 'Update Product' : 'Create Product'}
                  </button>
                  <button type="button" className="clay-button-secondary" onClick={resetForm}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="products-list clay-card">
            <h2>All Products ({products.length})</h2>
            {loading ? (
              <p>Loading products...</p>
            ) : products.length === 0 ? (
              <p>No products found</p>
            ) : (
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Unit</th>
                      <th>Rating</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product._id}>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>Rs. {product.price?.toLocaleString()}</td>
                        <td>{product.pricingUnit || 'piece'}</td>
                        <td>⭐ {product.rating || 'N/A'}</td>
                        <td className="action-buttons">
                          <button 
                            className="edit-btn"
                            onClick={() => handleEdit(product)}
                            title="Edit product"
                          >
                            <FaEdit /> Edit
                          </button>
                          <button 
                            className="delete-btn"
                            onClick={() => handleDelete(product._id)}
                            title="Delete product"
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

export default AdminProducts
