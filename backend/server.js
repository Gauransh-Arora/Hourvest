require('dotenv').config();
const connectDB = require('./config/db');
const express = require('express');

const app = express();

// Connect to MongoDB and log status
connectDB()
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });

// Middleware to parse JSON bodies
app.use(express.json());

// Import routes
const authRoutes = require('./routes/auth');

// Use routes
app.use('/api/auth', authRoutes);

const taskRoutes = require('./routes/tasks');
app.use('/api/tasks', taskRoutes);

app.get('/debug-task-route', (req, res) => {
  res.send('Task route is working');
});

console.log("✅ Task routes mounted");

// Start server on your chosen port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
