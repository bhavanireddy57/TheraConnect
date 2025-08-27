// backend/models/Drawing.js
import mongoose from "mongoose";

const DrawingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  filename: { type: String, required: true },
  caption: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Drawing", DrawingSchema);
