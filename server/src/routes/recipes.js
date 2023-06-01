import express from "express";
import { RecipesModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./users.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await RecipesModel.find({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/",verifyToken, async (req, res)=>{

  const recipe = new RecipesModel(req.body);
  try{
const response = await recipe.save();
res.json(response);

  }catch(err){

    res.json(err);
  }
});
// adding saved recipes to users
router.put("/", verifyToken, async (req, res)=>{


  try{
    const recipe =await RecipesModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);
    user.savedRecipes.push(recipe);
    await user.save();
    res.json({savedRecipes : user.savedRecipes})

  }catch(err){

    res.json(err);
  }
});

// Get a list of all recipes Id's that the user who is logged in have saved 
router.get("/savedRecipes/ids/:userID",async (req,res) => {

  try{
const user = await UserModel.findById(req.params.userID);
res.json({savedRecipes : user?.savedRecipes});
  }catch(err){
    res.json(err);
  }
});
// delete one recipe
router.delete('/:recipeID', async (req, res) => {
  const { recipeID } = req.params;

  try {
    await RecipesModel.findByIdAndDelete(recipeID);
    console.log('Deleted recipe');
    res.json('Deleted');
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//Edit recipe

router.put("/:id", verifyToken, async (req, res) => {
  const recipeID = req.params.id;
  const updatedRecipe = req.body;

  try {
    const recipe = await RecipesModel.findById(recipeID);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    // Verificar si el usuario actual es el propietario de la receta
    if (recipe.userOwner !== req.user.id) {
      return res.status(403).json({ error: "You are not allowed to edit this recipe" });
    }

    const updatedRecipeData = { ...recipe.toObject(), ...updatedRecipe };
    const updatedRecipeObj = await RecipesModel.findByIdAndUpdate(
      recipeID,
      updatedRecipeData,
      { new: true }
    );

    res.status(200).json(updatedRecipeObj);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/savedRecipes/:userID",async (req,res) => {

  try{
const user = await UserModel.findById(req.params.userID);
//find the id inside the list of user.savedRecipes
const savedRecipes = await RecipesModel.find({
  _id:{ $in: user.savedRecipes}
})
res.json({savedRecipes});
  }catch(err){
    res.json(err);
  }
});
export { router as recipesRouter };