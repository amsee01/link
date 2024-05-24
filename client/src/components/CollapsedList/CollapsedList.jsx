import React from "react";

const CollapsedList = ({ posts, onSelectPost, selectedPost }) => {
  // Sort posts in reverse chronological order
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="collapsed-list">
      {sortedPosts.length === 0 ? (
        <p className="no-posts">No posts available for this category.</p>
      ) : (
        sortedPosts.map((post) => (
          <div
            key={post._id}
            className={`post-preview flex items-center p-2 border-b border-gray-200 hover:bg-gray-100 cursor-pointer ${
              selectedPost && selectedPost._id === post._id ? "bg-blue-300" : ""
            }`}
            onClick={() => onSelectPost(post)}
          >
            <div className="flex-grow">
              <p className="font-bold text-sm">
                {post.desc.substring(0, 50)}...
              </p>
              <p className="text-xs text-gray-500">{post.username}</p>
            </div>
            <div className="text-xs text-gray-500 flex flex-col items-end">
              <p>{post.likes.length} likes</p>
              <p>{post.comments.length} comments</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CollapsedList;
