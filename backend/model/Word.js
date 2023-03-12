import mongoose from "mongoose";

const Schema = mongoose.Schema;

const wordSchema = new Schema({
    word: {
        type: String, // specify the data type for the field
        required: true // set the "required" flag to true to enforce validation
    },
    meaning: {
        type: String, // specify the data type for the field
        required: true // set the "required" flag to true to enforce validation
    }
});

export default mongoose.model("words", wordSchema); // the model name should be capitalized and singular
