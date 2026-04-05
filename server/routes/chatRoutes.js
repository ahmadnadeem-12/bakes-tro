const express = require('express');
const router = express.Router();
const { sendMessage, createChatOrder } = require('../controllers/chatController');

router.post('/', sendMessage);
router.post('/order', createChatOrder);

module.exports = router;
