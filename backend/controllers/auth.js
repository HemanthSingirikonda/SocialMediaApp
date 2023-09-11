const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const handleError = require("../error");

const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    await newUser.save();

    const { password, ...otherData } = newUser._doc;
    res.status(200).json(otherData);
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return next(handleError(404, "User not found"));
    }
    const isMatch = bcrypt.compareSync(req.body.password, user.password);
    if (!isMatch) {
      return next(handleError(401, "Invalid password"));
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT);
    const { password, ...otherData } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(otherData);
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.cookie("access_token", "").status(200).json("logged out successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, signin, logout };
