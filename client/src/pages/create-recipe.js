

import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID.js";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

 export const CreateRecipe = () => {
 const userID = useGetUserID();
 const [cookies, _] = useCookies(["access_token"]);
 const [recipe, setRecipe] = useState({
  name: "",
  ingredients: [],
  instructions: "",
  imageUrl: "",
  cookingTime: 0,
  userOwner: userID,
});



const navigate = useNavigate();

  const handleChange = (event) => {
   const { name, value } = event.target;
   // while I'm typing the value will be added in the recipe,that's why i use setRecipe and the ...recipe means that i want 
   //the recipe be as it is and only change the field name with the [name]:value name is the name in input 
  setRecipe({ ...recipe, [name]: value });
};

 const handleIngredientChange = (event, index) => {
   const { value } = event.target;
    const ingredients = [...recipe.ingredients];
   ingredients[index] = value;
setRecipe({ ...recipe, ingredients });
 };

  const handleAddIngredient = () => {
    const ingredients = [...recipe.ingredients, ""];     
    setRecipe({ ...recipe, ingredients });
  };

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:3001/recipes", recipe,
       
       {
        headers: { authorization: cookies.access_token },
        }
      );

      alert("Recipe Created");
      navigate("/");
    } catch (error) {
     console.error(error);
   }
  };



  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-4 mt-20 text-center">Create Recipe</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="font-bold">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={recipe.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 mt-2 focus:outline-none focus:border-blue-500"
          />
        </div>
       
        <div className="flex justify-between">
          <label htmlFor="ingredients" className="font-bold">
            Ingredients
          </label>
          <button
            type="button"
            onClick={handleAddIngredient}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 focus:outline-none focus:shadow-outline"
          >
            Add Ingredient
          </button>
        </div>
        {recipe.ingredients.map((ingredient, index) => (
          <input
            key={index}
            type="text"
            name="ingredients"
            value={ingredient}
            onChange={(event) => handleIngredientChange(event, index)}
            className="w-full border border-gray-300 rounded px-4 py-2 mt-2 focus:outline-none focus:border-blue-500"
          />
        ))}
        <div>
          <label htmlFor="instructions" className="font-bold">
            Instructions
          </label>
          <textarea
            id="instructions"
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 mt-2 focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>
        <div>
          <label htmlFor="imageUrl" className="font-bold">
            Image URL
          </label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={recipe.imageUrl}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 mt-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="cookingTime" className="font-bold">
            Cooking Time (minutes)
          </label>
          <input
            type="number"
            id="cookingTime"
            name="cookingTime"
            value={recipe.cookingTime}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 mt-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-1 mb-2 focus:outline-none focus:shadow-outline"
          >
            Create Recipe
          </button>
        </div>
      </form>
    </div>
  );

};