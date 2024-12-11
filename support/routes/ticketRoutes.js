const express = require('express');

const router = express.Router();
let tickets = []; // In-memory storage for support tickets

// Get all tickets
router.get('/', (req, res) => {
  res.json(tickets);
});

// Create a new ticket
router.post('/', (req, res) => {
  const { issue, user } = req.body;
  const newTicket = { id: tickets.length + 1, issue, user };
  tickets.push(newTicket);
  res.status(201).json(newTicket);
});

module.exports = router;