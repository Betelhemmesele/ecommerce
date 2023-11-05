const express = require("express");
const router = express.Router();
const {
  registerUser,
  confirmEmail,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getAllUsers,
} = require("../controllers/UserController.js");
const {
  productList,
  getProductList,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProduct,
  getProductsByCategory
}=require("../controllers/ProductListController.js");

router.post("/register", registerUser);
router.post("/confirm", confirmEmail);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset_password/:id/:token", resetPassword);
router.get("/alluser",getAllUsers)
router.post("/createProducts",productList);
router.get("/getProducts",getProductList);
router.get("/getProduct/:id",getProductById);
router.get("/getProductList/:category",getProductsByCategory);
router.put("/updateProduct/:id",updateProduct);
router.delete("/deleteProduct/:id",deleteProduct);
router.get("/searchProduct",searchProduct);
module.exports = router;
