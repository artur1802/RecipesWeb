import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";



export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="shadow-md w-full fixed top-0 z-10 left-0">
      <div className="md:flex items-center justify-between bg-gray-800 text-white py-4 md:px-10 px-7">
        <div className="font-bold text-2xl cursor-pointer flex items-center font-[poppings] text-white">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9 mr-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
</svg>


          <Link to="/" className="font-bold text-white text-2xl">Dante's Recipes</Link>
        </div>

        <div className="md-flex md:items-center text-xl">
          <Link className="text-white md:ml-8 hover:text-blue-300 duration-500" to="/">Home</Link>
          <Link className="text-white md:ml-8 hover:text-blue-300 duration-500" to="/create-recipe">Create Recipe</Link>
          
          {!cookies.access_token ? (
            <Link className="text-white md:ml-8 hover:text-blue-300 duration-500" to="/login">Login/Register</Link>
          ) : (
            <>
              <Link className="text-white md:ml-8 hover:text-blue-300 duration-500" to="/saved-recipes">Saved Recipes</Link>
              <Link className="text-white md:ml-8 hover:text-blue-300 duration-500" onClick={logout}>Logout</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}