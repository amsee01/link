import React, { useContext } from "react";
import likeIcon from "../../assets/like.png";
import heartIcon from "../../assets/heart.png";
import { AuthContext } from "../../context/AuthContext";

const PostView = ({ post }) => {
  const { user } = useContext(AuthContext);

  if (!post) {
    return <p className="select-post">Select a post to view</p>;
  }

  const handleLike = async () => {
    // Implement like functionality
  };

  return (
    <div className="post-view bg-white rounded-lg shadow-lg p-4">
      <div className="post-header flex items-center mb-4">
        <img
          src={post.profilePicture || user.profilePicture}
          alt="profile"
          className="w-[50px] h-[50px] rounded-full object-cover mr-4"
        />
        <div>
          <p className="font-bold">{post.username}</p>
          <p className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
      <div className="post-content mb-4">
        <p className="mb-4">{post.content}</p>
        {post.img && (
          <img src={post.img} alt="post" className="w-full object-cover mb-4" />
        )}
      </div>
      <div className="post-footer flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={likeIcon}
            alt="like"
            className="w-[24px] h-[24px] cursor-pointer mr-2"
            onClick={handleLike}
          />
          <img
            src={heartIcon}
            alt="heart"
            className="w-[24px] h-[24px] cursor-pointer mr-2"
            onClick={handleLike}
          />
          <span>{post.likes.length} likes</span>
        </div>
        <div>
          <span>{post.comments.length} comments</span>
        </div>
      </div>
    </div>
  );
};

export default PostView;
