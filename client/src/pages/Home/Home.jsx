import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import CollapsedList from "../../components/CollapsedList/CollapsedList";
import PostView from "../../components/PostView/PostView";
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
        console.log(filteredPosts);
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
        <CollapsedList posts={filteredPosts} onSelectPost={handleSelectPost} />
        <PostView post={selectedPost} />
      </div>
    </>
  );
};

export default Home;
