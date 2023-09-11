const mongoose = require('mongoose');

const UserSchema=new  mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    profile:{
        type:String
    },
    followers:{
        type: Array,
        defaultValue:[]
    },
    following:{
        type: Array,
        defaultValue:[]
    },
    description:{
        type: String
    }
},{
    timestamps: true
});

const UserModel=mongoose.model("User",UserSchema);

module.exports=UserModel;