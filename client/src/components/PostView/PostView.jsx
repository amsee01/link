import React from "react";

const PostView = ({ post }) => {
  if (!post) {
    return <p>Select a post to view</p>;
  }

  return (
    <div style={{ flex: 5.5 }} className="p-[10px]">
      <div>
        <img src={post.profilePicture} alt="profile" />
        <p>{post.username}</p>
        <p>{new Date(post.createdAt).toLocaleString()}</p>
      </div>
      <div>
        <p>{post.content}</p>
        <p>{post.likes.length} likes</p>
        <p>{post.comments.length} comments</p>
      </div>
    </div>
  );
};

export default PostView;
