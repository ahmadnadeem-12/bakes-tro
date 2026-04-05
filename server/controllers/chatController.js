const Groq = require('groq-sdk');
const Order = require('../models/Order');
const { exportOrdersToExcel } = require('../utils/exportExcel');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const SYSTEM_PROMPT = `You are Bakestro Bot, a friendly and helpful AI assistant for Bakestro — a premium artisan bakery based in Faisalabad, Pakistan.

Your role:
1. Help customers browse products and recommend items
2. Answer questions about menu, prices, delivery, and hours
3. Help place orders by collecting: name, phone, address, product, quantity
4. Be warm, friendly, and use appropriate emojis

Key info:
- Location: Faisalabad, Punjab, Pakistan
- Phone: 0329-6032936
- Hours: 9 AM - 11 PM daily
- Delivery: Rs. 150 within Faisalabad, free above Rs. 2000
- Same-day delivery for orders before 2 PM
- Payment: Cash on Delivery, JazzCash, EasyPaisa

When a customer wants to order, collect these details step by step:
1. Product name and quantity
2. Customer name
3. Phone number
4. Delivery address

After collecting all details, confirm the order summary.

Keep responses concise (under 150 words). Use bullet points for lists. Be helpful and suggest popular items when asked.`;

const sendMessage = async (req, res) => {
  try {
    const { messages, userMessage, products } = req.body;

    // Build product context
    let productContext = '';
    if (products && products.length > 0) {
      productContext = '\n\nAvailable Products:\n' + 
        products.map(p => `- ${p.name}: Rs. ${p.price}/${p.unit || 'pc'} (${p.category})`).join('\n');
    }

    const systemMessage = {
      role: 'system',
      content: SYSTEM_PROMPT + productContext
    };

    const chatMessages = [
      systemMessage,
      ...(messages || [{ role: 'user', content: userMessage }])
    ];

    const chatCompletion = await groq.chat.completions.create({
      messages: chatMessages,
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_completion_tokens: 300,
    });

    const reply = chatCompletion.choices[0]?.message?.content || 
      "I'm having trouble right now. Please try again or call us at 0329-6032936!";

    // Check if reply contains order confirmation
    let addToCart = null;
    let quantity = 1;

    res.json({ reply, addToCart, quantity });
  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ 
      reply: "I'm experiencing some issues. Please try again or call us at 0329-6032936! 📞",
      error: error.message 
    });
  }
};

const createChatOrder = async (req, res) => {
  try {
    const { items, shippingDetails, totalPrice } = req.body;

    const order = new Order({
      items,
      shippingDetails,
      totalPrice,
      paymentMethod: 'Cash on Delivery',
      status: 'pending'
    });

    const savedOrder = await order.save();

    // Export to Excel
    try {
      await exportOrdersToExcel();
    } catch (excelError) {
      console.log('Excel export skipped:', excelError.message);
    }

    res.status(201).json({
      message: 'Order placed successfully!',
      orderId: savedOrder._id,
      order: savedOrder
    });
  } catch (error) {
    console.error('Chat order error:', error);
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
};

module.exports = { sendMessage, createChatOrder };
