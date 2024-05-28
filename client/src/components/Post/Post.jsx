import React, { useContext, useEffect, useState } from "react";
import { MdClose, MdOutlineMoreVert } from "react-icons/md";
import heartIcon from "../../assets/heart.png";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import userPic from "./assets/user.png";
import moment from "moment";
import { getUserData, likeAndDislikePost } from "../../utils/api/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

const Post = ({ post, onClose }) => {
  const [like, setLike] = useState(post.likes?.length || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes?.includes(currentUser._id));
    setLike(post.likes?.length);
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
            <MdOutlineMoreVert className="text-xl cursor-pointer" />
            {onClose && (
              <MdClose className="text-xl cursor-pointer" onClick={onClose} />
            )}
          </div>
        </div>
      </div>
      <div className="mt-[20px] mb-[20px]">
        <span>{post?.desc}</span>
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
    </div>
  );
};

export default Post;
