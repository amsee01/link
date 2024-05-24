import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import CollapsedList from "../../components/CollapsedList/CollapsedList";
import PostView from "../../components/PostView/PostView";
import UploadPost from "../../components/UploadPost/UploadPost";
import { getAllPosts } from "../../utils/api/api";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [filter, setFilter] = useState("Classes");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getAllPosts();
        setPosts(res.data.posts);
        setFilteredPosts(res.data.posts.filter((post) => post.type === filter));
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [filter]);

  const handleFilterChange = (category) => {
    setFilter(category);
  };

  const handleSelectPost = (post) => {
    setSelectedPost(post);
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar onFilterChange={handleFilterChange} />
        <div className="flex-grow p-4">
          <UploadPost />
          <CollapsedList
            posts={filteredPosts}
            onSelectPost={handleSelectPost}
          />
        </div>
        <div
          style={{
            flex: selectedPost ? 6 : 0,
            padding: "10px",
            transition: "flex 0.3s ease",
          }}
        >
          <PostView post={selectedPost} />
        </div>
      </div>
    </>
  );
};

export default Home;
