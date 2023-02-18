const express = require("express");
const { FoodModel } = require("../models/food.model");

const FoodRouter = express.Router();

// get all food  data
FoodRouter.get("/", async (req, res) => {
  try {
    const food = await FoodModel.find();
    res.send(food);
  } catch (error) {
    console.log(error);
    res.send("Something went wrong");
  }
});

// get data by id
FoodRouter.get("/:id", async (req, res) => {
  try {
    const food = await FoodModel.find({ _id: req.params.id });
    res.send(food);
  } catch (error) {
    console.log(error);
    res.send("Something went wrong");
  }
});
FoodRouter.post("/add", async (req, res) => {
  try {
    const food = await FoodModel(req.body);
    food.save();
    res.send("Data added successfully");
  } catch (error) {
    console.log(error);
    res.send("Something went wrong");
  }
});

FoodRouter.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const food = await FoodModel.findByIdAndUpdate({ _id: id }, req.body);
    res.send("Data updated successfullly ");
  } catch (error) {
    console.log(error);
    res.send("Something went wrong");
  }
});

FoodRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const food = await FoodModel.findByIdAndDelete({ _id: id });
    res.send("Data deleted successfullly ");
  } catch (error) {
    console.log(error);
    res.send("Something went wrong");
  }
});
module.exports = {
  FoodRouter,
};
