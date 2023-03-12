
import WordModel from '../model/Word.js';

//this function is for searching the required word in mongodb DataBase
export const search = async (req, res, next) => {
    const { word } = req.query;
  
    try {
      const wordData = await WordModel.findOne({ word: word });
      
      if (!wordData) {
        return res.status(404).json({ message: "Couldn't find the word in Db" });
      }
      console.log(wordData)
      return res.status(200).json({wordData});
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Failed to search for the word in the database' });
    }
};
  
export const insert = async (req, res, next) => {
    const { word, meaning } = req.body;
  console.log(req.body);
    // Check if the request body contains `word` and `meaning` keys
    if (!word || !meaning) {
      return res.status(400).json({ error: 'Request body should contain "word" and "meaning" keys' });
    }
  
    // Check if the word already exists in the database
    const wordAvailable = await WordModel.findOne({ word });
  
    if (wordAvailable) {
      return res.status(409).json({ message: 'Word already exists in Db' });
    }
  
    // Create a new Word instance with the `word` and `meaning` values from the request body
    const newWord = new WordModel({ word, meaning });
    console.log(newWord);
    try {
      // Save the new Word instance to the database
      const savedWord = await newWord.save();
      
      return res.status(200).json({ message: `Word ${word} inserted successfully` }); // return the saved word as a response
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Failed to save the word to the database' });
    }
};


export const update = async (req, res, next) => {
    const { word, meaning } = req.body;
  
    // Check if the request body contains `word` and `meaning` keys
    if (!word || !meaning) {
      return res.status(400).json({ error: 'Request body should contain "word" and "meaning" keys' });
    }
  
    try {
      const existingWord = await WordModel.findOne({ word: word });
  
      if (!existingWord) {
        return res.status(404).json({ message: 'The word does not exist in the database. Please insert it first.' });
      }
  
      existingWord.meaning = meaning;
  
      const updatedWord = await existingWord.save();
  
      return res.status(200).json({ message: 'Word meaning updated successfully', word: updatedWord });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Failed to update word in the database' });
    }
};


export const delete_word =async (req, res, next) => {
    const { word } = req.body;
  console.log(req.body);
    try {
      const wordData = await WordModel.findOne({ word: word });
      if (!wordData) {
        return res.status(404).json({ message: "Word not found in the database" });
      }
  
      await WordModel.deleteOne({ word: word });
      console.log({message: `Word ${word} deleted successfully`})
      return res.status(200).json({ message: `Word ${word} deleted successfully` });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Failed to delete the word from the database" });
    }
};
