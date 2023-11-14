const model= require('../models/User')(sequelize,DataTypes);

// Create a new product review
async function createProductReview(req, res) {
  try {
    const { productId, title, rating, published, content } = req.body;
    const productReview = await model.ProductReview.create({
      productId,
      title,
      rating,
      published,
      content,
    });
    res.status(201).json(productReview);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Get all product reviews
async function getAllProductReviews(req, res) {
  try {
    const productReviews = await model.ProductReview.findAll();
    res.json(productReviews);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Get product reviews by productId
async function getProductReviewsByProductId(req, res) {
  try {
    const { productId } = req.params;
    const productReviews = await model.ProductReview.findAll({
      where: { productId },
    });
    res.json(productReviews);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Update a product review
async function updateProductReview(req, res) {
  try {
    const { reviewId } = req.params;
    const { title, rating, published, content } = req.body;
    const productReview = await model.ProductReview.findByPk(reviewId);
    if (!productReview) {
      return res.status(404).json({ error: 'Product review not found' });
    }
    productReview.title = title;
    productReview.rating = rating;
    productReview.published = published;
    productReview.content = content;
    await productReview.save();
    res.json(productReview);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Delete a product review
async function deleteProductReview(req, res) {
  try {
    const { reviewId } = req.params;
    const productReview = await model.ProductReview.findByPk(reviewId);
    if (!productReview) {
      return res.status(404).json({ error: 'Product review not found' });
    }
    await productReview.destroy();
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  createProductReview,
  getAllProductReviews,
  getProductReviewsByProductId,
  updateProductReview,
  deleteProductReview,
};