import CommentModel from "../models/comment.model.js"

export const createComment = async (body) => {
  try {
    const newCommentData = {
      ...body,
    };

    const newComment = new CommentModel(newCommentData);

    await newComment.save();

    return newComment;
  } catch (error) {
    throw error;
  }
};

export const deleteComment = async (params, body) => {
  try {
    const deletedComment = JSON.parse(body.post);
    if (deletedComment.userId === body.userId) {
      await CommentModel.deleteOne({ _id : deletedComment._id });
      return deletedComment;
    } else {
      throw new Error("You can delete only your post");
    }
  } catch (error) {
    throw error;
  }
};

export const getComments = async (params) => {
  try {
    console.log("GETTING Comments for post id " + params.id)
    const comments = await CommentModel.aggregate([{ $match: { postId: params.id } }]);
    return comments;
  } catch (error) {
    throw error;
  }
};
