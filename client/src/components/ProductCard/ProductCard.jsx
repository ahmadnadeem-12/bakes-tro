import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useCart } from '../../context/CartContext'
import './ProductCard.css'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const unitLabels = {
    pc: '/pc',
    kg: '/kg',
    box: '/box',
    dozen: '/dz',
    piece: '/pc'
  };

  const unitLabel = unitLabels[product.pricingUnit] || '';

  return (
    <motion.div 
      className="product-card clay-card"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="product-imageContainer">
        <Link to={`/product/${product._id}`}>
          <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
        </Link>
        <button 
          className="product-wishlistBtn" 
          onClick={() => setIsWishlisted(!isWishlisted)}
          aria-label="Add to wishlist"
        >
          {isWishlisted ? <FaHeart className="wishlist-active" /> : <FaRegHeart />}
        </button>
        {product.discount && (
          <div className="product-discount-badge">-{product.discount}%</div>
        )}
      </div>

      <div className="product-info">
        <Link to={`/product/${product._id}`} className="product-name">
          <h3>{product.name}</h3>
        </Link>
        
        <div className="product-price-row">
          <span className="product-price">Rs. {product.price?.toLocaleString()}</span>
          <span className="product-unit">{unitLabel}</span>
        </div>
        
        {product.description && (
          <p className="product-description">{product.description.substring(0, 70)}...</p>
        )}
        
        <button 
          className="product-addBtn"
          onClick={() => addToCart(product, 1)}
        >
          <FaShoppingCart /> Add to Tray
        </button>
      </div>
    </motion.div>
  )
}

export default ProductCard
