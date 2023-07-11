import express from "express";
const app = express();
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Import Routes
import postsRoute from "./routes/posts";

app.use("/posts", postsRoute);

// ROUTES
app.get('/', (req, res) => {
  res.send('We are on home');
});

// Connect To DB
const CONNECTION = process.env.DB_CONNECTION || "";
mongoose.connect(CONNECTION);

// How to we start listening to the server
app.listen(4000);
