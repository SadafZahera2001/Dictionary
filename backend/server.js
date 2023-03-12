// Import the required packages
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/word-router.js'
import dotenv from 'dotenv';

dotenv.config({path: "./config.env" })
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/dictionary", router);

mongoose.set('strictQuery', true)
  .connect(process.env.MONGO_URL)
  .then(() => app.listen(process.env.PORT))
  .then(() => {
    console.log("dataBase connected and listening to port 3000");
  })
  .catch((error) => {
    console.log(`Error connecting DataBase with error code ${error}`)
  });