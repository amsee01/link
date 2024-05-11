import React, { useContext, useEffect, useState } from "react";
import UploadPost from "../UploadPost/UploadPost";
import Post from "../CollapsedPost/CollapsedPost";
import { Posts } from "../../data/dummyData";
import axios from "axios";
import { getAllPosts, getTimeLinePost } from "../../utils/api/api";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import NewsFeed from "../NewsFeed/NewsFeed";

const CollapsedNewsFeed = ({ userPosts }) => {
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
    <div style={{ flex: 4 }} className="p-[10px]">
      {(!username || username === user?.username) && (
          <UploadPost />
      )}
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default CollapsedNewsFeed;
