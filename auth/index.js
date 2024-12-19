const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const Keycloak = require('keycloak-connect');
const authRoutes = require('./routes/authRoutes');
const customerRoutes = require('../crm/routes/customerRoutes'); 
const passport = require('../middleware/passportConfig');
const logMiddleware = require('../middleware/logMiddleware');

const app = express();
const PORT = process.env.PORT || 4000;

// Session store setup
const memoryStore = new session.MemoryStore();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'your_session_secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
    cookie: { secure: true },
  })
);

//logging
app.use(logMiddleware);

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Keycloak initialization
const keycloak = new Keycloak({ store: memoryStore });
app.use(keycloak.middleware());

// Protected routes
app.use('/api/auth', authRoutes); // Public routes for auth
app.use('/api/customers', keycloak.protect(), customerRoutes); // Protected customer routes

app.listen(PORT, () => {
  console.log(`Auth service running on http://localhost:${PORT}`);
});
