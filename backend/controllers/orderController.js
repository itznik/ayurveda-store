// ... keep existing addOrderItems, getOrderById, getOrders ...

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 }); // Newest first
    res.json(orders);
};

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();
        
        // ⚡ Real-Time: Notify user their order is on the way (Future feature)
        
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
};

// Export them
module.exports = { 
    addOrderItems, 
    getOrderById, 
    getOrders, 
    getMyOrders, // <--- NEW
    updateOrderToDelivered // <--- NEW
};
