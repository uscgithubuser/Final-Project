const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const logMiddleware = require('../middleware/logMiddleware');
const verifyToken = require('../middleware/jwtAuthMiddleware'); // Authentication middleware
const app = express();
const PORT = process.env.PORT || 6000;

// Middleware
app.use(bodyParser.json());
app.use(logMiddleware); // Logging all requests

// Routes
app.use('/api/inventory', verifyToken, productRoutes); // Protect all inventory routes

// Server
app.listen(PORT, () => {
  console.log(`Inventory service running on http://localhost:${PORT}`);
});
