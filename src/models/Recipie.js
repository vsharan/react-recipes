import mongoose from "mongoose";
mongoose.set("useFindAndModify", false);

const Schema = mongoose.Schema;

const recipieSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    }
});

export const Recipe = mongoose.model("Recipe", recipieSchema);