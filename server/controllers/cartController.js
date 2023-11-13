const DataTypes = require("sequelize");
const { sequelize } = require("../models/index");
const cart = require('../models/User')(sequelize, DataTypes);
async function createCart(req, res) {
    try {
      const { userId, sessionId, token } = req.body;
      const cart = await cart.Cart.create({ userId, sessionId, token, status: 'active' });
      res.status(201).json(cart);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
// Get cart items
async function getCartItems(req, res) {
    try {
      const { cartId } = req.params;
      const cartItems = await cart.CartItem.findAll({ where: { cartId } });
      res.json(cartItems);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  // Add item to cart
  async function addItemToCart(req, res) {
    try {
      const { cartId, productId, SKU, price, discount, quantity } = req.body;
      const cartItem = await cart.CartItem.create({
        cartId,
        productId,
        SKU,
        price,
        discount,
        quantity,
        active: true,
      });
      res.status(201).json(cartItem);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  // Update cart item
  async function updateCartItem(req, res) {
    try {
      const { cartItemId } = req.params;
      const { quantity, discount } = req.body;
      const cartItem = await cart.CartItem.findByPk(cartItemId);
      if (!cartItem) {
        return res.status(404).json({ error: 'Cart item not found' });
      }
      cartItem.quantity = quantity;
      cartItem.discount = discount;
      await cartItem.save();
      res.json(cartItem);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  // Remove item from cart
  async function removeItemFromCart(req, res) {
    try {
      const { cartItemId } = req.params;
      const cartItem = await cart.CartItem.findByPk(cartItemId);
      if (!cartItem) {
        return res.status(404).json({ error: 'Cart item not found' });
      }
      await cartItem.destroy();
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  module.exports = {
    createCart,
    getCartItems,
    addItemToCart,
    updateCartItem,
    removeItemFromCart,
  };  