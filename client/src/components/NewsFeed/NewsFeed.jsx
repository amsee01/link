import React from "react";
import Post from "../Post/Post";

const NewsFeed = ({ posts, setPosts, sorted }) => {
  let orderedPosts = posts;
  if (sorted) {
    orderedPosts = [...posts].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  const handleClosePost = (index) => {
    if (!setPosts) return;
    setPosts([...posts.slice(0, index), ...posts.slice(index + 1)]);
  };

  return (
    <div style={{ flex: 8 }} className="p-[10px]">
      {posts &&
        orderedPosts.map((post, index) => (
          <div key={index}>
            <Post
              key={index}
              post={post}
              onClose={setPosts ? () => handleClosePost(index) : null}
            />
          </div>
        ))}
    </div>
  );
};

export default NewsFeed;
