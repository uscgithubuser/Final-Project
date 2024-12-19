const express = require('express');
const crypto = require('crypto');
const verifyToken = require('../../middleware/jwtAuthMiddleware'); // Authentication middleware
const checkRole = require('../../middleware/roleMiddleware'); // Role-based access middleware

const router = express.Router();
let customers = []; // In-memory storage for customers

// Encryption setup
const ENCRYPTION_KEY = crypto.randomBytes(32); // Replace with a persistent key in production
const IV_LENGTH = 16; // Initialization vector length

// Encryption function
function encrypt(text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`;
}

// Decryption function
function decrypt(text) {
  const [ivHex, encryptedText] = text.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// ==============================
// Routes
// ==============================

// Get all customers (Only accessible by admin role)
router.get('/', verifyToken, checkRole(['admin']), (req, res) => {
  try {
    const customersWithBothEmails = customers.map((customer) => ({
      id: customer.id,
      name: customer.name,
      encryptedEmail: customer.email, // Encrypted email
      decryptedEmail: decrypt(customer.email), // Decrypted email
    }));

    res.json({ customers: customersWithBothEmails });
  } catch (error) {
    console.error('Error retrieving customer emails:', error.message);
    res.status(500).json({ error: 'Failed to retrieve customers' });
  }
});

// Add a new customer (Only accessible by admin and manager roles)
router.post('/add-customer', verifyToken, checkRole(['admin', 'manager']), (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Encrypt email before storing
    const encryptedEmail = encrypt(email);
    const newCustomer = {
      id: customers.length + 1,
      name,
      email: encryptedEmail,
      addedBy: req.user.preferred_username || 'Unknown User', // From Keycloak token
    };

    customers.push(newCustomer);
    res.status(201).json({
      message: 'Customer added successfully',
      customer: { id: newCustomer.id, name: newCustomer.name },
    });
  } catch (error) {
    console.error('Error adding new customer:', error.message);
    res.status(500).json({ error: 'Failed to add customer' });
  }
});

// ==============================
// Export the router
// ==============================
module.exports = router;
