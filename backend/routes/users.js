const express = require('express');
const { getUser, update, deleteUser, follow, unFollow } = require('../controllers/user');
const verifyToken=require('../verifyToken')

const router=express.Router();

//verifyToken is a function to verify if the user is logged in or not


router.put('/:id',verifyToken,update); // update user
router.get('/find/:id',getUser); // get user
router.delete('/:id',verifyToken,deleteUser); // delete user
router.put('/follow/:id',verifyToken,follow); // follow a user
router.put('/unfollow/:id',verifyToken,unFollow); //unfollow a user

module.exports=router;