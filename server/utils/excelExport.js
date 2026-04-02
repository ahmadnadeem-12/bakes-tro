const xlsx = require('xlsx');
const path = require('path');

/**
 * Export orders to Excel file
 * @param {Array} orders - List of order objects
 * @returns {Buffer} - Excel file buffer
 */
const exportOrdersToExcel = (orders) => {
  const data = orders.map(order => ({
    'Order ID': order._id ? order._id.toString() : 'N/A',
    'Customer Name': order.shippingDetails.name,
    'Phone': order.shippingDetails.phone,
    'Address': order.shippingDetails.address,
    'Total Price': order.totalPrice,
    'Status': order.status,
    'Date': order.createdAt ? new Date(order.createdAt).toLocaleString() : new Date().toLocaleString(),
    'Items': order.items.map(item => `${item.product} (x${item.quantity})`).join(', ')
  }));

  const worksheet = xlsx.utils.json_to_sheet(data);
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Orders');

  // Return buffer for download
  return xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });
};

module.exports = { exportOrdersToExcel };
