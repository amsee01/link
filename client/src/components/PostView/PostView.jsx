import React, { useContext, useEffect, useState } from "react";
import likeIcon from "../../assets/like.png";
import heartIcon from "../../assets/heart.png";
import userPic from "../Post/assets/user.png";
import { AuthContext } from "../../context/AuthContext";
import { getUserData, likeAndDislikePost } from "../../utils/api/api";
import { toast } from "react-toastify";
import moment from "moment";
import { MdClose } from "react-icons/md";

const PostView = ({ post, setPost }) => {
  const { user: currentUser } = useContext(AuthContext);
  const [like, setLike] = useState(post?.likes.length || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [postUser, setPostUser] = useState({});

  useEffect(() => {
    if (post) {
      setIsLiked(post.likes.includes(currentUser._id));
      setLike(post.likes.length);
      const fetchUser = async () => {
        try {
          const res = await getUserData(post.userId);
          setPostUser(res.data.userInfo);
        } catch (error) {
          console.log(error);
        }
      };
      fetchUser();
    }
  }, [post, currentUser._id]);

  const handleLike = async () => {
    try {
      await likeAndDislikePost(post._id, currentUser._id);
      setLike(isLiked ? like - 1 : like + 1);
      setIsLiked(!isLiked);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  if (!post) {
    return <p className="select-post">Select a post to view</p>;
  }

  const handleClose = () => {
    setPost(null);
  };

  return (
    <div className="post-view bg-white rounded-lg shadow-lg p-4 relative">
      <MdClose
        className="absolute top-2 right-2 text-gray-500 cursor-pointer"
        onClick={handleClose}
        size={24}
      />
      <div className="post-header flex items-center mb-4">
        <img
          src={postUser.profilePicture ? postUser.profilePicture : userPic}
          alt="profile"
          className="w-[50px] h-[50px] rounded-full object-cover mr-4"
        />
        <div>
          <p className="font-bold">{postUser.username}</p>
          <p className="text-sm text-gray-500">
            {moment(post.createdAt).fromNow()}
          </p>
        </div>
      </div>
      <div className="post-content mb-4">
        <p className="mb-4">{post.desc}</p>
        {post.img && (
          <img src={post.img} alt="post" className="w-full object-cover mb-4" />
        )}
      </div>
      <div className="post-footer flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={likeIcon}
            alt="like"
            className={`w-[24px] h-[24px] cursor-pointer mr-2 ${
              isLiked ? "text-red-600" : ""
            }`}
            onClick={handleLike}
          />
          <span>{like} likes</span>
        </div>
        <div>
          <span>{post.comments.length} comments</span>
        </div>
      </div>
    </div>
  );
};

export default PostView;
