const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the CORS middleware
const bodyParser = require('body-parser'); // Import the body-parser middleware

const app = express();

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON requests

try {
  mongoose.connect('mongodb://127.0.0.1:27017/roombooking', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
  });

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

  // Require and use routes
  const roomRoutes = require('./routes/roomRoutes');
  const reviewRoutes = require('./routes/reviewRoutes');
  const userRoutes = require('./routes/userRoutes');
  
  app.use('/rooms', roomRoutes);
  app.use('/reviews', reviewRoutes);
  app.use('/users', userRoutes)
} catch (error) {
  console.error('Error connecting to MongoDB:', error);
}

app.listen(3000, () => {
  console.log('Server is running');
});
