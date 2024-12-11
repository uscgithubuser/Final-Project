const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

let users = []; // In-memory storage for users

// Register a new user
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  const newUser  = { username, password };
  users.push(newUser );
  res.status(201).json({ message: 'User  registered successfully' });
});

// Login user
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ username }, 'your_jwt_secret', { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;