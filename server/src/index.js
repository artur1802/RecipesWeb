import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

import { userRouter} from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/login", userRouter);
app.use("/register", userRouter);
app.use("/recipes", recipesRouter);

mongoose.connect(
    process.env.MONGODB_URL,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );


app.listen(3001, () => console.log("Server started 3001"));

