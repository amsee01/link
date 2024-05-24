import React, { useContext, useEffect, useState } from "react";
import Post from "../Post/Post";

const NewsFeed = ({ posts, setPosts }) => {
  const handleClosePost = (index) => {
    if (!setPosts) return;
    setPosts(posts);
  };

  return (
    <div style={{ flex: 5.5 }} className="p-[10px]">
      {posts &&
        posts.map((post, index) => (
          <Post
            key={index}
            post={post}
            onClose={setPosts ? () => handleClosePost(index) : null}
          />
        ))}
    </div>
  );
};

export default NewsFeed;
