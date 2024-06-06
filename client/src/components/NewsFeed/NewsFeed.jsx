import React, { useContext, useEffect, useState } from "react";
import Post from "../Post/Post";
import { AuthContext } from "../../context/AuthContext";
import { getPostComments, deletePost } from "../../utils/api/api";
import { toast } from "react-toastify";

const NewsFeed = ({
  posts,
  reversed,
  setPosts,
  sorted,
  removePost,
  refreshCollapsed,
  onLikePost,
  noPostsMessage,
}) => {
  const [orderedPosts, setOrderedPosts] = useState([]);
  const [postComments, setPostComments] = useState({});
  const [commentRefresh, setCommentRefresh] = useState(0);
  const { user } = useContext(AuthContext);

  const getComments = async (currentPosts) => {
    let iter = 0;
    let commentObject = {};
    while (iter < currentPosts.length) {
      let currPost = currentPosts[iter];
      const res = await getPostComments(currPost._id);
      commentObject[currPost._id] = res.data.comments;
      iter++;
    }

    setPostComments(commentObject);
  };

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
    getComments(newOrderedPosts);
  }, [posts, reversed, sorted]);

  const handleClosePost = (postId) => {
    if (!setPosts) return;
    setOrderedPosts(orderedPosts.filter((post) => post._id !== postId));

    setPosts(posts.filter((post) => post._id !== postId));
  };

  const handleDeletePost = async (post) => {
    if (removePost) await removePost(post);
    const res = await deletePost(user._id, post);
    if (res.message.includes("Success")) {
      toast.success("Post has been deleted successfully!");
    } else {
      toast.error("Something went wrong.");
    }
    if (refreshCollapsed) await refreshCollapsed();
  };

  const handleRefresh = async () => {
    await getComments(orderedPosts);
    await setCommentRefresh(Math.random());
  };

  return (
    <div style={{ flex: 8 }} className="p-[10px]" key={commentRefresh}>
      {orderedPosts &&
        orderedPosts.map((post, index) => (
          <div key={index} className="post">
            <Post
              key={post._id}
              onClose={setPosts ? () => handleClosePost(post._id) : null}
              post={post}
              refreshComments={handleRefresh}
              comments={post._id in postComments ? postComments[post._id] : []}
              onDelete={() => handleDeletePost(post)}
              onLike={onLikePost}
            />
          </div>
        ))}
      {noPostsMessage && <p className="no-posts">{noPostsMessage}</p>}
    </div>
  );
};

export default NewsFeed;
