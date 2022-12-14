import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { default as authRouter } from "./routes/auth.js";
import { default as imageRouter } from "./routes/image.js";

dotenv.config();
const app = express();

const connectDB = async () => {
  await mongoose.connect(process.env.CONNECTION_STRING, () => {
    console.log("Connected to database!");
  });
};
connectDB();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

//routes
app.use("/v1/auth", authRouter);
app.use("/v1/image", imageRouter);

app.listen(8000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("server is running");
  }
});
