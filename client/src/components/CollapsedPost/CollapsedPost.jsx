import React from "react";

const CollapsedPost = ({ post, isSelected, numComments, onSelectPost }) => {
  const MAX_TEXT_LENGTH = 50;
  return (
    <div
      className={`post-preview flex items-center p-2 border-b border-gray-200 hover:${
        isSelected ? "bg-black" : "bg-gray-100"
      } cursor-pointer ${isSelected ? "bg-blue-500 text-white" : ""}`}
      onClick={() => onSelectPost([post])}
    >
      <div className="flex-grow">
        <p className="font-bold text-sm">
          {post.desc.substring(0, MAX_TEXT_LENGTH)}
          {post.desc.length > MAX_TEXT_LENGTH ? "..." : ""}
        </p>
        <p className="text-xs text-gray-500">{post.username}</p>
      </div>
      <div
        className={`text-xs flex flex-col items-end ${
          isSelected ? "text-gray-200" : "text-gray-500"
        }`}
      >
        <p>{post.likes.length} likes</p>
        <p>{numComments} comments</p>
      </div>
    </div>
  );
};

export default CollapsedPost;
