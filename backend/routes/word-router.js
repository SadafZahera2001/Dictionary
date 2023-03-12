// Import the necessary controller methods
import { search, delete_word, update, insert } from '../controller/word-controller.js';

// Import the necessary modules
import express from 'express';
import cors from 'cors';

// Create a new router instance
const router = express.Router();

// Create the routes
router.get("/search", cors() ,search); // Route to search for a word in the database
router.post("/insert", cors() ,insert); // Route to insert a new word into the database
router.delete("/delete", cors() ,delete_word); // Route to delete a word from the database
router.post("/update", cors() ,update); // Route to update the meaning of a word in the database

// Export the router for use in other files
export default router;
