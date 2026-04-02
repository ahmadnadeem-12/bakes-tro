import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useCart } from '../../context/CartContext'
import './ProductCard.css'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <motion.div 
      className="product-card clay-card"
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="product-imageContainer">
        <img src={product.image} alt={product.name} className="product-image" />
        <button 
          className="product-wishlistBtn" 
          onClick={() => setIsWishlisted(!isWishlisted)}
        >
          {isWishlisted ? <FaHeart className="wishlist-active" /> : <FaRegHeart />}
        </button>
      </div>

      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <Link to={`/product/${product._id}`} className="product-name">
          <h3>{product.name}</h3>
        </Link>
        <div className="product-price">Rs. {product.price.toLocaleString()}</div>
        
        <button 
          className="product-addBtn clay-button"
          onClick={() => addToCart(product, 1)}
        >
          <FaShoppingCart /> Add to Cart
        </button>
      </div>
    </motion.div>
  )
}

export default ProductCard
