require('dotenv').config();
const express=require('express');
const bodyParser=require('body-parser')
const { default: mongoose } = require('mongoose');
const shortID=require('short-uuid')
const cors=require('cors')
const jwt=require('jsonwebtoken')

const User=require('./models/userModel')
const Url=require('./models/urlModel')

const app=express()

app.use(express.json())
app.use(bodyParser.json())
app.use(cors({credentials: true}))


const key=process.env.SCERECT_KEY


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
        if (newUser){
            const token=jwt.sign({email:newUser.email,userId:newUser._id,username:newUser.username},key,{expiresIn:'1h'})
                // res.status(200).send('Log in')
            res.json({token,email:newUser.email,userId:newUser._id})
        }else{
            res.status(401).send('User not found')
        }
        // res.status(201).send('New User Created');
        
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
                const token=jwt.sign({email:logOk.email,userId:logOk._id,username:logOk.username},key,{expiresIn:'1h'})
                // res.status(200).send('Log in')
                res.json({token,email:logOk.email,userId:logOk._id})
            }else{
                res.status(401).send('User not found')
            }

        }catch(err){
            res.status(400).send(err.massage)
        }
})


app.post('/shortenurl',async(req,res)=>{
    try{
        const {originalUrl,userToken}=req.body
        const userId=userToken.userId
        console.log(userId)
        const shortUrl=shortID.generate()

        const newUrl=new Url({originalUrl,shortUrl,userID:userId})
        await newUrl.save()
        // console.log(newUrl)
        res.status(200).json({newUrl})

    }catch(err){
        res.status(400).send(err.massage)
    }
})

app.get('/api/:shortUrl',async (req,res)=>{
    try{
        const {shortUrl}=req.params
        const urlData=await Url.findOne({shortUrl})
        // console.log(urlData)
        if(urlData){
            // res.status(201).send(urlData.originalUrl)
            res.redirect(urlData.originalUrl)
        }else{
            res.status(400).send('url not found')
        }

    }catch(err){
        res.status(400).send(err.massage)
    }


})


app.post('/allurl', async (req, res) => {
    const {token} = req.body;

    // console.log(token)

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, key); 
        const userId = decoded.userId;

        const allUrls = await Url.find({ userID: userId });
        res.json({ allUrls });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.delete('/:id',async (req,res)=>{

    const {id}=req.params

    try{
        const deleteUrl=await Url.findByIdAndDelete(id)
        if(deleteUrl){
            res.json({massage:'Delete succesfully'})
        }else[
            res.json({massage:"url not found"})
        ]
        
    }catch(err){
        res.status(400).json({msg:"internal server error"})
    }
})

app.get('/',(req,res)=>{
    res.json("msg: backend running")
})


const PORT=process.env.PORT || 5000
app.listen(PORT,()=>console.log(`server running at ${PORT}`))
