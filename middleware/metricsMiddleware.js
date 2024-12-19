const express = require('express');
const promBundle = require('express-prom-bundle');

const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  includeStatusCode: true,
  customLabels: { app: 'my_app' },
  promClient: {
    collectDefaultMetrics: {},
  },
});

module.exports = metricsMiddleware;
