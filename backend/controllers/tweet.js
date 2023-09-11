const handleError = require("../error");
const Tweet = require("../models/Tweet");
const UserModel = require("../models/User");

const createTweet = async (req, res, next) => {
  try {
    const newTweet = new Tweet(req.body);
    await newTweet.save();
    res.status(201).json(newTweet);
  } catch (err) {
    next(err);
  }
};

const editTweet = async (req, res, next) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (tweet.userId === req.user.id) {
      const newTweet = await Tweet.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(newTweet);
    } else {
      res.status(401).json("you are not authorized to edit this tweet");
    }
  } catch (error) {
    next(error);
  }
};

const deleteTweet = async (req, res, next) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (tweet.userId === req.user.id) {
      await tweet.deleteOne();
      res.status(200).json("tweet has been deleted");
    } else {
      res.status(401).json("you are not authorized to delete this tweet");
    }
  } catch (err) {
    next(err);
  }
};

const like_Dislike = async (req, res, next) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet.likes.includes(req.body.id)) {
      await tweet.updateOne({
        $push: {
          likes: req.body.id,
        },
      });
      // console.log(req.body.id);
      res.status(200).json("tweet has been liked");
      // res.json("liked")
      // res.json(tweet);
    } else {
      await tweet.updateOne({
        $pull: {
          likes: req.body.id,
        },
      });
      // console.log("disliked");
      res.status(200).json("tweet has been disliked");
      // res.json("disliked")
      // res.json(tweet);
    }
  } catch (error) {
    next(error);
  }
};

const getTimelineTweets = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);
    let userTweets = await Tweet.find({ userId: user._id });
    let followersTweets = await Promise.all(
      user.following.map((followerId) => {
        return Tweet.find({ userId: followerId });
      })
    );
    let newFollowersTweets = followersTweets;
    if (newFollowersTweets.length === 0) {
      if (userTweets.length === 0) {
        res.status(200).json([]);
      } else {
        userTweets = userTweets.sort((a, b) => {
          return -1 * (a.createdAt - b.createdAt);
        });
        res.status(200).json(userTweets);
      }
    } else {
      let concatTweets = userTweets.concat(...newFollowersTweets);
      concatTweets = concatTweets.sort((a, b) => {
        return -1 * (a.createdAt - b.createdAt);
      });
      res.status(200).json(concatTweets);
    }

    // res.status(200).json(newFollowersTweets);

    // followersTweets = followersTweets.sort({createdAt: -1});

    // res.send("hello");
  } catch (error) {
    next(error);
  }
};

const getUserTweets = async (req, res, next) => {
  try {
    const userTweets = await Tweet.find({ userId: req.params.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(userTweets);
  } catch (error) {
    next(error);
  }
};

const getExploreTweets = async (req, res, next) => {
  try {
    const getExploreTweets = await Tweet.find({}).sort({ createdAt: -1 });

    res.status(200).json(getExploreTweets);
  } catch (err) {
    handleError(500, err);
  }
};

module.exports = {
  createTweet,
  deleteTweet,
  editTweet,
  like_Dislike,
  getTimelineTweets,
  getUserTweets,
  getExploreTweets,
};
