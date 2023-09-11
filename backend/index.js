const express=require('express');
const cors=require('cors');
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const userRoutes=require('./routes/users');
const authRoutes=require('./routes/auth');
const tweetRoutes=require('./routes/tweets');
const cookieParser=require('cookie-parser');

const app=express();
dotenv.config();

app.use(cors({credentials:true,origin:'http://localhost:3000'}));

const connect=()=>{
    mongoose.connect(process.env.MONGO)
    .then(()=>{
        console.log('connected to mongodb database');
    })
    .catch((err)=>{throw err});
}

app.use(express.json())
app.use(cookieParser())
app.use('/api/users',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/tweets',tweetRoutes);


app.listen(8000,()=>{
    connect();
    console.log("app listening on port 8000");
});

