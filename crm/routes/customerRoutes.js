const express = require('express');

const router = express.Router();
let customers = []; // In-memory storage for customers

// Get all customers
router.get('/', (req, res) => {
  res.json(customers);
});

// Add a new customer
router.post('/', (req, res) => {
  const { name, email } = req.body;
  const newCustomer = { id: customers.length + 1, name, email };
  customers.push(newCustomer);
  res.status(201).json(newCustomer);
});

module.exports = router;