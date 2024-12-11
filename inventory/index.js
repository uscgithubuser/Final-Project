const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 6000;

app.use(bodyParser.json());
app.use('/api/inventory', productRoutes);

app.listen(PORT, () => {
  console.log(`Inventory service running on http://localhost:${PORT}`);
});