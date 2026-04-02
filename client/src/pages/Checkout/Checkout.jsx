import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaChevronLeft, FaCheckCircle } from 'react-icons/fa'
import { orderAPI } from '../../services/api'
import { useCart } from '../../context/CartContext'
import { toast } from 'react-hot-toast'
import './Checkout.css'

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [isOrdered, setIsOrdered] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'Faisalabad',
    note: ''
  });

  const subtotal = getCartTotal();
  const deliveryFee = 150;
  const total = subtotal + deliveryFee;

  const handleOrder = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        items: cartItems.map(item => ({
          product: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        totalPrice: total,
        shippingDetails: formData
      };

      await orderAPI.createOrder(orderData);
      setIsOrdered(true);
      clearCart();
      toast.success('Order Placed Successfully!');
      
      setTimeout(() => {
        navigate('/');
      }, 4000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order. Please login.');
    }
  };

  if (isOrdered) {
    return (
      <div className="container order-success">
        <FaCheckCircle className="success-icon" />
        <h1>Order Placed Successfully!</h1>
        <p>Your delicious treats are being prepared. Order ID: #BKS-9921</p>
        <div className="order-details-box clay-card">
           <p><strong>Name:</strong> {formData.name}</p>
           <p><strong>Phone:</strong> {formData.phone}</p>
           <p><strong>Total:</strong> Rs. {total.toLocaleString()}</p>
        </div>
        <p>Redirecting you back to home...</p>
      </div>
    );
  }

  return (
    <div className="checkout-page container">
      <Link to="/cart" className="back-link"><FaChevronLeft /> Back to Cart</Link>
      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-grid">
        <div className="checkout-form-section">
          <form className="checkout-form clay-card" onSubmit={handleOrder}>
            <h2>Shipping Details</h2>
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                placeholder="Enter your name" 
                required 
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input 
                type="tel" 
                placeholder="03xx-xxxxxxx" 
                required 
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Delivery Address</label>
              <textarea 
                rows="3" 
                placeholder="Street address, apartment, etc." 
                required
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              ></textarea>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input type="text" value="Faisalabad" readOnly />
              </div>
              <div className="form-group">
                <label>Payment Method</label>
                <input type="text" value="Cash on Delivery" readOnly />
              </div>
            </div>
            <div className="form-group">
              <label>Order Note (Optional)</label>
              <textarea rows="2" placeholder="Special instructions for delivery"></textarea>
            </div>
            <button type="submit" className="clay-button checkout-submit">Place Order (Rs. {total.toLocaleString()})</button>
          </form>
        </div>

        <div className="checkout-summary-section">
          <div className="order-summary-card clay-card">
            <h2>Your Order</h2>
            <div className="order-items-mini">
               <div className="mini-item">
                  <span>Premium Nan Khatai (x1)</span>
                  <span>Rs. 1,400</span>
               </div>
               <div className="mini-item">
                  <span>Assorted Biscuits (x1)</span>
                  <span>Rs. 500</span>
               </div>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>Rs. {subtotal.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span>Rs. {deliveryFee.toLocaleString()}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>Rs. {total.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="trust-badge clay-card">
             <p>✨ Handcrafted with love in FSD</p>
             <p>🚚 Fast Delivery Guaranteed</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
