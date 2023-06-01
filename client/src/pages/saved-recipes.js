import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const SavedRecipes = () => {
  // State to store the saved recipes
  const [savedRecipes, setSavedRecipes] = useState([]);

  // Get the current user ID using a custom hook
  const userID = useGetUserID();

  // State to store the selected recipe
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    // Async function to fetch saved recipes for the user
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userID}`
        );
        // Update the state with the saved recipes
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    // Call the function to fetch saved recipes when the component mounts
    fetchSavedRecipes();
  }, []);

  // Handle click on a saved recipe card
  const handleCardClick = (recipe) => {
    // Set the selected recipe in the state
    setSelectedRecipe(recipe);
  };

  // Handle click on the back button
  const handleBackButtonClick = () => {
    // Deselect the recipe
    setSelectedRecipe(null);
  };

  return (
    <div className="container mt-20 mx-auto py-10">
      {selectedRecipe ? (
        // Display details of the selected recipe
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
          <h2 className="text-3xl font-bold mb-4">{selectedRecipe.name}</h2>
          <div className="mb-4">
            <img
              className="w-full h-56 object-cover object-center rounded-lg"
              src={selectedRecipe.imageUrl}
              alt={selectedRecipe.name}
            />
          </div>
          <p className="text-gray-700 mb-2">
            Cooking Time: {selectedRecipe.cookingTime} minutes
          </p>
          <div className="text-gray-700">
            <h3 className="text-xl font-bold mb-2">Ingredients:</h3>
            <ul>
              {selectedRecipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <h3 className="text-xl font-bold mt-4 mb-2">Instructions:</h3>
            <p>{selectedRecipe.instructions}</p>
          </div>
          <button
            onClick={handleBackButtonClick}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Back
          </button>
        </div>
      ) : (
        // Display the saved recipe cards
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {savedRecipes.map((recipe) => (
            <div
              key={recipe._id}
              className="bg-white rounded-lg shadow-md p-4 cursor-pointer max-w-xs hover:scale-105 transform transition duration-300"
              onClick={() => handleCardClick(recipe)}
            >
              <div className="mb-2">
                <h2 className="text-xl font-semibold">{recipe.name}</h2>
                <p className="text-gray-600">{recipe.description}</p>
                <p className="mt-2">Cooking Time: {recipe.cookingTime} minutes</p>
              </div>
              <div>
                <img src={recipe.imageUrl} alt={recipe.name} className="w-full rounded-md" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};












