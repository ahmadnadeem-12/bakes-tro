const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');
const Order = require('../models/Order');

const exportOrdersToExcel = async () => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });

    const data = orders.map((order, index) => ({
      'Sr No': index + 1,
      'Order ID': order._id.toString(),
      'Customer Name': order.shippingDetails?.name || 'N/A',
      'Phone': order.shippingDetails?.phone || 'N/A',
      'Address': order.shippingDetails?.address || 'N/A',
      'City': order.shippingDetails?.city || 'Faisalabad',
      'Products': order.items?.map(i => `${i.product} (x${i.quantity})`).join(', ') || 'N/A',
      'Total Price': `Rs. ${order.totalPrice}`,
      'Status': order.status,
      'Payment': order.paymentMethod || 'Cash on Delivery',
      'Date': new Date(order.createdAt).toLocaleDateString('en-PK'),
      'Time': new Date(order.createdAt).toLocaleTimeString('en-PK')
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);

    // Set column widths
    ws['!cols'] = [
      { wch: 6 },   // Sr No
      { wch: 26 },  // Order ID
      { wch: 20 },  // Customer Name
      { wch: 15 },  // Phone
      { wch: 35 },  // Address
      { wch: 12 },  // City
      { wch: 40 },  // Products
      { wch: 12 },  // Total Price
      { wch: 12 },  // Status
      { wch: 18 },  // Payment
      { wch: 12 },  // Date
      { wch: 10 },  // Time
    ];

    xlsx.utils.book_append_sheet(wb, ws, 'Orders');

    const outputDir = path.join(__dirname, '..', 'exports');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const filePath = path.join(outputDir, 'bakestro_orders.xlsx');
    xlsx.writeFile(wb, filePath);

    console.log('📊 Orders exported to Excel:', filePath);
    return filePath;
  } catch (error) {
    console.error('Excel export error:', error);
    throw error;
  }
};

module.exports = { exportOrdersToExcel };
