require('dotenv').config();
const express=require('express');
const { default: mongoose } = require('mongoose');

const User=require('./models/userModel')
const Url=require('./models/urlModel')

const app=express()

app.use(express.json())

//data connection
mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log('database connedted')
}).catch((err)=>{
    console.log("database fail to connect",err)
})

// routes

app.post('/signup',async (req,res)=>{
    try{
        const {username,email,password}=req.body
         
        const newUser=new User({username,email,password})
        await newUser.save();
        res.status(201).send('New User Created');
        
    }catch(err){
        res.status(400).send(err.massage);
    }

})





app.get('/',(req,res)=>{
    res.json("msg: backend running")
})


const PORT=process.env.PORT || 5000
app.listen(PORT,()=>console.log(`server running at ${PORT}`))
