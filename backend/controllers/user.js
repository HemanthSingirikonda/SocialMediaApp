const handleError = require("../error");
const Tweet = require("../models/Tweet");
const User = require("../models/User");

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const newUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(newUser);
    } catch (error) {
      next(error);
    }
  } else {
    return next(handleError(403, "You can only update your own account"));
  }
};

const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      await Tweet.deleteMany({ userId: req.params.id });
      res
        .cookie("access_token", "")
        .status(200)
        .json("User deleted successfully");
    } catch (error) {
      next(error);
    }
  } else {
    return next(handleError(403, "You can only delete your own account"));
  }
};

const follow = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.id);

    if (!user.followers.includes(req.body.id)) {
      await user.updateOne({
        $push: {
          followers: req.body.id,
        },
      });

      await currentUser.updateOne({
        $push: {
          following: req.params.id,
        },
      });
    } else {
      res.status(403).json("you already follow this user");
    }
    const updatedCurrentUser = await User.findById(req.body.id);
    const { password, ...otherData } = updatedCurrentUser._doc;
    res.status(200).json(otherData);
    // res.status(200).json('successfully following the user')
  } catch (error) {
    next(error);
  }
};

const unFollow = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.id);

    if (currentUser.following.includes(req.params.id)) {
      await user.updateOne({
        $pull: {
          followers: req.body.id,
        },
      });

      await currentUser.updateOne({
        $pull: {
          following: req.params.id,
        },
      });
    } else {
      res.status(403).json("you are not following this user");
    }
    // res.status(200).json('successfully unfollowed the user')
    const updatedCurrentUser = await User.findById(req.body.id);
    const { password, ...otherData } = updatedCurrentUser._doc;
    res.status(200).json(otherData);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUser,
  update,
  deleteUser,
  follow,
  unFollow,
};
