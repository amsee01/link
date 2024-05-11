import React, { useContext, useEffect, useState } from "react";
import { MdOutlineMoreVert } from "react-icons/md";
import profilePic from "../../assets/profilepic.jpg";
import postPic from "../../assets/postPic.jpg";
import likeIcon from "../../assets/like.png";
import heartIcon from "../../assets/heart.png";
import { Users } from "../../data/dummyData";
import axios from "axios";
import userPic from "./assets/user.png";
import moment from "moment";
import { getUserData, likeAndDislikePost } from "../../utils/api/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import NewsFeed from "../NewsFeed/NewsFeed";

const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes?.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes?.includes(currentUser._id));
  }, [currentUser?._id, post.likes]);

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
    <div className="w-full rounded-md shadow-lg mt-[30px] mb-[30px] p-[10px]">
      <div className="mt-[20px] mb-[20px]" style={{ height:"20px", maxWidth:"100%", overflow: "hidden", textOverflow: "ellipsis" }}>
        <span onClick={ () => {
          console.log("Clicked");
          NewsFeed(post);
        }}>{post?.desc}</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[5px]">
          <img
            src={likeIcon}
            alt="likeIcon"
            className="w-[24px] h-[24px] cursor-pointer"
            onClick={handleLike}
          />
          <span className="text-sm">{like} likes</span>
          <span className="text-sm ml-[10px] mr-[10px]">
                ({user.username})
              </span>
        </div>
      </div>
    </div>
  );
};

export default Post;
