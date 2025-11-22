const Product = require('../models/Product');

const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) res.json(product);
  else res.status(404).json({ message: 'Product not found' });
};

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

module.exports = { getProducts, getProductById, createProduct, deleteProduct };
