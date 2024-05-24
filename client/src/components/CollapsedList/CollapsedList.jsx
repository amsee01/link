import React from "react";

const CollapsedList = ({ posts, onSelectPost }) => {
  return (
    <div style={{ flex: 4 }} className="p-[10px]">
      {posts.length === 0 ? (
        <p>No posts available for this category.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            className="post-preview"
            onClick={() => onSelectPost(post)}
          >
            <p>{post.desc.substring(0, 50)}...</p>
            <p>{post.username}</p>
            <p>{post.likes.length} likes</p>
          </div>
        ))
      )}
    </div>
  );
};

export default CollapsedList;
