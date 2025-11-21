// @desc    Fetch all products (with Search & Pagination)
// @route   GET /api/products?keyword=oil&pageNumber=1
const getProducts = async (req, res) => {
    const pageSize = 10; // Items per page
    const page = Number(req.query.pageNumber) || 1;

    // Search Logic
    const keyword = req.query.keyword
        ? {
              name: {
                  $regex: req.query.keyword,
                  $options: 'i', // Case insensitive
              },
          }
        : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    res.json({ products, page, pages: Math.ceil(count / pageSize) });
};


// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
        // Check if user already reviewed
        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
            res.status(400);
            throw new Error('Product already reviewed');
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        };

        product.reviews.push(review);

        // Recalculate Average Rating
        product.numReviews = product.reviews.length;
        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length;

        await product.save();
        res.status(201).json({ message: 'Review added' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
};

module.exports = { 
    getProducts, 
    createProduct, 
    updateProduct, 
    deleteProduct,
    createProductReview // <--- Export
};
