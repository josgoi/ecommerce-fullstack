const express = require('express');
const router = express.Router();
const { createCheckoutSession, handleWebhook } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

// El webhook necesita el body en raw
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);
router.post('/create-checkout-session', protect, createCheckoutSession);

module.exports = router;