const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: Number, required: true }, // 1-5
    comment: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
}, { timestamps: true });

const productSchema = mongoose.Schema({
    // ... keep existing fields (name, price, etc) ...
    // INSERT THIS:
    reviews: [reviewSchema], 
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    // ...
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
