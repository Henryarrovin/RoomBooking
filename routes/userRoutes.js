const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create a new user
router.post('/create', userController.createUser);

// Get all users
router.get('/', userController.getAllUsers);

// Get use by id
router.get('/:userId', userController.getUserById);

// Create a review for a room
router.post('/reviews', userController.createReview);

module.exports = router;
