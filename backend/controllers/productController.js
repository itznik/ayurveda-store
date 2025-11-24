const Product = require('../models/Product');

// @desc    Fetch all products
// @route   GET /api/products
const getProducts = async (req, res) => {
    const keyword = req.query.keyword
        ? {
              name: {
                  $regex: req.query.keyword,
                  $options: 'i',
              },
          }
        : {};

    const products = await Product.find({ ...keyword });
    res.json(products);
};

// @desc    Fetch single product
// @route   GET /api/products/:id
const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        // INCREMENT VIEW COUNT
        product.numViews = (product.numViews || 0) + 1;
        await product.save(); // Save quietly in background
        
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

// @desc    Create a product
// @route   POST /api/products
const createProduct = async (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        user: req.user._id,
        image: req.body.image,
        category: req.body.category,
        countInStock: req.body.countInStock,
        numReviews: 0,
        description: req.body.description,
    });

    const createdProduct = await product.save();
    if (req.io) req.io.emit('products_updated', { action: 'create', product: createdProduct });
    res.status(201).json(createdProduct);
};

// @desc    Update a product
// @route   PUT /api/products/:id
const updateProduct = async (req, res) => {
    const { name, price, description, image, category, countInStock } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.category = category;
        product.countInStock = countInStock;

        const updatedProduct = await product.save();
        if (req.io) req.io.emit('products_updated', { action: 'update', product: updatedProduct });
        res.json(updatedProduct);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
const deleteProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await product.deleteOne();
        if (req.io) req.io.emit('products_updated', { action: 'delete', id: req.params.id });
        res.json({ message: 'Product removed' });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

// @desc    Create new review
// @route   POST /api/products/:id/reviews
const createProductReview = async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
            res.status(400).json({ message: 'Product already reviewed' });
            return;
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        };

        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

        await product.save();
        res.status(201).json({ message: 'Review added' });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
};
