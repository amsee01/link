import mongoose from "mongoose";
import { Schema } from "mongoose";
import { commentSchema } from "./comment.model.js";

const postSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    comments: {
      type: [commentSchema],
      default: [],
    },
    pinned: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Post", postSchema);
