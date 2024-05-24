import React from "react";

const CollapsedList = ({ posts, onSelectPost, selectedPost }) => {
  return (
    <div className="collapsed-list">
      {posts.length === 0 ? (
        <p className="no-posts">No posts available for this category.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            className={`post-preview flex items-center p-2 border-b border-gray-200 hover:bg-gray-100 cursor-pointer ${
              selectedPost && selectedPost._id === post._id ? "bg-gray-300" : ""
            }`}
            onClick={() => onSelectPost(post)}
          >
            <div className="flex-grow">
              <p className="font-bold text-sm">
                {post.desc.substring(0, 50)}...
              </p>
              <p className="text-xs text-gray-500">{post.username}</p>
            </div>
            <div className="text-xs text-gray-500">
              {post.likes.length} likes
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CollapsedList;
