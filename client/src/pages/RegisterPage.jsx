import React, { useState } from "react";
import axios from "axios";
// import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";




export const RegisterPage = () => {

  // while i'm tyoing in the input element the username and password, it's actually saving the value of what 
  // i type into this two states which will then send this data to our Api to actually register 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //const [_, setCookies] = useCookies(["access_token"]);
  //const navigate = useNavigate();
  const handleSubmit = async (event) => {
    //we want to prevent default, whenever we submit the form it won't refresh the page
    event.preventDefault();
    try {
      // in this post request I put the url, and the objec that it's gonna be the object for the body of the request with the username and password 
      await axios.post("http://localhost:3001/register/register", {
        username,
        password,
      });
      alert('registration completed! Now login.');
    } catch (err) {
      console.error(err);

    }

  };

  return (
    <div className="mt-4 grow flex items-center justify-around">

      <div className="mb-64">
        <h2 className=" text-4xl font-bold mb-4 mt-20 text-center" >Register</h2>
        <form className="max-w-md mx-auto " onSubmit={handleSubmit}>


          <label className="block text-gray-700 mt-10 text-xl font-bold mb-2" htmlFor="username">Username:</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />


          <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="password">Password:</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <div className="flex flex-col items-center">
            <button className=" mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-2 rounded-lg shadow-md" type="submit">Register</button>
            <div className="text-center py-2 text-gray-500">
              Already a member? <Link className="underline text-black" to={'/login'}>Login</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );


};
