import React from 'react'
import { Link } from 'react-router-dom'
import { FaTrash, FaPlus, FaMinus, FaChevronLeft, FaShoppingBag } from 'react-icons/fa'
import { useCart } from '../../context/CartContext'
import './Cart.css'

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();

  const subtotal = getCartTotal();
  const deliveryFee = 150;
  const total = subtotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="container empty-cart">
        <FaShoppingBag className="empty-icon" />
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="clay-button">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="cart-page container">
      <h1 className="cart-title">Your Shopping Cart</h1>
      
      <div className="cart-grid">
        <div className="cart-items-section">
          {cartItems.map(item => (
            <div key={item._id} className="cart-item clay-card fade-in">
              <img src={item.image} alt={item.name} className="cart-item-img" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p className="cart-item-price">Rs. {item.price.toLocaleString()}</p>
                <div className="cart-item-actions">
                  <div className="quantity-selector clay-card">
                    <button onClick={() => updateQuantity(item._id, item.quantity - 1)}><FaMinus /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id, item.quantity + 1)}><FaPlus /></button>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item._id)}>
                    <FaTrash /> Remove
                  </button>
                </div>
              </div>
              <div className="cart-item-total">
                Rs. {(item.price * item.quantity).toLocaleString()}
              </div>
            </div>
          ))}
          
          <Link to="/" className="back-link"><FaChevronLeft /> Continue Shopping</Link>
        </div>

        <div className="cart-summary-section">
          <div className="summary-card clay-card">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>Rs. {subtotal.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>Rs. {deliveryFee.toLocaleString()}</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total">
              <span>Total Payment</span>
              <span>Rs. {total.toLocaleString()}</span>
            </div>
            
            <Link to="/checkout" className="clay-button checkout-btn">Proceed to Checkout</Link>
            
            <p className="delivery-note">Estimated Delivery: 45-60 mins in FSD</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
