const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Get all reviews
router.get('/', reviewController.getAllReviews);

// Get review by id
router.get('/:reviewId', reviewController.getReviewById);

module.exports = router;
