import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID.js";
import axios from "axios";
import { useCookies } from "react-cookie";

export const Home = () => {
  const [recipes, setRecipes] = useState([]); // State to store recipes
  const [savedRecipes, setSavedRecipes] = useState([]); // State to store saved recipes
  const [selectedRecipe, setSelectedRecipe] = useState(null); // State to store the selected recipe
  const [cookies, _] = useCookies(["access_token"]); // Using react-cookie to get and set cookies
  const userID = useGetUserID(); // Custom hook to get the user ID

  useEffect(() => {
    // Initial loading effect
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes"); // Get recipes from the API
        const modifiedRecipes = response.data.map((recipe) => ({
          ...recipe,
          isSaved: isRecipeSaved(recipe._id), // Check if the recipe is saved
        }));
        setRecipes(modifiedRecipes); // Update state with modified recipes
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        ); // Get saved recipes of the user
        setSavedRecipes(response.data.savedRecipes); // Update state with saved recipes
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    if (cookies.access_token) fetchSavedRecipes(); // Get saved recipes if there is an access token
  }, []);

  const saveRecipe = async (recipeID) => {
    // Save a recipe
    try {
      const response = await axios.put(
        "http://localhost:3001/recipes",
        {
          recipeID,
          userID,
        },
        { headers: { authorization: cookies.access_token } }
      );
      setSavedRecipes(response.data.savedRecipes); // Update state with saved recipes
    } catch (err) {
      console.log(err);
    }
  };

  const deleteRecipe = async (recipeID) => {
    // Delete a recipe
    try {
      await axios.delete(`http://localhost:3001/recipes/${recipeID}`, {
        headers: { authorization: cookies.access_token },
      });
      const response = await axios.get('http://localhost:3001/recipes');
      const updatedRecipes = response.data.map((recipe) => ({
        ...recipe,
        isSaved: isRecipeSaved(recipe._id),
      }));
      setRecipes(updatedRecipes); // Update state with updated recipes
      setSelectedRecipe(null); // Deselect the recipe
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id); // Check if a recipe is saved

  const handleCardClick = (recipe) => {
    // Handle click on a recipe card
    const modifiedRecipe = {
      ...recipe,
      isSaved: isRecipeSaved(recipe._id),
    };
    setSelectedRecipe(modifiedRecipe); // Set the selected recipe in the state
  };

  const handleBackButtonClick = () => {
    // Handle click on the back button
    setSelectedRecipe(null); // Deselect the recipe
  };

  return (
    <div className="container mt-20 mx-auto py-10">
      {selectedRecipe ? (
        // Display the details of the selected recipe
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
            <p>{selectedRecipe.ingredients.join(", ")}</p>

            <h3 className="text-xl font-bold mb-2">Instructions:</h3>
            <p>{selectedRecipe.instructions}</p>
          </div>
          {selectedRecipe.userOwner === userID && (
            // Display the delete button if the user is the owner of the recipe
            <>
              <button
                onClick={() => deleteRecipe(selectedRecipe._id)}
                className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              >
                Delete
              </button>
            </>
          )}
          <button
            onClick={handleBackButtonClick}
            className="mt-4 bg-blue-500 hover:bg-blue-700 ml-2 text-white font-bold py-1 px-2 rounded"
          >
            Go Back
          </button>
        </div>
      ) : (
        // Display the available recipe cards
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:scale-105 transform transition duration-300"
              onClick={() => handleCardClick(recipe)}
            >
              <h3 className="text-xl font-bold mb-2">{recipe.name}</h3>
              <div className="mb-4">
                <img
                  className="w-full h-48 object-cover object-center rounded-lg"
                  src={recipe.imageUrl}
                  alt={recipe.name}
                />
              </div>
              <p className="text-gray-700 mb-2">
                Cooking Time: {recipe.cookingTime} minutes
              </p>
              {recipe.userOwner === userID && (
                // Display the delete button if the user is the owner of the recipe
                <>
                  <button
                    onClick={() => deleteRecipe(recipe._id)}
                    className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </>
              )}
              <button
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
                className={`bg-blue-500 hover:bg-blue-700 ml-2 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline ${
                  isRecipeSaved(recipe._id) ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
