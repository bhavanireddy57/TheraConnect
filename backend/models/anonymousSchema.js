/*import mongoose from 'mongoose';

const anonymousSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    article: {
        type: String,
        required: true
    },
    options: {
        type: String,
        enum: ['happy', 'sad', 'depression', 'adhd', 'other'],
    },
    tags: [
        {
            type: String
        }
    ]
},
{ timestamps: true });

const Anonymous = mongoose.model('Anonymous', anonymousSchema);
export default Anonymous;*/



import mongoose from "mongoose";

const anonymousPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    article: { type: String, required: true },
    tags: { type: [String], default: [] },
    options: { type: String, default: "other" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true }
);

// Use the existing collection "anonymous"
export default mongoose.model("AnonymousPost", anonymousPostSchema, "anonymous");
