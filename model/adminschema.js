// import mongoose
const mongoose=require('mongoose')


// create schema
const adminschema=new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    adminemail:{
        type:String,
        require:true
    },
    adminpassword:{
        type:String,
        require:true
    },
    profileimg:{
        type:String,
        require:true
    }
})

// create model
const admin=mongoose.model("admin",adminschema)

module.exports=admin