const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

// 1. Base Route: /api/products
router.route('/')
    .get(getProducts) // Everyone can see products
    .post(protect, admin, createProduct); // Only Admin can create

// 2. Review Route: /api/products/:id/reviews
router.route('/:id/reviews').post(protect, createProductReview); // Logged in users can review

// 3. ID Route: /api/products/:id
router.route('/:id')
    .get(getProductById) // Everyone can see a single product details
    .put(protect, admin, updateProduct) // Only Admin can edit
    .delete(protect, admin, deleteProduct); // Only Admin can delete

module.exports = router;
