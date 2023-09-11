const mongoose = require('mongoose')


const tweetSchema=new mongoose.Schema({
    userId:{
        type: String,
        required:true
    },
    description:{
        type:String,
        required:true,
        max:300
    },
    likes:{
        type: Array,
        defaultValue:[]
    },
},{
    timestamps:true
})

const Tweet=mongoose.model('Tweet',tweetSchema)

module.exports=Tweet