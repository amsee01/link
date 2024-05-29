import React, { useEffect, useState } from "react";
import Post from "../Post/Post";

const NewsFeed = ({ posts, reversed, setPosts, sorted }) => {
  const [orderedPosts, setOrderedPosts] = useState([]);

  useEffect(() => {
    let newOrderedPosts = posts;

    if (sorted) {
      newOrderedPosts = [...posts].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    if (reversed) {
      newOrderedPosts = [...posts].reverse();
    }

    setOrderedPosts(newOrderedPosts);
  }, [posts, reversed, sorted]);

  const handleClosePost = (postId) => {
    if (!setPosts) return;
    setOrderedPosts(orderedPosts.filter((post) => post._id !== postId));

    setPosts(posts.filter((post) => post._id !== postId));
  };

  return (
    <div style={{ flex: 8 }} className="p-[10px]">
      {orderedPosts &&
        orderedPosts.map((post, index) => (
          <div key={index} className="post">
            <Post
              key={post._id}
              onClose={setPosts ? () => handleClosePost(post._id) : null}
              post={post}
            />
          </div>
        ))}
    </div>
  );
};

export default NewsFeed;
