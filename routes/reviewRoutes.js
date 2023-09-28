const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Create a new review
router.post('/', reviewController.createReview);

// Get a list of all reviews
router.get('/', reviewController.getAllReviews);

// Get review by ID
router.get('/:reviewId', reviewController.getReviewById);

// Update a review by ID
router.put('/:reviewId', reviewController.updateReviewById);

// Delete a review by ID
router.delete('/:reviewId', reviewController.deleteReviewById);

module.exports = router;
