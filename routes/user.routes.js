const { UserModel } = require("../models/user.model");
const express = require("express");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const app = express();
app.use(express.json());
const userRouter = express.Router();
userRouter.post("/register", async (req, res) => {
  const { email, password, name, age } = req.body;
  const newuser = await UserModel.find({ email });
  if (newuser.length != 0) {
    res.send("try another email");
    return;
  }
  try {
    bcrypt.hash(password, 6, async (err, hash_pass) => {
      if (err) {
        console.log(err);
      } else {
        const user = new UserModel({ email, password: hash_pass, name, age });
        await user.save();
        res.send("success");
      }
    });
  } catch (error) {
    res.send("registration failed");
    console.log(error);
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, async (err, result) => {
        if (!result) {
          console.log(err);
          res.send({ msg: "something went wrong" });
        } else {
          let token = jwt.sign({ userID: user[0]._id }, "masai");
          res.send({ msg: "login successfully", token });
        }
      });
    } else {
      res.send("Try another email");
    }
  } catch (error) {
    console.log(error);
    res.send("something went wrong");
  }
});

module.exports = {
  userRouter,
};
