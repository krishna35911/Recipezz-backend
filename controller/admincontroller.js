const recipes=require('../model/recipeschema')
const approvedRecipes=require('../model/approverecipeschema')
const rejectedrecipes=require('../model/rejectedrecipes')
const mongoose = require('mongoose');
const adminschema=require('../model/adminschema')
const jwt=require('jsonwebtoken')


exports.adminregister=async(req,res)=>
{
  // console.log('inside admin');
  // res.status(200).json('added')
  const profileimg=req.file.filename
  const{username,adminemail,adminpassword}=req.body
    try {
      const newadmin=new adminschema({
        username,
        adminemail,
        adminpassword,
        profileimg
      })
      await newadmin.save()
      res.status(200).json(newadmin)
    } catch (error) {
      res.status(401).json(`${error}`)
    }
  
}

exports.adminlogin=async(req,res)=>
{
  const {adminemail,adminpassword}=req.body

  const adminuser=await adminschema.findOne({adminemail,adminpassword})
  try {
    if(adminuser)
    {
      const admintoken=jwt.sign({adminid:adminuser._id},"krishnasecretkey")
      res.status(200).json({adminuser,admintoken})
    }
  } catch (error) {
    console.log(error);
  }
}

exports.getadminrecipes=async(req,res)=>
{
    // console.log('get request');
    // res.status(200).json('received request')

    try {
        const adminrecipes=await recipes.find()
        res.status(200).json(adminrecipes)
    } catch (error) {
        res.status(401).json(`${error}`)
    }
}

exports.approveRecipe = async (req, res) => {
    try {
      const { recipeId } = req.params;
      const approvedRecipe = await recipes.findByIdAndUpdate(recipeId, { status: 'approved' }, { new: true });
      res.status(200).json(approvedRecipe);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  exports.addtoapproved = async (req, res) => {
    try {
      const { recipeId } = req.params;
  
      const originalRecipe = await recipes.findById(recipeId);
  
      if (!originalRecipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
     const approvedRecipe = new approvedRecipes({
        recipeimg: originalRecipe.recipeimg,
        title: originalRecipe.title,
        description: originalRecipe.description,
        serve: originalRecipe.serve,
        time: originalRecipe.time,
        ingredients: originalRecipe.ingredients,
        steps: originalRecipe.steps,
        userid: originalRecipe.userid,
        username: originalRecipe.username,
        status: 'approved', // Set the status to 'approved'
      });
  
      const savedApprovedRecipe = await approvedRecipe.save();

  
      res.status(200).json(savedApprovedRecipe);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  exports.dltapprovedrecipes=async(req,res)=>
  {
    const {recipeId}=req.params
    try {
      const removeapproved=await recipes.findByIdAndDelete({_id:recipeId})
      res.status(200).json(removeapproved)
    } catch (error) {
      console.log(error);
    }
  }

  exports.addtorejected = async (req, res) => {
    try {
      const { recipeId } = req.params;
      
      const originalRecipe = await recipes.findById(recipeId);
  
      if (!originalRecipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }

      const existingrejected=await rejectedrecipes.findOne({originalrecipeid:recipeId})
      if(existingrejected)
      {
        return res.status(406).json('already exists')
      }
     const rejected = new rejectedrecipes({
        originalrecipeid:originalRecipe._id,
        recipeimg: originalRecipe.recipeimg,
        title: originalRecipe.title,
        description: originalRecipe.description,
        serve: originalRecipe.serve,
        time: originalRecipe.time,
        ingredients: originalRecipe.ingredients,
        steps: originalRecipe.steps,
        userid: originalRecipe.userid,
        username: originalRecipe.username,
        status: 'rejected', // Set the status to 'approved'
      });
  
          await rejected.save();
          await recipes.findByIdAndUpdate(recipeId, { status: 'rejected' });
  
      res.status(200).json(rejected);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  exports.getadmindetails=async(req,res)=>
  {
    try {
      const admin=await adminschema.find()
      res.status(200).json(admin)
    } catch (error) {
      res.status(401).json(error)
    }
  }

  exports.editaminprofile = async (req, res) => {
    console.log('inside controller');
    const {adminid} = req.payload;
    const { username, email, password } = req.body;  
    try {
      const updateprofile = await adminschema.findByIdAndUpdate(
        { _id: adminid },
        { username, email, password },
        { new: true }
      );
  
      await updateprofile.save()
      res.status(200).json(updateprofile);
    } catch (err) {
      res.status(401).json(`${err}`);
    }
  };