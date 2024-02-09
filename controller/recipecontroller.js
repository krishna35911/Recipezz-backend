const recipes=require('../model/recipeschema')
const approvedrecipes=require('../model/approverecipeschema')
const rejectedrecipes=require('../model/rejectedrecipes')
const savedrecipes=require('../model/savedrecipesschema')

// add recipes
exports.addrecipes=async(req,res)=>
{
    // console.log('inside login controller');
    // res.status(200).json('login request recieved')

    const {userid,username}=req.payload
    console.log(username);

    const recipeimg=req.file.filename
    const {title,description,serve,time,ingredients,steps}=req.body
    console.log(`${title}`);

    try {
        const mappedIngredients = ingredients.map(ingredient => ({
            name: ingredient.name,
            quantity: ingredient.quantity,
            unit: ingredient.unit,
          }));
          
          const mappedsteps = steps.map(step => ({
            number: step.number,
            description: step.description,
          }));
          
        const newrecipe=new recipes({
            recipeimg,title,description,serve,time,ingredients:mappedIngredients,steps:mappedsteps,userid,username
        })
        await newrecipe.save()
        res.status(200).json(newrecipe)
    } catch (error) {
        res.status(401).json(`${error}`)
    }
}

exports.getapprovedrecipes=async(req,res)=>
{
    // console.log('get request');
    // res.status(200).json('received request')
    

    try {
        const approved=await approvedrecipes.find()
        res.status(200).json(approved)
    } catch (error) {
        res.status(401).json(`${error}`)
    }
}

exports.getrejecetdrecipes=async(req,res)=>
{
    // console.log('get request');
    // res.status(200).json('received request')

    try {
        const rejected=await rejectedrecipes.find({status:'rejected'})
        res.status(200).json(rejected)
    } catch (error) {
        res.status(401).json(`${error}`)
    }
}

exports.getpendingrecipes=async(req,res)=>
{
    // console.log('get request');
    // res.status(200).json('received request')

    try {
        const pending=await recipes.find({status:'pending'})
        res.status(200).json(pending)
    } catch (error) {
        res.status(401).json(`${error}`)
    }
}

exports.getAllUserRecipes = async (req, res) => {
    const { userid } = req.payload; // Assuming userid is part of the payload
  
    try {
      const userRecipes = await Promise.all([
        recipes.find({ userid }), // Pending recipes
        approvedrecipes.find({ userid }),
        rejectedrecipes.find({ userid }),
      ]);
  
      const [pendingRecipes, approvedRecipes, rejectedRecipes] = userRecipes;
  
      const combined=[
        ...approvedRecipes,
        ...pendingRecipes,
        ...rejectedRecipes,
      ];
      res.status(200).json(combined);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  exports.getallrecipescount = async (req, res) => {
  
    try {
      const userRecipes = await Promise.all([
        recipes.countDocuments(), // Pending recipes
        approvedrecipes.countDocuments(),
        rejectedrecipes.countDocuments(),
      ]);
      const totalRecipes = userRecipes.reduce((n1,n2) => n1 + n2);

      res.status(200).json(totalRecipes)
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  exports.addtosaved = async (req, res) => {
    try {
      const { recipeId } = req.params;
      const {userid}=req.payload 
      const originalRecipe = await approvedrecipes.findById(recipeId);
  
      if (!originalRecipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
     const saved = new savedrecipes({
        recipeimg: originalRecipe.recipeimg,
        title: originalRecipe.title,
        description: originalRecipe.description,
        serve: originalRecipe.serve,
        time: originalRecipe.time,
        ingredients: originalRecipe.ingredients,
        steps: originalRecipe.steps,
        userid,
        username: originalRecipe.username,
      });
  
      const added = await saved.save();

  
      res.status(200).json(added);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  exports.getsavedrecipes = async (req, res) => {
    const { userid } = req.payload; // Assuming userid is part of the payload
  
    try {
      const getsaved = await savedrecipes.find({userid})

      res.status(200).json(getsaved);
    } catch (error) {
      console.log(`${error}`);
    }
  };

  exports.delteapprovedrecipe=async(req,res)=>
{
    const {id}=req.params
    try {
        const removeproject=await approvedrecipes.findByIdAndDelete({_id:id})
        res.status(200).json(removeproject)
    } catch (err) {
        res.status(401).json(err)
    }
}
  