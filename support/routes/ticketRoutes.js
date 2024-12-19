const express = require('express');
const verifyToken = require('../../middleware/jwtAuthMiddleware'); // Authentication middleware
const checkRole = require('../../middleware/roleMiddleware'); // Role-based access control middleware

const router = express.Router();
let tickets = []; // In-memory storage for support tickets

// Get all tickets - Restricted to "customer" role
router.get('/', verifyToken, checkRole(['customer']), (req, res) => {
  try {
    res.json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error.message);
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
});

// Create a new ticket - Restricted to "customer" role
router.post('/', verifyToken, checkRole(['customer']), (req, res) => {
  try {
    const { issue, user } = req.body;

    if (!issue || !user) {
      return res.status(400).json({ error: 'Issue and user are required' });
    }

    const newTicket = { id: tickets.length + 1, issue, user };
    tickets.push(newTicket);

    res.status(201).json({
      message: 'Ticket created successfully',
      ticket: newTicket,
    });
  } catch (error) {
    console.error('Error creating ticket:', error.message);
    res.status(500).json({ error: 'Failed to create ticket' });
  }
});

module.exports = router;
