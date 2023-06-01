import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export default function LoginPage() {


    //we only need to have access to the setCookie function that sets a cookie 
    const [_, setCookies] = useCookies(["access_token"]);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const result = await axios.post("http://localhost:3001/login/login", {
                username,
                password,
            });
            //we want to set the access token cookie to have a value of response.data.token, the cookie will have the value that come in the token's response
            setCookies("access_token", result.data.token);

            console.log(result);
            // we want to store our user ID that were're sending back inside of our local storage for quick access to it 
            window.localStorage.setItem("userID", result.data.userID);
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="mt-4 grow flex items-center justify-around">

            <div className="mb-64">

                <h2 className=" text-4xl font-bold mb-4 mt-20 text-center ">Login</h2>
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
                    <button  className=" mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-2 rounded-lg shadow-md"  type="submit">Login</button>
                    <div className="text-center py-2 text-gray-500">
                        Don't have an account yet? <Link className="underline text-black" to={'/register'}>Register now</Link>
                    </div>
                    </div>
                </form>
            </div>
        </div>
    );
};


