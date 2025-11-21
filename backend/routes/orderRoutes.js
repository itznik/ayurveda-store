const express = require('express');
const router = express.Router();
const {
    addOrderItems,
    getOrderById,
    getMyOrders,
    getOrders,
    updateOrderToDelivered,
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, addOrderItems)
    .get(protect, admin, getOrders);

router.route('/myorders').get(protect, getMyOrders); // This makes your Account Page work

router.route('/:id').get(protect, getOrderById);

router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered); // Admin can mark delivered

module.exports = router;
