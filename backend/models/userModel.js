const mongoose=require('mongoose')

const schema=mongoose.Schema();

const userSchema=new schema({

    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    createDate:{type:Date,default:Date.now}

})

const User=mongoose.model('User',userSchema)

module.exports=User
