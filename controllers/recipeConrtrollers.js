const recipes = require('../models/recipeModel')

// getAllRecipes
exports.getAllRecipesController = async (req, res) => {
    console.log("inside getAllRecipesController");
    try {
        const allRecipes = await recipes.find()
        res.status(200).json(allRecipes)

    } catch (err) {
        res.status(401).json(err)
    }
}

// getARecipe
exports.getARecipeController = async (req, res) => {
    console.log("inside getARecipeController");
    const {id} = req.params
    try {
        const viewRecipe = await recipes.findOne({_id:id})
        res.status(200).json(viewRecipe)
    } catch (err) {
        res.status(401).json(err)
    }
}

// getRelatedRecipes
exports.getRelatedRecipeController = async (req, res) => {
    console.log("inside getRelatedRecipeController");
    const searchCuisine = req.query.cuisine
    const query = {
        cuisine:{
            $regex:searchCuisine,$options:"i"
        }
    }
    try {
        const allRelatedRecipes = await recipes.find(query)
        res.status(200).json(allRelatedRecipes)

    } catch (err) {
        res.status(401).json(err)
    }
}

// addRecipeController
exports.addRecipeController = async (req,res)=>{
    console.log("Inside addRecipeController");
    const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType} = req.body
    try {
        const existingRecipe = await recipes.findOne({name})
        if (existingRecipe) {
            res.status(406).json("Recipe Already exist!!! Please Add Another")
        }else{
            const newRecipe = new recipes({
                name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType
            })
            await newRecipe.save()
            res.status(200).json(newRecipe)
        }
    } catch (err) {
        res.status(401).json(err)
    }
    
}

// edit recipe
exports.editRecipeController = async (req,res)=>{
    console.log("Inside editRecipeController");
    const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType} = req.body
    const {id} = req.params
    try{
        const updateRecipe = await recipes.findByIdAndUpdate({_id:id},{
            name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType
        },{new:true})
        await updateRecipe.save()
        res.status(200).json(updateRecipe)
    }catch(err){
        res.status(401).json(err)
    }
}

// removeRecipe
exports.removeRecipeController = async (req,res)=>{
    console.log("Inside removeRecipeController");
    const {id} = req.params
    try{
        const removeItem = await recipes.findByIdAndDelete({_id:id})
        res.status(200).json(removeItem)
    }catch(err){
        res.status(401).json(err)
    }
    
}
