import React from "react";

const CollapsedList = ({ posts, onSelectPost, selectedPosts, refreshPosts }) => {
  // Sort posts in reverse chronological order
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  
  return (
    <div className="collapsed-list" key={refreshPosts}>
      {sortedPosts.length === 0 ? (
        <p className="no-posts">No posts available for this category.</p>
      ) : (
        sortedPosts.map((post) => {
          const isSelected =
            selectedPosts && selectedPosts.some((p) => p._id === post._id);
          return (
            <div
              key={post._id}
              className={`post-preview flex items-center p-2 border-b border-gray-200 hover:${
                isSelected ? "bg-black" : "bg-gray-100"
              } cursor-pointer ${isSelected ? "bg-blue-500 text-white" : ""}`}
              onClick={() => onSelectPost(post)}
            >
              <div className="flex-grow">
                <p className="font-bold text-sm">
                  {post.desc.substring(0, 50)}...
                </p>
                <p className="text-xs text-gray-500">{post.username}</p>
              </div>
              <div
                className={`text-xs flex flex-col items-end ${
                  isSelected ? "text-gray-200" : "text-gray-500"
                }`}
              >
                <p>{post.likes.length} likes</p>
                <p>{post.comments.length} comments</p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default CollapsedList;
