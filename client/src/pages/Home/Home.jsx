import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NewsFeed from "../../components/NewsFeed/NewsFeed";
import Sidebar from "../../components/Sidebar/Sidebar";
import CollapsedList from "../../components/CollapsedList/CollapsedList";
import UploadPost from "../../components/UploadPost/UploadPost";
import { getAllPosts } from "../../utils/api/api";
import { ALL } from "../../constants/constants";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [filter, setFilter] = useState(ALL);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getAllPosts();
        setPosts(res.data.posts);
        if (filter === ALL) {
          // handle "Everything" case
          setFilteredPosts(res.data.posts);
        } else {
          setFilteredPosts(
            res.data.posts.filter((post) => post.type === filter)
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [filter]);

  const handleFilterChange = (category) => {
    setFilter(category);
  };

  const handleToggleSelectPost = (post) => {
    if (selectedPosts.some((p) => p._id === post._id)) {
      setSelectedPosts(selectedPosts.filter((p) => p._id != post._id));
    } else {
      setSelectedPosts([...selectedPosts, post]);
    }
  };

  const handleRefresh = () => {
    const fetchPosts = async () => {
      try {
        const res = await getAllPosts();
        setPosts(res.data.posts);
        if (filter === ALL) {
          // handle "Everything" case
          setFilteredPosts(res.data.posts);
        } else {
          setFilteredPosts(
            res.data.posts.filter((post) => post.type === filter)
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
    setRefresh(Math.random());
  }

  const handleSearch = (searchValue) => {
    const fetchPosts = async () => {
      try {
        const res = await getAllPosts();
        setPosts(res.data.posts);
        if (filter === ALL) {
          // handle "Everything" case
          setFilteredPosts(
            res.data.posts.filter((post) => post.desc.toLowerCase().includes(searchValue.toLowerCase()))
          );
        } else {
          setFilteredPosts(
            res.data.posts.filter((post) => post.type === filter && post.desc.toLowerCase().includes(searchValue.toLowerCase()))
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
    setRefresh(Math.random());
  }

  return (
    <>
      <Navbar
        handleSearch = {handleSearch}
      />
      <div className="flex">
        <Sidebar onFilterChange={handleFilterChange} />
        <div className="flex-grow p-4">
          <UploadPost
            refreshFn = {handleRefresh} 
          />
          <CollapsedList
            posts={filteredPosts}
            onSelectPost={handleToggleSelectPost}
            selectedPosts={selectedPosts}
            refreshPosts={refresh}
          />
        </div>
        <div
          style={{
            flex: selectedPosts?.length > 0 ? 6 : 0,
            padding: "10px",
            transition: "flex 0.3s ease",
          }}
        >
          {selectedPosts?.length > 0 && (
            <NewsFeed
              posts={selectedPosts}
              setPosts={setSelectedPosts}
              reversed={true}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
