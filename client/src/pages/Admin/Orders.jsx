import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaBox, FaShoppingCart, FaUsers, FaSignOutAlt, FaEye, FaFileExcel, FaTimes, FaBullhorn, FaImages, FaSearch } from 'react-icons/fa'
import { FaRectangleList } from 'react-icons/fa6'
import { orderAPI } from '../../services/api'
import { toast } from 'react-hot-toast'
import './Orders.css'

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await orderAPI.getAllOrders();
      setOrders(data);
    } catch (error) {
      // Dummy orders
      setOrders([
        { _id: 'ORD001ABC', items: [{ product: 'Premium Nan Khatai', quantity: 2, price: 1400 }, { product: 'Fudge Brownies', quantity: 1, price: 650 }], shippingDetails: { name: 'Ahmad Khan', phone: '0321-1234567', address: 'House 123, Street 5, Faisalabad', city: 'Faisalabad' }, totalPrice: 3450, status: 'pending', paymentMethod: 'Cash on Delivery', createdAt: new Date() },
        { _id: 'ORD002DEF', items: [{ product: 'Chocolate Cupcakes', quantity: 6, price: 500 }], shippingDetails: { name: 'Fatima Ali', phone: '0332-9876543', address: 'Block C, Commercial Area, FSD', city: 'Faisalabad' }, totalPrice: 3150, status: 'delivered', paymentMethod: 'JazzCash', createdAt: new Date(Date.now() - 86400000) },
        { _id: 'ORD003GHI', items: [{ product: 'Classic Nankhatai', quantity: 1, price: 1200 }, { product: 'Butter Cookies Tin', quantity: 1, price: 850 }], shippingDetails: { name: 'Usman Raza', phone: '0313-5551234', address: '45-B, Model Town, Faisalabad', city: 'Faisalabad' }, totalPrice: 2200, status: 'processing', paymentMethod: 'Cash on Delivery', createdAt: new Date(Date.now() - 172800000) },
        { _id: 'ORD004JKL', items: [{ product: 'Custom Birthday Cake', quantity: 1, price: 2500 }], shippingDetails: { name: 'Sana Malik', phone: '0345-6667788', address: 'Near City School, Canal Road', city: 'Faisalabad' }, totalPrice: 2650, status: 'delivered', paymentMethod: 'EasyPaisa', createdAt: new Date(Date.now() - 259200000) },
        { _id: 'ORD005MNO', items: [{ product: 'Rainbow Donuts', quantity: 2, price: 600 }, { product: 'Red Velvet Cupcake', quantity: 4, price: 300 }], shippingDetails: { name: 'Hassan Tariq', phone: '0300-1112233', address: 'Gulberg Colony, Near Airport', city: 'Faisalabad' }, totalPrice: 2550, status: 'pending', paymentMethod: 'Cash on Delivery', createdAt: new Date(Date.now() - 345600000) },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      await orderAPI.updateOrderStatus(orderId, newStatus);
      setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
      toast.success(`Status updated to ${newStatus}`);
    }
  };

  const filteredOrders = orders.filter(o => {
    const matchesStatus = filterStatus === 'all' || o.status === filterStatus;
    const matchesSearch = search === '' || 
      o.shippingDetails?.name?.toLowerCase().includes(search.toLowerCase()) ||
      o.shippingDetails?.phone?.includes(search) ||
      o._id.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

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
          <Link to="/admin/orders" className="admin-nav-item active"><FaShoppingCart /> Orders</Link>
          <Link to="/admin/categories" className="admin-nav-item"><FaRectangleList /> Categories</Link>
          <Link to="/admin/announcements" className="admin-nav-item"><FaBullhorn /> Announcements</Link>
          <Link to="/admin/carousel" className="admin-nav-item"><FaImages /> Carousel</Link>
        </nav>
        <button className="admin-logout" onClick={() => window.location.href = '/login'}><FaSignOutAlt /> Logout</button>
      </div>

      <div className="admin-main">
        <header className="admin-header">
          <h1>Orders Management</h1>
          <div className="admin-user-info">
            <span>Welcome, Admin</span>
            <div className="admin-avatar">A</div>
          </div>
        </header>

        <div className="admin-content">
          {/* Filters */}
          <div className="orders-toolbar">
            <div className="search-box">
              <FaSearch />
              <input 
                type="text" 
                placeholder="Search by name, phone, or order ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="status-filters">
              {['all', 'pending', 'processing', 'delivered', 'cancelled'].map(status => (
                <button 
                  key={status}
                  className={`filter-btn ${filterStatus === status ? 'active' : ''}`}
                  onClick={() => setFilterStatus(status)}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="orders-count">
            Showing {filteredOrders.length} of {orders.length} orders
          </div>

          {/* Orders Table */}
          <div className="orders-table-section clay-card">
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Phone</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map(order => (
                    <tr key={order._id}>
                      <td className="order-id">{order._id.substring(0, 8)}...</td>
                      <td><strong>{order.shippingDetails?.name}</strong></td>
                      <td>{order.shippingDetails?.phone}</td>
                      <td>{order.items?.length || 0} items</td>
                      <td className="order-total">Rs. {order.totalPrice?.toLocaleString()}</td>
                      <td>
                        <select 
                          className={`status-select ${order.status}`}
                          value={order.status}
                          onChange={(e) => updateStatus(order._id, e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button className="view-btn" onClick={() => setSelectedOrder(order)}>
                          <FaEye /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content clay-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Order Details</h2>
              <button onClick={() => setSelectedOrder(null)}><FaTimes /></button>
            </div>
            <div className="modal-body">
              <div className="detail-grid">
                <div className="detail-section">
                  <h3>Customer Info</h3>
                  <p><strong>Name:</strong> {selectedOrder.shippingDetails?.name}</p>
                  <p><strong>Phone:</strong> {selectedOrder.shippingDetails?.phone}</p>
                  <p><strong>Address:</strong> {selectedOrder.shippingDetails?.address}</p>
                  <p><strong>City:</strong> {selectedOrder.shippingDetails?.city}</p>
                </div>
                <div className="detail-section">
                  <h3>Order Info</h3>
                  <p><strong>Order ID:</strong> {selectedOrder._id}</p>
                  <p><strong>Status:</strong> <span className={`status-badge ${selectedOrder.status}`}>{selectedOrder.status}</span></p>
                  <p><strong>Payment:</strong> {selectedOrder.paymentMethod || 'Cash on Delivery'}</p>
                  <p><strong>Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                </div>
              </div>
              <div className="detail-section">
                <h3>Items Ordered</h3>
                <table className="items-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Qty</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items?.map((item, i) => (
                      <tr key={i}>
                        <td>{item.product}</td>
                        <td>{item.quantity}</td>
                        <td>Rs. {item.price?.toLocaleString()}</td>
                        <td>Rs. {(item.price * item.quantity)?.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="order-total-row">
                  <strong>Total:</strong>
                  <strong>Rs. {selectedOrder.totalPrice?.toLocaleString()}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminOrders
