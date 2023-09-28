const Review = require('../models/Review');

// Create a new review
exports.createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const review = new Review({ rating, comment });
    await review.save();
    res.json(review);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a list of all reviews
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get review by ID
exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json(review);
  } catch (error) {
    console.error('Error fetching review by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a review by ID
exports.updateReviewById = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const review = await Review.findByIdAndUpdate(
      req.params.reviewId,
      { rating, comment },
      { new: true }
    );
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json(review);
  } catch (error) {
    console.error('Error updating review by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a review by ID
exports.deleteReviewById = async (req, res) => {
  try {
    const review = await Review.findByIdAndRemove(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
