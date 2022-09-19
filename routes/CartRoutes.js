const express = require("express");
const CartController = require("../controllers/CartController");
const authController = require("../controllers/authController");
const CartRouter = express.Router();
//routes
CartRouter
  .route("/product")
  .all(authController.protect)
  .post(CartController.AddCart);

  CartRouter
  .all(authController.protect)
  .route("/product/:id")
  .delete(CartController.DeleteCart);

  CartRouter
  .all(authController.protect)
  .route("/pay")
  .post(CartController.PayCart);

module.exports = CartRouter;
