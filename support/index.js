const express = require('express');
const bodyParser = require('body-parser');
const ticketRoutes = require('./routes/ticketRoutes');
const logMiddleware = require('../middleware/logMiddleware'); // Logging middleware
const verifyToken = require('../middleware/jwtAuthMiddleware'); // Authentication middleware

const app = express();
const PORT = process.env.PORT || 7000;

// Body Parser Middleware
app.use(bodyParser.json());

// Logging Middleware
app.use(logMiddleware);

// Support Routes with Authentication Middleware
app.use('/api/support', verifyToken, ticketRoutes);

// Start the Server
app.listen(PORT, () => {
  console.log(`Support service running on http://localhost:${PORT}`);
});
