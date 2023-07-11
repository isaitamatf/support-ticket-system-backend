import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

import { postsRoute } from "./routes";

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());

// ROUTES
app.use("/posts", postsRoute);

// CONNECT TO DATABASE
mongoose.connect(process.env.DB_CONNECTION || "")
  .then(() => {
    console.log(`DB is connected correctly -> ${process.env.DB_CONNECTION}`)
  })
  .catch((error) => {
    console.log('Error in the database connection -> ', error);
  });

app.listen(process.env.PORT, () => {
  console.log(`Port is listening successfully -> :${process.env.PORT}`);
});
