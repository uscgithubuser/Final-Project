const express = require('express');
const bodyParser = require('body-parser');
const ticketRoutes = require('./routes/ticketRoutes');

const app = express();
const PORT = process.env.PORT || 7000;

app.use(bodyParser.json());
app.use('/api/support', ticketRoutes);

app.listen(PORT, () => {
  console.log(`Support service running on http://localhost:${PORT}`);
});