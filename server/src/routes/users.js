import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";

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

router.post("/login", async (req,res) => {
    const {username, password } =req.body;

    const user = await UserModel.findOne({username});

    //if the user is no found then i can't log in
if(!user){
    return res
      .status(400)
      .json({ message: "Username or password is incorrect" });
}
// I need to see if the password that i have match the password that is on the database
//i cant unhush a password that is already hashed so when i send a password hashed to the database i can't never know what the password originally was
// so to know if the password that i'm inputting is the correct password is we can hash the password that was inputted and compare it with the password in the database
const isPasswordValid = await bcrypt.compare(password, user.password);
if(!isPasswordValid){
    return res.status(400).json({message: "Username or Password is incorrect"});

}
// our token will be a string of number and letter the will be converted to the _id data and the secret 
//is important because it should be used whenever you want to verify if the user is really authenticated 
// it's inportant to put the secret in an enviroment variable and using it 
const token = jwt.sign({id: user._id}, "secret");
//  send back the token and the user id
res.json({token,userID: user._id});

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