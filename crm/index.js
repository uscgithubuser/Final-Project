const express = require('express');
const bodyParser = require('body-parser');
const customerRoutes = require('./routes/customerRoutes');

const app = express();
const PORT = process.env.PORT || 4001; // Ensure you set the port correctly

app.use(bodyParser.json()); // Use body-parser middleware to parse JSON requests
app.use('/api/crm', customerRoutes); // Use the customer routes

app.listen(PORT, () => {
  console.log(`CRM service running on http://localhost:${PORT}`);
});