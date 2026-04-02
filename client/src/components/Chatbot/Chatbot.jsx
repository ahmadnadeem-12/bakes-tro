import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaRobot, FaTimes, FaPaperPlane, FaUser } from 'react-icons/fa'
import './Chatbot.css'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Hello! I am your Bakestro assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      let botResponse = "I'm not sure about that, but you can call us at 0329-6032936 for urgent queries!";
      
      const lowerInput = input.toLowerCase();
      if (lowerInput.includes('menu') || lowerInput.includes('product')) {
        botResponse = "We have delicious Nan Khatais, Biscuits, Cupcakes, and more! Check our Home page for the full list.";
      } else if (lowerInput.includes('price') || lowerInput.includes('cost')) {
        botResponse = "Our prices start from Rs. 250 for cupcakes. You can see exact pricing on each product card.";
      } else if (lowerInput.includes('delivery') || lowerInput.includes('location')) {
        botResponse = "We are located in Faisalabad. We offer fast delivery across the city for a small fee of Rs. 150.";
      } else if (lowerInput.includes('order')) {
        botResponse = "To place an order, just add items to your cart and proceed to checkout. I can also help if you provide your name and phone!";
      }

      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
    }, 1000);
  };

  return (
    <div className="chatbot-wrapper">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="chatbot-container clay-card"
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
          >
            <div className="chatbot-header">
              <div className="bot-title">
                <FaRobot />
                <span>Bakestro Bot</span>
              </div>
              <button onClick={() => setIsOpen(false)}><FaTimes /></button>
            </div>

            <div className="chatbot-messages" ref={scrollRef}>
              {messages.map((msg, idx) => (
                <div key={idx} className={`message-wrapper ${msg.role}`}>
                  <div className="message-icon">
                    {msg.role === 'bot' ? <FaRobot /> : <FaUser />}
                  </div>
                  <div className="message-content clay-card">
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            <form className="chatbot-input" onSubmit={handleSend}>
              <input 
                type="text" 
                placeholder="Type your message..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit"><FaPaperPlane /></button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button 
        className="chatbot-toggle clay-button"
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
