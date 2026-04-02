import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaHeart, FaRegHeart, FaShoppingCart, FaChevronLeft, FaPlus, FaMinus } from 'react-icons/fa'
import { productAPI } from '../../services/api'
import { useCart } from '../../context/CartContext'
import './ProductDetail.css'

const ProductDetail = () => {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await productAPI.getProductById(id)
        setProduct(data)
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
    window.scrollTo(0, 0)
  }, [id])

  if (!product) return <div className="container" style={{padding: '100px 0'}}><h2>Product not found</h2></div>

  const handleQuantity = (type) => {
    if (type === 'plus') setQuantity(quantity + 1)
    else if (type === 'minus' && quantity > 1) setQuantity(quantity - 1)
  }

  return (
    <div className="product-detail container">
      <Link to="/" className="back-btn"><FaChevronLeft /> Back to Shop</Link>
      
      <div className="detail-grid">
        {/* Image Section */}
        <motion.div 
          className="detail-gallery"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="main-image-container clay-card">
            <img src={product.image} alt={product.name} className="main-image" />
          </div>
          <div className="thumbnail-list">
             <div className="thumbnail active clay-card"><img src={product.image} alt="thumbnail" /></div>
             <div className="thumbnail clay-card"><img src="/images/Packaging.png" alt="thumbnail" /></div>
          </div>
        </motion.div>

        {/* Info Section */}
        <motion.div 
          className="detail-info"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span className="info-category">{product.category}</span>
          <h1 className="info-name">{product.name}</h1>
          
          <div className="info-rating">
            <span className="rating-stars">★★★★★</span>
            <span className="rating-count">(48 Customer Reviews)</span>
          </div>

          <div className="info-price">Rs. {product.price.toLocaleString()}</div>
          
          <p className="info-description">{product.description}</p>
          
          <div className="info-actions">
            <div className="quantity-selector clay-card">
              <button onClick={() => handleQuantity('minus')}><FaMinus /></button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantity('plus')}><FaPlus /></button>
            </div>
            
            <button className="wishlist-btn clay-card" onClick={() => setIsWishlisted(!isWishlisted)}>
              {isWishlisted ? <FaHeart className="wishlist-active" /> : <FaRegHeart />}
            </button>
          </div>

          <div className="info-buttons">
            <button className="clay-button buy-now-btn" onClick={() => { addToCart(product, quantity); navigate('/checkout'); }}>Buy Now</button>
            <button className="clay-button-secondary add-cart-btn" onClick={() => addToCart(product, quantity)}><FaShoppingCart /> Add to Cart</button>
          </div>

          <div className="info-meta">
            <p><strong>Availability:</strong> <span className="status-in-stock">In Stock</span></p>
            <p><strong>Shipping:</strong> Free Delivery in FSD</p>
            <p><strong>Category:</strong> {product.category}, Traditional, Homemade</p>
          </div>
        </motion.div>
      </div>
      
      {/* Tab Section */}
      <section className="detail-tabs clay-card">
        <div className="tabs-header">
           <span className="tab-item active">Description</span>
           <span className="tab-item">Additional Info</span>
           <span className="tab-item">Reviews (48)</span>
        </div>
        <div className="tabs-content">
          <p>Our {product.name} is a testament to the rich culinary traditions of Faisalabad. Every piece is handcrafted by our master bakers using the finest ingredients - premium quality flour, fresh village butter, and selected nuts. Whether it's for a festive occasion or a simple tea-time treat, this {product.category} item brings warmth and sweetness to every moment.</p>
        </div>
      </section>
    </div>
  )
}

export default ProductDetail
