const express = require('express');

const router = express.Router();
let products = []; // In-memory storage for products

// Get all products
router.get('/', (req, res) => {
  res.json(products);
});

// Add a new product
router.post('/', (req, res) => {
  const { name, price } = req.body;
  const newProduct = { id: products.length + 1, name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

module.exports = router;