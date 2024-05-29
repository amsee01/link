import {
    createComment,
    deleteComment,
    getComments,
  } from "../services/comment.service.js";
  
  export const createCommentController = async (req, res) => {
    try {
      console.log("CONTROLLER RECEIVED: ")
      console.log(req.body)
      const newComment = await createComment(req.body);
      res.status(200).json({
        newComment,
        message: "Comment has been created Successfully",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Comment creation Failed",
        err,
      });
    }
  };
  
  export const deleteCommentController = async (req, res) => {
    try {
      const deletedComment = await deleteComment(req.params, req.body);
      res.status(200).json({
        deletedComment,
        message: "Comment has been deleted Successfully",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Comment deletion failed",
        err,
      });
    }
  };
  
  export const getCommentsController = async (req, res) => {
    try {
      const comments = await getComments(req.params);
      res.status(200).json({
        comments,
        message: "Comments have been fetched Successfully",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Comment fetch failed",
        err,
      });
    }
  };
  