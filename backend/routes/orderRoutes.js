const express = require('express');
const router = express.Router();
const { 
    addOrderItems, 
    getOrderById, 
    getOrders, 
    getMyOrders, 
    updateOrderToDelivered 
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/myorders').get(protect, getMyOrders); // <--- The missing link
router.route('/:id').get(protect, getOrderById);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

module.exports = router;
