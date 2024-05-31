import React, { useContext, useEffect, useState } from "react";
import { MdClose, MdOutlineMoreVert, MdOutlineDelete } from "react-icons/md";
import heartIcon from "../../assets/heart.png";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import userPic from "./assets/user.png";
import moment from "moment";
import {
  getUserData,
  likeAndDislikePost,
  deleteComment,
} from "../../utils/api/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import { uploadComment } from "../../utils/api/api";
import TextareaAutosize from "react-textarea-autosize";
import "./Post.css";

function setNativeValue(element, value) {
  let lastValue = element.value;
  element.value = value;
  let event = new Event("input", { target: element, bubbles: true });
  // React 15
  event.simulated = true;
  // React 16
  let tracker = element._valueTracker;
  if (tracker) {
    tracker.setValue(lastValue);
  }
  element.dispatchEvent(event);
}

const Post = ({ post, onClose, comments, refreshComments, onDelete }) => {
  const [like, setLike] = useState(post.likes?.length || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const { user: currentUser } = useContext(AuthContext);
  const [desc, setDesc] = useState("");
  const [matchUser, setMatchUser] = useState(false);

  useEffect(() => {
    setIsLiked(post.likes?.includes(currentUser._id));
    setLike(post.likes?.length);

    if (currentUser._id == post.userId) {
      setMatchUser(true);
    }
  }, [currentUser?._id, post]);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await getUserData(post.userId);
        setUser(res.data.userInfo);
      } catch (error) {
        console.log(error);
      }
    };
    getUserInfo();
  }, [post.userId]);

  const handleCommentDelete = async (comment) => {
    const res = await deleteComment(currentUser._id, comment);
    if (res.message.includes("Success")) {
      toast.success("Comment has been deleted successfully!");
    } else {
      toast.error("Something went wrong.");
    }
    await refreshComments();
  };

  const handleCommentUpload = async () => {
    setLoading(true);
    try {
      const res = await uploadComment(
        currentUser._id,
        currentUser.username,
        desc,
        post._id
      );
      toast.success("Post has been Uploaded Successfully!");
      refreshComments();
      var input = document.getElementById("newcomment");
      setNativeValue(input, "");
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Post Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    try {
      await likeAndDislikePost(post._id, currentUser._id);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="w-full rounded-md shadow-lg mt-[0px] mb-[30px] p-[10px]">
      <div className="p-[10px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to={`/profile/${user.username}`}>
              <img
                src={user.profilePicture ? user.profilePicture : userPic}
                alt="Profile Picture"
                className="w-[32px] h-[32px] rounded-full object-cover"
              />
            </Link>
            <Link to={`/profile/${user.username}`}>
              <span className="font-bold ml-[10px] mr-[10px]">
                {user.username}
              </span>
            </Link>

            <span className="text-sm">{moment(post.createdAt).fromNow()}</span>
          </div>
          <div className="flex row">
            {matchUser && (
              <MdOutlineDelete
                className="text-xl cursor-pointer"
                onClick={onDelete}
              />
            )}
            {onClose && (
              <MdClose className="text-xl cursor-pointer" onClick={onClose} />
            )}
          </div>
        </div>
      </div>
      <div className="mt-[20px] mb-[20px]">
        <span style={{ whiteSpace: "pre-wrap" }}>{post?.desc}</span>
        {post.img && (
          <img
            src={post.img}
            alt="Post Picture"
            className="mt-[20px] w-full object-contain "
            style={{ maxHeight: "500px" }}
          />
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[5px]">
          {isLiked ? (
            <FaHeart
              className="w-[16px] h-[16px] cursor-pointer"
              style={{ color: "#F53757" }}
              onClick={handleLike}
            />
          ) : (
            <FaRegHeart
              className="w-[16px] h-[16px] cursor-pointer"
              style={{ color: "#F53757" }}
              onClick={handleLike}
            />
          )}
          <span className="text-sm">{like} likes</span>
        </div>
        <div>
          <span className="cursor-pointer border-b-[1px] border-slate-300 text-sm">
            {post.comments?.length} comments
          </span>
        </div>
      </div>
      <div className="top flex items-center mb-4">
        <TextareaAutosize
          id="newcomment"
          type="text"
          placeholder="Add a comment"
          className="noresize flex-grow focus:outline-none border border-gray-300 rounded-lg p-2"
          onChange={(e) => setDesc(e.target.value)}
        />
        <button
          disabled={loading}
          onClick={handleCommentUpload}
          className="leftmargin noresize bg-green-600 text-white px-4 py-2 rounded-lg font-bold whitespace-nowrap"
        >
          {loading ? "..." : "Post"}
        </button>
      </div>
      <div className="collapsed-list">
        {comments.length === 0 ? (
          <p className="no-posts">No comments yet.</p>
        ) : (
          comments.map((comment) => {
            return (
              <div
                key={comment._id}
                className={`post-preview flex items-center p-2 border-b border-gray-200`}
              >
                <div className="flex-grow">
                  <p
                    className="font-bold text-sm"
                    style={{ whiteSpace: "pre-wrap" }}
                  >
                    {comment.desc}
                  </p>
                  <p className="text-xs text-gray-500">{comment.userName}</p>
                </div>
                <div className={`text-xs flex flex-col items-end`}></div>
                {comment.userId === currentUser._id && (
                  <MdOutlineDelete
                    className="text-xl cursor-pointer"
                    onClick={() => handleCommentDelete(comment)}
                    size={15}
                  />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Post;
