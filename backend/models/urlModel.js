const mongoose =require('mongoose')

const schema=mongoose.Schema()

const urlSchema=new schema({

    originalUrl:{type:String,required:true},
    shortUrl:{type:String,required:true},
    // userID:{type:mongoose.Schema.Types.ObjectId,ref:'User'}

})
const Url=mongoose.models('Url',urlSchema)

module.exports=Url