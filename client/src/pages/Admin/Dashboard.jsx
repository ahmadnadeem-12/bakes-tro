import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaThLarge, FaBox, FaShoppingCart, FaUsers, FaChartLine, FaSignOutAlt } from 'react-icons/fa'
import { orderAPI, productAPI } from '../../services/api'
import { toast } from 'react-hot-toast'
import './Dashboard.css'

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: orders } = await orderAPI.getAllOrders();
        const { data: products } = await productAPI.getProducts();
        
        const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);
        
        setStats([
          { title: 'Total Orders', value: orders.length.toString(), icon: <FaShoppingCart />, color: '#8B4513' },
          { title: 'Total Products', value: products.length.toString(), icon: <FaBox />, color: '#D4A574' },
          { title: 'Total Customers', value: [...new Set(orders.map(o => o.shippingDetails.phone))].length.toString(), icon: <FaUsers />, color: '#27ae60' },
          { title: 'Total Revenue', value: `Rs. ${totalRevenue.toLocaleString()}`, icon: <FaChartLine />, color: '#3E1F0D' }
        ]);
        
        setRecentOrders(orders.slice(-5).reverse());
      } catch (error) {
        toast.error('Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
     return <div className="admin-dashboard-loading">Loading Dashboard...</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar glass">
        <div className="admin-logo">
           <img src="/images/logo.png" alt="Bakestro" />
           <h2>Admin</h2>
        </div>
        <nav className="admin-nav">
          <Link to="/admin" className="admin-nav-item active"><FaLayout /> Overview</Link>
          <Link to="/admin/products" className="admin-nav-item"><FaBox /> Products</Link>
          <Link to="/admin/orders" className="admin-nav-item"><FaShoppingCart /> Orders</Link>
          <Link to="/admin/users" className="admin-nav-item"><FaUsers /> Customers</Link>
        </nav>
        <button className="admin-logout" onClick={() => navigate('/login')}><FaSignOutAlt /> Logout</button>
      </div>

      <div className="admin-main">
        <header className="admin-header glass">
           <h1>Dashboard Overview</h1>
           <div className="admin-user-info">
             <span>Welcome, Admin</span>
             <div className="admin-avatar">A</div>
           </div>
        </header>

        <div className="admin-content container">
          <div className="stats-grid">
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-card clay-card" style={{ borderTop: `5px solid ${stat.color}` }}>
                <div className="stat-icon" style={{ color: stat.color }}>{stat.icon}</div>
                <div className="stat-details">
                  <p>{stat.title}</p>
                  <h3>{stat.value}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="recent-orders-section clay-card">
            <div className="section-header">
               <h2>Recent Orders</h2>
               <Link to="/admin/orders" className="clay-button-secondary">View All</Link>
            </div>
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order._id}>
                      <td>{order._id.substring(0, 8)}...</td>
                      <td>{order.shippingDetails.name}</td>
                      <td>Rs. {order.totalPrice.toLocaleString()}</td>
                      <td><span className={`status-badge ${order.status.toLowerCase()}`}>{order.status}</span></td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td><button className="edit-btn">View</button></td>
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

export default AdminDashboard
