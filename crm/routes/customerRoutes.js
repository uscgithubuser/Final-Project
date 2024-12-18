const express = require('express');
const crypto = require('crypto');

const router = express.Router();
let customers = []; // In-memory storage for customers

// Encryption setup
const ENCRYPTION_KEY = crypto.randomBytes(32); // Replace with a persistent key in production
const IV_LENGTH = 16; // Initialization vector length

function encrypt(text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`;
}

function decrypt(text) {
  const [ivHex, encryptedText] = text.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// Get all customers (Decrypt emails before sending)
router.get('/', (req, res) => {
  const decryptedCustomers = customers.map((customer) => ({
    ...customer,
    email: decrypt(customer.email), // Decrypt email before sending
  }));
  res.json(decryptedCustomers);
});

// Add a new customer (Encrypt email before storing)
router.post('/', (req, res) => {
  const { name, email } = req.body;
  const encryptedEmail = encrypt(email); // Encrypt email
  const newCustomer = { id: customers.length + 1, name, email: encryptedEmail };
  customers.push(newCustomer);
  res.status(201).json(newCustomer);
});

module.exports = router;
