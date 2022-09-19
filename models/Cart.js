const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: false,
  },
  products: {
    type: Array,
    required: false,
  },
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;