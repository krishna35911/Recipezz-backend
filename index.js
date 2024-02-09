// import dotenv
require('dotenv').config()

// import express
const express=require('express')

// import cors
const cors=require('cors')

// import router
const router=require('./Routes/router')

// import connection file
require('./Database/connection')

// create server
const recipeServer=express()

// use cors by server
recipeServer.use(cors())

// middleware that converts json to javascript object
recipeServer.use(express.json())

// use router
recipeServer.use(router)

recipeServer.use('/fileuploads',express.static('./fileuploads'))


// port
const PORT=4000 || process.env.PORT

// run server
recipeServer.listen(PORT,()=>
{
    console.log(`server is running succesfully at port number ${PORT}`);
})

// get request
recipeServer.get('/',(req,res)=>
{
    res.send('post request')
})