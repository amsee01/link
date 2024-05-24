import mongoose from "mongoose";
import { Schema } from "mongoose";

export const commentSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    _id: false, // Prevents Mongoose from creating _id for subdocuments
  }
);

export default mongoose.model("Comment", commentSchema);
