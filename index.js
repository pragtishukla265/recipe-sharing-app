const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.json()); // to parse JSON in request bodies

// ✅ connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ register recipe routes
const recipeRoutes = require('./routes/recipeRoutes');
app.use('/api/recipes', recipeRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);


// ✅ health check route
app.get('/', (req, res) => {
  res.send('🚀 Server is running!');
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});


// ✅ start server here
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🌟 Server started on http://localhost:${PORT}`);
});

