// import express
const express=require('express')

// import usercontroller
const usercontroller=require('../controller/usercontroller')

const recipecontroller=require('../controller/recipecontroller')

const admincontroller=require('../controller/admincontroller')

const jwtMiddleware=require('../Middlware/jwt')
const adminmiddlware=require('../Middlware//adminmiddleware')


const multerConfig=require('../Middlware/multer')

// object for router
const router=new express.Router()

// path to resolve the request
// 1)register
router.post('/register',usercontroller.register)

// 2)login
router.post('/login',usercontroller.login)

// 3)add recipes
router.post('/recipes',jwtMiddleware,multerConfig.single('recipeimg'),recipecontroller.addrecipes)

// 4)get admin recipes
router.get('/recipes/adminrecipes',admincontroller.getadminrecipes)

router.put('/recipes/approve/:recipeId', admincontroller.approveRecipe);

router.post('/recipes/addtoapproved/:recipeId',admincontroller.addtoapproved)

router.delete('/recipes/dltrecipes/:recipeId',admincontroller.dltapprovedrecipes)

router.post('/recipes/rejected/:recipeId',admincontroller.addtorejected)

router.get('/recipes/approved',recipecontroller.getapprovedrecipes)

router.get('/recipes/rejected',recipecontroller.getrejecetdrecipes)

 router.get('/recipes/pending',recipecontroller.getpendingrecipes)

 router.get('/recipes/userrecipes/:userid',jwtMiddleware,recipecontroller.getAllUserRecipes)

 router.post('/admin/register',multerConfig.single('profileimg'),admincontroller.adminregister)

 router.post('/admin/login',admincontroller.adminlogin)

 router.get('/user/count',usercontroller.getusercount)

router.get('/allrecipes',recipecontroller.getallrecipescount)

router.get('/admindetails',admincontroller.getadmindetails)

router.put('/user/edit',jwtMiddleware,usercontroller.edituserprofile)

router.put('/admin/edit',adminmiddlware,admincontroller.editaminprofile)

router.post('/recipes/addtosaved/:recipeId/:userid',jwtMiddleware,recipecontroller.addtosaved)

router.get('/userdetails',usercontroller.getuserdetails)

router.get('/recipes/saved/:userid',jwtMiddleware,recipecontroller.getsavedrecipes)

router.delete('/recipes/remove/:id',adminmiddlware,recipecontroller.delteapprovedrecipe)


// export router
module.exports=router