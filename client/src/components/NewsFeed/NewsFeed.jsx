import React, { useContext, useEffect, useState } from "react";
import Post from "../Post/Post";
import { getAllPosts, getTimeLinePost } from "../../utils/api/api";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const NewsFeed = ({ userPosts }) => {
  const [posts, setPosts] = useState([]);
  const { username } = useParams();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const timelinePosts = async () => {
      try {
        const res = userPosts
          ? await getTimeLinePost(username)
          : await getAllPosts();
        setPosts(res.data.posts);
      } catch (error) {
        console.log(error);
      }
    };
    timelinePosts();
  }, [username]);

  return (
    <div style={{ flex: 5.5 }} className="p-[10px]">
      {/* {(!username || username === user?.username) && <UploadPost />} */}
      {posts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </div>
  );
};

export default NewsFeed;
