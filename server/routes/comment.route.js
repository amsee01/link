import express from "express";
import {
  createCommentController,
  deleteCommentController,
  getCommentsController,
} from "../controllers/comment.controller.js";
const router = express.Router();

//create comment
router.post("/create-comment", createCommentController);

//delete comment
router.delete("/delete-comment/:id", deleteCommentController);

//get comments
router.get("/get-comments/:id", getCommentsController);

export default router;
