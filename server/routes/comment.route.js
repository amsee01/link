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
router.post("/delete-comment", deleteCommentController);

//get comments
router.get("/get-comments/:id", getCommentsController);

export default router;
