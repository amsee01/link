import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import { getPostComments } from "../../utils/api/api";

const NewsFeed = ({ posts, reversed, setPosts, sorted }) => {
  const [orderedPosts, setOrderedPosts] = useState([]);
  const [postComments, setPostComments] = useState({});
  const [commentRefresh, setCommentRefresh] = useState(0)

  const getComments = async ( currentPosts ) => {
    let iter = 0;
    let commentObject = {}
    while (iter < currentPosts.length) {
      let currPost = currentPosts[iter]
      const res = await getPostComments(currPost._id)
      commentObject[currPost._id] = res.data.comments
      iter++
    }

    setPostComments(commentObject)
  }

  useEffect( () => {
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
    getComments(newOrderedPosts);

  }, [posts, reversed, sorted]);

  const handleClosePost = (index) => {
    if (!setPosts) return;
    setOrderedPosts([
      ...orderedPosts.slice(0, index),
      ...orderedPosts.slice(index + 1),
    ]);

    setPosts([...orderedPosts.slice(0, index), ...orderedPosts.slice(index + 1)]);
  };

  const handleRefresh = async () => {
    await getComments(orderedPosts)
    await setCommentRefresh(Math.random());
    console.log("I did a refresh!")
  }

  return (
    <div style={{ flex: 8 }} className="p-[10px]" key={commentRefresh}>
      {orderedPosts &&
        orderedPosts.map((post, index) => (
          <div key={index} className="post">
            <Post
              key={post._id}
              onClose={setPosts ? () => handleClosePost(index) : null}
              post={post}
              refreshComments = {handleRefresh}
              comments={ 
                post._id in postComments ? postComments[post._id] : []
              }
            />
          </div>
        ))}
    </div>
  );
};

export default NewsFeed;
