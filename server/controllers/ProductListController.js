const DataTypes = require("sequelize");
const { sequelize } = require("../models/index");
const Product = require('../models/User')(sequelize, DataTypes);
const { Op } = require('sequelize');
exports.productList = async (req, res) => {
  try {
    const { title, description, price, category, tags, imageUrl, userId } = req.body;

    // Create a new product listing with the provided userId
    const product = await Product.Products.create({
      title,
      description,
      price,
      category,
      imageUrl,
      userId, // Add the userId to the product creation
    })

    console.log('Tags:', tags);

    if (tags && tags.length > 0) {
      const existingTags = await Product.Tag.findAll({
        where: {
          name: tags,
        },
      });

      const existingTagNames = existingTags.map((tag) => tag.name);
      const newTags = tags.filter((tag) => !existingTagNames.includes(tag));

      // Create new tags if they don't exist
      for (const tagName of newTags) {
        const createdTag = await Product.Tag.create({ name: tagName });
        existingTags.push(createdTag);
      }

      console.log('Tag Instances:', existingTags);
      console.log('Adding tags to product...');
      const now = Date.now();
      await product.addTags(existingTags, { through: { createdAt: now, updatedAt: now } });
    }

    res.status(201).json({ success: true, product });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
  exports.getProductsBySeller = async (req, res) => {
    try {
      const sellerId = req.params.sellerId;
  
      const products = await Product.Products.findAll({
        where: {
          userId: sellerId,
        },
      });
  
      if (products.length === 0) {
        return res.status(404).json({ success: false, error: 'No products found for the specified seller' });
      }
  
      res.status(200).json({ success: true, products });
    } catch (error) {
      console.error('Error retrieving products:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  };
  exports.getProductList=async(req, res)=>{
    try {
      const products = await Product.Products.findAll({
       // attributes: { exclude: ['image'] },
        include: [{ model: Product.Tag, as: 'tags' }],
      });
      console.log("products",products);
      res.status(200).json({ success: true, products });
    } catch (error) {
      console.error('Error retrieving products:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  };
  exports.getProductById =async(req, res) =>{
    try {
      const productId = req.params.id;
  
      const product = await Product.Products.findByPk(productId, {
        include: [{ model: Product.Tag, as: 'tags' }],
      });
  
      if (!product) {
        return res.status(404).json({ success: false, error: 'Product not found' });
      }
  
      res.status(200).json({ success: true, product });
    } catch (error) {
      console.error('Error retrieving product:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  };
  exports.getProductsByCategory = async (req, res) => {
    try {
      const { category } = req.params;
  
      // Find products by category
      const products = await Product.Products.findAll({
        where: { category },
        include: [{ model: Product.Tag, as: 'tags' }],
      });
  
      res.status(200).json({ success: true, products });
    } catch (error) {
      console.error('Error retrieving products by category:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  };
  exports.updateProduct=async(req, res)=> {
    try {
      const productId = req.params.id;
      const { title, description, price, category, images, tags } = req.body;
  
      const product = await Product.Products.findByPk(productId);
  
      if (!product) {
        return res.status(404).json({ success: false, error: 'Product not found' });
      }
  
      // Update the product listing
      await product.update({
        title,
        description,
        price,
        category,
        images,
      });
  
      // Update associated tags
      if (tags && tags.length > 0) {
        const tagInstances = await Product.Tag.findAll({
          where: {
            name: tags,
          },
        });
  
        await product.setTags(tagInstances);
      } else {
        await product.setTags([]);
      }
  
      res.status(200).json({ success: true, product });
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  };
  exports.deleteProduct=async(req, res) =>{
    try {
      const productId = req.params.id;
  
      const product = await Product.Products.findByPk(productId);
  
      if (!product) {
        return res.status(404).json({ success: false, error: 'Product not found' });
      }
  
      // Delete the product listing
      await product.destroy();
  
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  };
  exports.searchProduct=async(req, res) =>{
    try {
      const { keywords, category, priceRange,tags } = req.query;
      
      // Build the search query based on the provided parameters
      const searchQuery = {
        where: {},
        include: [{ model: Product.Tag, as: 'tags' }],
      };
  
      if (keywords) {
        searchQuery.where.title = { [Op.like]: `%${keywords}%` };
      }
  
      if (category) {
        searchQuery.where.category = category;
      }
  
      if (priceRange) {
        const [minPrice, maxPrice] = priceRange.split('-');
        searchQuery.where.price = { [Op.between]: [minPrice, maxPrice] };
      }
      if (tags) {
        searchQuery.include.push({
          model: Product.Tag,
          as: 'tags',
          where: { name: tags },
        });
      }
      const products = await Product.Products.findAll(searchQuery);
  
     res.status(200).json({ success: true, products });
    } catch (error) {
      console.error('Error searching products:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  };