const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const logMiddleware = require('../middleware/logMiddleware');
const app = express();
const metricsMiddleware = require('../middleware/metricsMiddleware');

const PORT = process.env.PORT || 3000;

// Apply the logging and monitoring middleware to all routes
app.use(logMiddleware);
app.use(metricsMiddleware);

app.get('/metrics', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send(metricsMiddleware.promClient.register.metrics());
});

app.use(bodyParser.json());
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`API Gateway running on http://localhost:${PORT}`);
});