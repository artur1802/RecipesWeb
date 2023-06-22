import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();


// async calll back function 
router.post("/register",async (req, res) => {

// grab the value that come in the body from the client request
    const { username, password } = req.body;
    // FInd a user where the username of that user is equal to the username variable, 
    //in javascrit when the value and the key are the same we can shorten it to findOne({username})
    //whenever i'm making any request to my db it will return a promise, so i can use .then() .catch() notation or 
    //asyn await notation like this code
    const user = await UserModel.findOne({username:username});
    // I'm gonna send back the user that we found 

    if(user){

        return res.json({ message:"User already exist!"});
    }
// create a new version of the password that is now hashed 
    const hashedPassword = await bcrypt.hash(password,10);
// Addind the new user to database using mongoose
    const newUser = new UserModel({username,password:hashedPassword});
    await newUser.save();
    res.json({message:"User registered succesfully"});

});

//When I want to log into an application i want to create what is known as a token which is going to represent my login sesion
// then i want to send that back to the front end and whenever a user in the front end makes a request  they need to prove that
//they are the original usrs  that were logged in so the should send that token to the req and every time you make a 
//a req i should validate to see if they are the authenticated user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user based on the provided username
    const user = await UserModel.findOne({ username });

    // Check if the user exists
    if (!user) {
      // If the user doesn't exist, return an error response
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Check if the password is valid
    if (!isPasswordValid) {
      // If the password is invalid, return an error response
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JSON Web Token (JWT) containing the user ID
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Return the token and the user ID in the response
    res.json({ token, userID: user._id });
  } catch (error) {
    // If an error occurs during the login process, handle the error
    console.error("Login error:", error);
    res.status(500).json({ message: "An error occurred during login" });
  }
});



export { router as userRouter };

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      jwt.verify(authHeader, "secret", (err) => {
        if (err) {
          return res.sendStatus(403);
        }
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };