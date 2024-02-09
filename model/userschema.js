// import mongoose
const mongoose=require('mongoose')


// create schema
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})

// create model
const usermodel=mongoose.model("users",userSchema)

module.exports=usermodel