const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const db = require('./models');
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const orderRoutes = require('./routes/order.routes');
const bulkRequestRoutes = require('./routes/bulk-request.routes');
const contactRoutes = require('./routes/contact.routes');
const settingsRoutes = require('./routes/settings.routes');
const dashboardRoutes = require('./routes/dashboard.routes');

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = (process.env.CLIENT_URLS || process.env.CLIENT_URL || 'http://localhost:4200,http://127.0.0.1:4200,http://127.0.0.1:4201')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`Origin ${origin} is not allowed by CORS`));
    },
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'agrabo-api' });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/bulk-requests', bulkRequestRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

async function startServer() {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync();
    await db.seedDefaults();
    console.log('Database connected and synced');
  } catch (error) {
    console.warn('Database is not ready yet:', error.message);
    console.warn('Check your MySQL connection variables, then restart the API.');
  }

  app.listen(port, () => {
    console.log(`AGRABO API running on http://localhost:${port}`);
  });
}

startServer();
