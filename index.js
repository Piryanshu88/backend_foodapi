const express = require("express");
const { connect } = require("./config/db");
const { authenticate } = require("./middlewares/auth.middlewares");
const { FoodRouter } = require("./routes/food.routes");
const { userRouter } = require("./routes/user.routes");
const app = express();
var cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use(authenticate);
app.use("/food", FoodRouter);
require("dotenv").config();
app.listen(process.env.port, async () => {
  try {
    await connect;
    console.log("connect to db");
  } catch (error) {
    console.log("something went wrong ");
    console.log(error);
  }
  console.log("server is running ");
});
