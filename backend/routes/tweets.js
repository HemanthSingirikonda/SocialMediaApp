const express= require('express');
const verifyToken = require('../verifyToken');
const { createTweet, deleteTweet, editTweet, like_Dislike, getTimelineTweets, getUserTweets, getExploreTweets } = require('../controllers/tweet');


const router=express.Router();

router.post('/',verifyToken,createTweet);//post a tweet
router.delete('/:id',verifyToken,deleteTweet);//delete a tweet
router.put('/:id',verifyToken,editTweet) //edit a tweet
router.put('/lod/:id',like_Dislike); //like or dislike a tweet
router.get('/timeline/:id',getTimelineTweets)//get the feed for a user
router.get('/user/all/:id',getUserTweets)//get only the user tweets
router.get("/explore", getExploreTweets);//get explore tweets

module.exports = router;