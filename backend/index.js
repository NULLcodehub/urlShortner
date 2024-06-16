require('dotenv').config();
const express=require('express');
const { default: mongoose } = require('mongoose');
const shortID=require('short-uuid')

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

app.post('/login',async(req,res)=>{

        try{

            const {email,password}=req.body;
            const logOk= await User.findOne({email,password})
            console.log(logOk)
            if(logOk){
                res.status(200).send('Log in')
            }else{
                res.status(401).send('User not found')
            }

        }catch(err){
            res.status(400).send(err.massage)
        }
})


app.post('/shorten',async(req,res)=>{
    try{
        const {originalUrl}=req.body
        const shortUrl=shortID.generate()

        const newUrl=new Url({originalUrl,shortUrl})
        await newUrl.save()
        res.status(200).send('New Url saved')

    }catch(err){
        res.status(400).send(err.massage)
    }
})

app.get('/:shortUrl',async (req,res)=>{
    try{
        const {shortUrl}=req.params
        const urlData=await Url.findOne({shortUrl})
        console.log(urlData)
        if(urlData){
            res.status(201).send(urlData.originalUrl)
        }else{
            res.status(400).send('url not found')
        }

    }catch(err){
        res.status(400).send(err.massage)
    }


})




app.get('/',(req,res)=>{
    res.json("msg: backend running")
})


const PORT=process.env.PORT || 5000
app.listen(PORT,()=>console.log(`server running at ${PORT}`))
