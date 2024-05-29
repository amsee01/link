import React from "react";
import CollapsedPost from "../CollapsedPost/CollapsedPost";

const CollapsedList = ({
  posts,
  onSelectPost,
  selectedPosts,
  refreshPosts,
}) => {
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
            <CollapsedPost
              key={post._id}
              post={post}
              isSelected={isSelected}
              onSelectPost={onSelectPost}
            />
          );
        })
      )}
    </div>
  );
};

export default CollapsedList;
