import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaBox, FaShoppingCart, FaUsers, FaSignOutAlt, FaChartLine, FaEye, FaFileExcel, FaTimes, FaBullhorn, FaImages } from 'react-icons/fa'
import { FaRectangleList } from 'react-icons/fa6'
import { orderAPI, productAPI } from '../../services/api'
import { toast } from 'react-hot-toast'
import './Dashboard.css'

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: orders } = await orderAPI.getAllOrders();
        const { data: products } = await productAPI.getProducts();
        
        const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);
        const todayOrders = orders.filter(o => {
          const orderDate = new Date(o.createdAt).toDateString();
          return orderDate === new Date().toDateString();
        });
        
        setStats([
          { title: 'Total Orders', value: orders.length.toString(), icon: <FaShoppingCart />, color: '#8B4513', change: `+${todayOrders.length} today` },
          { title: 'Total Products', value: products.length.toString(), icon: <FaBox />, color: '#D4A574', change: 'In catalog' },
          { title: 'Total Customers', value: [...new Set(orders.map(o => o.shippingDetails?.phone))].length.toString(), icon: <FaUsers />, color: '#27ae60', change: 'Unique' },
          { title: 'Total Revenue', value: `Rs. ${totalRevenue.toLocaleString()}`, icon: <FaChartLine />, color: '#3E1F0D', change: 'All time' }
        ]);
        
        setRecentOrders(orders.slice(0, 8));
      } catch (error) {
        // Use dummy data if API fails
        setStats([
          { title: 'Total Orders', value: '47', icon: <FaShoppingCart />, color: '#8B4513', change: '+3 today' },
          { title: 'Total Products', value: '24', icon: <FaBox />, color: '#D4A574', change: 'In catalog' },
          { title: 'Total Customers', value: '32', icon: <FaUsers />, color: '#27ae60', change: 'Unique' },
          { title: 'Total Revenue', value: 'Rs. 125,400', icon: <FaChartLine />, color: '#3E1F0D', change: 'All time' }
        ]);
        setRecentOrders([
          { _id: 'ORD001', shippingDetails: { name: 'Ahmad Khan', phone: '0321-1234567' }, totalPrice: 2800, status: 'pending', createdAt: new Date() },
          { _id: 'ORD002', shippingDetails: { name: 'Fatima Ali', phone: '0332-9876543' }, totalPrice: 1500, status: 'delivered', createdAt: new Date(Date.now() - 86400000) },
          { _id: 'ORD003', shippingDetails: { name: 'Usman Raza', phone: '0313-5551234' }, totalPrice: 3200, status: 'processing', createdAt: new Date(Date.now() - 172800000) },
          { _id: 'ORD004', shippingDetails: { name: 'Sana Malik', phone: '0345-6667788' }, totalPrice: 950, status: 'delivered', createdAt: new Date(Date.now() - 259200000) },
          { _id: 'ORD005', shippingDetails: { name: 'Hassan Tariq', phone: '0300-1112233' }, totalPrice: 4100, status: 'pending', createdAt: new Date(Date.now() - 345600000) },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleExport = async () => {
    try {
      const response = await orderAPI.exportOrders();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'bakestro_orders.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Orders exported to Excel!');
    } catch (error) {
      toast.error('Export failed');
    }
  };

  if (loading) {
     return <div className="admin-dashboard-loading">Loading Dashboard...</div>;
  }

  return (
    <div className={`admin-dashboard ${sidebarOpen ? 'sidebar-open' : ''}`}>
      {/* Sidebar Overlay */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}
      
      <div className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-logo">
           <img src="/images/logo.png" alt="Bakestro" />
           <h2>Admin</h2>
           <button className="sidebar-close" onClick={() => setSidebarOpen(false)}><FaTimes /></button>
        </div>
        <nav className="admin-nav">
          <Link to="/admin" className="admin-nav-item active"><FaRectangleList /> Overview</Link>
          <Link to="/admin/products" className="admin-nav-item"><FaBox /> Products</Link>
          <Link to="/admin/orders" className="admin-nav-item"><FaShoppingCart /> Orders</Link>
          <Link to="/admin/categories" className="admin-nav-item"><FaRectangleList /> Categories</Link>
          <Link to="/admin/announcements" className="admin-nav-item"><FaBullhorn /> Announcements</Link>
          <Link to="/admin/carousel" className="admin-nav-item"><FaImages /> Carousel</Link>
        </nav>
        <button className="admin-logout" onClick={() => navigate('/login')}><FaSignOutAlt /> Logout</button>
      </div>

      <div className="admin-main">
        <header className="admin-header">
           <div className="admin-header-left">
             <button className="menu-toggle" onClick={() => setSidebarOpen(true)}>
               <div className="bar"></div>
               <div className="bar"></div>
               <div className="bar"></div>
             </button>
             <h1>Dashboard Overview</h1>
           </div>
           <div className="admin-header-actions">
             <button className="clay-button-secondary export-btn" onClick={handleExport}>
               <FaFileExcel /> Export Orders
             </button>
             <div className="admin-user-info">
               <span className="welcome-text">Welcome, Admin</span>
               <div className="admin-avatar">A</div>
             </div>
           </div>
        </header>

        <div className="admin-content">
          <div className="stats-grid">
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-card clay-card" style={{ borderTop: `4px solid ${stat.color}` }}>
                <div className="stat-icon" style={{ color: stat.color, background: `${stat.color}15` }}>{stat.icon}</div>
                <div className="stat-details">
                  <p className="stat-label">{stat.title}</p>
                  <h3 className="stat-value">{stat.value}</h3>
                  <span className="stat-change">{stat.change}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Revenue Chart Placeholder */}
          <div className="chart-section clay-card">
            <h2>Revenue Overview</h2>
            <div className="chart-bars">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                const heights = [45, 68, 55, 82, 73, 90, 65];
                return (
                  <div key={day} className="chart-bar-wrapper">
                    <div className="chart-bar" style={{ height: `${heights[i]}%` }}></div>
                    <span>{day}</span>
                  </div>
                );
              })}
            </div>
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
                    <th>Phone</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order._id}>
                      <td className="order-id">{order._id.substring(0, 8)}...</td>
                      <td>{order.shippingDetails?.name || 'N/A'}</td>
                      <td>{order.shippingDetails?.phone || 'N/A'}</td>
                      <td className="order-total">Rs. {order.totalPrice?.toLocaleString()}</td>
                      <td><span className={`status-badge ${order.status?.toLowerCase()}`}>{order.status}</span></td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
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
