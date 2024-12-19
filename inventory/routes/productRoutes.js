const express = require('express');
const verifyToken = require('../../middleware/jwtAuthMiddleware'); // Authentication middleware
const checkRole = require('../../middleware/roleMiddleware'); // Role-based access middleware

const router = express.Router();
let products = []; // In-memory storage for products

// ==============================
// Routes
// ==============================

// Get all products (Accessible by authenticated users)
router.get('/', verifyToken, (req, res) => {
  res.json(products);
});

// Add a new product (Only accessible by admin or manager roles)
router.post('/', verifyToken, checkRole(['admin', 'employee']), (req, res) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: 'Name and price are required' });
  }

  const newProduct = { id: products.length + 1, name, price };
  products.push(newProduct);

  res.status(201).json({
    message: 'Product added successfully',
    product: newProduct,
  });
});

// Delete a product (Only accessible by admin)
router.delete('/:id', verifyToken, checkRole(['admin']), (req, res) => {
  const { id } = req.params;
  const productIndex = products.findIndex((product) => product.id === parseInt(id));

  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  products.splice(productIndex, 1);

  res.status(200).json({ message: `Product with id ${id} deleted successfully` });
});

// Update a product (Only accessible by admin or manager)
router.put('/:id', verifyToken, checkRole(['admin', 'employee']), (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  const product = products.find((product) => product.id === parseInt(id));

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  if (!name || !price) {
    return res.status(400).json({ error: 'Name and price are required' });
  }

  product.name = name;
  product.price = price;

  res.status(200).json({ message: `Product with id ${id} updated successfully`, product });
});

// ==============================
// Export the router
// ==============================
module.exports = router;
