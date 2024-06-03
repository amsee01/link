import {
  createComment,
  deleteComment,
  getComments,
} from "../services/comment.service.js";
// import Post from "../models/post.model.js";

export const createCommentController = async (req, res) => {
  try {
    const newComment = await createComment(req.body);

    // // Get the post to find the post owner
    // const post = await Post.findById(req.body.postId);
    // const postOwnerId = post.userId; // Assuming post has a userId field

    // // Create a notification for the post owner
    // const notification = new Notification({
    //   userId: postOwnerId,
    //   type: "comment",
    //   postId: newComment.postId,
    //   commentId: newComment._id,
    //   senderName: req.body.userName, // Assuming userName is passed in req.body
    // });
    // await notification.save();

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
