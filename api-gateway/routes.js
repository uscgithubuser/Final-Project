const express = require('express');
const router = express.Router();
const axios = require('axios');

// Proxy requests to the Auth service
router.use('/auth', (req, res) => {
  axios({
    method: req.method,
    url: `http://localhost:4000/api/auth${req.url}`,
    data: req.body,
    headers: { Authorization: req.headers.authorization }
  })
  .then(response => res.json(response.data))
  .catch(error => res.status(error.response.status).json(error.response.data));
});

// Proxy requests to the CRM
router.use('/crm', (req, res) => {
  axios({
    method: req.method,
    url: `http://localhost:4001/api/crm${req.url}`,
    data: req.body,
    headers: { Authorization: req.headers.authorization }
  })
  .then(response => res.json(response.data))
  .catch(error => res.status(error.response.status).json(error.response.data));
});

// Proxy requests to the Inventory
router.use('/inventory', (req, res) => {
  axios({
    method: req.method,
    url: `http://localhost:5000/api/inventory${req.url}`,
    data: req.body,
    headers: { Authorization: req.headers.authorization }
  })
  .then(response => res.json(response.data))
  .catch(error => res.status(error.response.status).json(error.response.data));
});

// Proxy requests to the Support
router.use('/support', (req, res) => {
  axios({
    method: req.method,
    url: `http://localhost:6000/api/support${req.url}`,
    data: req.body,
    headers: { Authorization: req.headers.authorization }
  })
  .then(response => res.json(response.data))
  .catch(error => res.status(error.response.status).json(error.response.data));
});

module.exports = router;