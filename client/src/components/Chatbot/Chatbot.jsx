import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaRobot, FaTimes, FaPaperPlane, FaUser, FaShoppingCart } from 'react-icons/fa'
import { chatAPI } from '../../services/api'
import { useCart } from '../../context/CartContext'
import { PRODUCTS } from '../../constants/data'
import './Chatbot.css'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', content: "Assalam-o-Alaikum! 🍰 I'm your Bakestro assistant. I can help you:\n\n• Browse our menu\n• Recommend products\n• Place an order\n• Answer questions\n\nHow can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [orderMode, setOrderMode] = useState(false);
  const [orderData, setOrderData] = useState({});
  const scrollRef = useRef(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const quickReplies = [
    { text: '📋 View Menu', action: 'show me the menu' },
    { text: '🔥 Today\'s Deals', action: 'what are today\'s deals?' },
    { text: '🛒 Place Order', action: 'I want to place an order' },
    { text: '🚚 Delivery Info', action: 'tell me about delivery' },
  ];

  const addBotMessage = (content) => {
    setMessages(prev => [...prev, { role: 'bot', content }]);
  };

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsTyping(true);

    try {
      // Build conversation history for API
      const conversationHistory = messages.slice(-10).map(msg => ({
        role: msg.role === 'bot' ? 'assistant' : 'user',
        content: msg.content
      }));
      conversationHistory.push({ role: 'user', content: userMessage });

      const { data } = await chatAPI.sendMessage({
        messages: conversationHistory,
        userMessage,
        products: PRODUCTS.map(p => ({ name: p.name, price: p.price, category: p.category, unit: p.pricingUnit }))
      });

      setIsTyping(false);
      addBotMessage(data.reply);

      // Check if bot returned a product recommendation to add to cart
      if (data.addToCart) {
        const product = PRODUCTS.find(p => 
          p.name.toLowerCase().includes(data.addToCart.toLowerCase())
        );
        if (product) {
          addToCart(product, data.quantity || 1);
        }
      }
    } catch (error) {
      setIsTyping(false);
      // Fallback to local responses if API fails
      handleLocalResponse(userMessage);
    }
  };

  const handleLocalResponse = (input) => {
    const lowerInput = input.toLowerCase();
    let response = "I'm having trouble connecting right now. You can call us at 0329-6032936 for help! 📞";

    if (lowerInput.includes('menu') || lowerInput.includes('product') || lowerInput.includes('show')) {
      const categories = [...new Set(PRODUCTS.map(p => p.category))];
      response = `📋 **Our Menu Categories:**\n\n${categories.map(cat => `• ${cat.charAt(0).toUpperCase() + cat.slice(1)}`).join('\n')}\n\nWe have ${PRODUCTS.length}+ items! What category interests you?`;
    } else if (lowerInput.includes('nankhatai') || lowerInput.includes('khatai')) {
      const items = PRODUCTS.filter(p => p.category === 'nankhatai');
      response = `🍪 **Nankhatai Collection:**\n\n${items.map(p => `• ${p.name} — Rs. ${p.price}/${p.pricingUnit}`).join('\n')}\n\nWould you like to add any to your cart?`;
    } else if (lowerInput.includes('brownie')) {
      const items = PRODUCTS.filter(p => p.category === 'brownies');
      response = `🍫 **Brownies:**\n\n${items.map(p => `• ${p.name} — Rs. ${p.price}/${p.pricingUnit}`).join('\n')}`;
    } else if (lowerInput.includes('cake')) {
      const items = PRODUCTS.filter(p => p.category === 'cakes');
      response = `🎂 **Cakes:**\n\n${items.map(p => `• ${p.name} — Rs. ${p.price}/${p.pricingUnit}`).join('\n')}`;
    } else if (lowerInput.includes('cookie')) {
      const items = PRODUCTS.filter(p => p.category === 'cookies');
      response = `🍪 **Cookies:**\n\n${items.map(p => `• ${p.name} — Rs. ${p.price}/${p.pricingUnit}`).join('\n')}`;
    } else if (lowerInput.includes('cupcake')) {
      const items = PRODUCTS.filter(p => p.category === 'cupcakes');
      response = `🧁 **Cupcakes:**\n\n${items.map(p => `• ${p.name} — Rs. ${p.price}/${p.pricingUnit}`).join('\n')}`;
    } else if (lowerInput.includes('deal') || lowerInput.includes('discount') || lowerInput.includes('offer')) {
      response = "🔥 **Today's Deals:**\n\n• 25% OFF on Premium Nan Khatai — Rs. 1,050\n• 30% OFF on Fudge Brownies — Rs. 455\n• 30% OFF on Chocolate Cookies — Rs. 315\n\nVisit our Deals page for more offers!";
    } else if (lowerInput.includes('delivery') || lowerInput.includes('shipping')) {
      response = "🚚 **Delivery Info:**\n\n• Delivery within Faisalabad: Rs. 150\n• Free delivery on orders above Rs. 2,000\n• Same-day delivery for orders before 2 PM\n• Estimated time: 45-60 minutes";
    } else if (lowerInput.includes('order') || lowerInput.includes('place')) {
      response = "🛒 To place an order:\n\n1. Browse products and tap 'Add to Tray'\n2. Go to Cart and review\n3. Proceed to Checkout\n4. Fill in delivery details\n\nOr tell me what you'd like and I'll add it to your cart! 😊";
    } else if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('kitne')) {
      response = "💰 **Price Ranges:**\n\n• Nankhatai: Rs. 1,100 - 1,400/kg\n• Cookies: Rs. 400 - 850/box\n• Cupcakes: Rs. 300 - 500/pc\n• Brownies: Rs. 450 - 650/box\n• Cakes: Rs. 800 - 2,500/kg\n• Donuts: Rs. 180 - 720/box";
    } else if (lowerInput.includes('hour') || lowerInput.includes('timing') || lowerInput.includes('open')) {
      response = "🕐 **Business Hours:**\n\nMonday - Sunday: 9:00 AM - 11:00 PM\nOnline orders: 24/7\n\nWe're always baking for you! 🍞";
    } else if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('salam') || lowerInput.includes('assalam')) {
      response = "Wa-Alaikum-us-Salam! 😊 Welcome to Bakestro! How can I help you today? You can ask me about our menu, prices, deals, or place an order!";
    } else if (lowerInput.includes('thank') || lowerInput.includes('shukriya')) {
      response = "You're welcome! 😊 It's always a pleasure helping you. Don't forget to try our freshly baked Nan Khatais! 🍪";
    }

    addBotMessage(response);
  };

  const handleQuickReply = (action) => {
    setInput(action);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'user', content: action }]);
      setInput('');
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        handleLocalResponse(action);
      }, 1000);
    }, 100);
  };

  const formatMessage = (text) => {
    // Simple markdown-like formatting
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <div className="chatbot-wrapper">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="chatbot-container"
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="chatbot-header">
              <div className="bot-title">
                <div className="bot-avatar">
                  <FaRobot />
                </div>
                <div>
                  <span className="bot-name">Bakestro Bot</span>
                  <span className="bot-status">● Online</span>
                </div>
              </div>
              <button className="chatbot-close" onClick={() => setIsOpen(false)}>
                <FaTimes />
              </button>
            </div>

            <div className="chatbot-messages" ref={scrollRef}>
              {messages.map((msg, idx) => (
                <div key={idx} className={`message-wrapper ${msg.role}`}>
                  <div className="message-icon">
                    {msg.role === 'bot' ? (
                      <div className="bot-msg-avatar"><FaRobot /></div>
                    ) : (
                      <div className="user-msg-avatar"><FaUser /></div>
                    )}
                  </div>
                  <div 
                    className="message-content"
                    dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                  />
                </div>
              ))}

              {isTyping && (
                <div className="message-wrapper bot">
                  <div className="message-icon">
                    <div className="bot-msg-avatar"><FaRobot /></div>
                  </div>
                  <div className="message-content typing">
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Replies */}
            {messages.length <= 2 && (
              <div className="quick-replies">
                {quickReplies.map((reply, idx) => (
                  <button 
                    key={idx} 
                    className="quick-reply-btn"
                    onClick={() => handleQuickReply(reply.action)}
                  >
                    {reply.text}
                  </button>
                ))}
              </div>
            )}

            <form className="chatbot-input" onSubmit={handleSend}>
              <input 
                type="text" 
                placeholder="Type your message..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isTyping}
              />
              <button type="submit" disabled={isTyping || !input.trim()}>
                <FaPaperPlane />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button 
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <FaTimes /> : <FaRobot />}
      </motion.button>
    </div>
  )
}

export default Chatbot
