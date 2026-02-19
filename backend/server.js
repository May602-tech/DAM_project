const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const mbtiRoutes = require('./routes/mbti');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const mongoURI = 'mongodb://127.0.0.1:27017/MBTI_Career_Matcher_1';
mongoose.connect(mongoURI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/mbti', mbtiRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('MBTI Career Matcher API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});