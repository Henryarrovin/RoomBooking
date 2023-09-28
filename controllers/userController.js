const User = require('../models/User');
const Room = require('../models/Room');
const Review = require('../models/Review');

exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error('Error fetching all users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

exports.getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

exports.createReview = async (req, res) => {
    try {
      const { rating, comment, roomId, userId } = req.body;

      const room = await Room.findById(roomId);
      if (!room) {
        return res.status(404).json({ error: 'Room not found' });
      }
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const review = new Review({ rating, comment, room: roomId, user: userId });
      await review.save();
  
      room.ratings.push(review._id);
      await room.save();
  
      user.reviews.push(review._id);
      await user.save();
  
      res.json(review);
    } catch (error) {
      console.error('Error creating review:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
