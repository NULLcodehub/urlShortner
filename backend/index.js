require('dotenv').config();

const express=require('express')

const app=express()

app.use(express.json())



// routes



app.get('/',(req,res)=>{
    res.json("msg: backend running")
})


const PORT=process.env.PORT || 5000
app.listen(PORT,()=>console.log(`server running at ${PORT}`))
