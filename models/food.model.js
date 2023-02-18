const mongoose = require("mongoose");

const foodSchema = mongoose.Schema({
  dish_name: String,
  price: Number,
  cuisine: String,
  rating: Number,
  authorID: String,
});
const FoodModel = mongoose.model("fooddb", foodSchema);

module.exports = {
  FoodModel,
};
