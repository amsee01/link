import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NewsFeed from "../../components/NewsFeed/NewsFeed";
import Sidebar from "../../components/Sidebar/Sidebar";
import CollapsedList from "../../components/CollapsedList/CollapsedList";
import UploadPost from "../../components/UploadPost/UploadPost";
import { getAllPosts } from "../../utils/api/api";
import { ALL } from "../../constants/constants";

let searchQuery = "";
const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [filter, setFilter] = useState(ALL);
  const [refresh, setRefresh] = useState(0);

  const performFilter = async () => {
    try {
      const res = await getAllPosts();
      setPosts(res.data.posts);
      if (filter === ALL) {
        // handle "Everything" case
        setFilteredPosts(
          res.data.posts.filter((post) =>
            post.desc.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
      } else {
        setFilteredPosts(
          res.data.posts.filter(
            (post) =>
              post.type === filter &&
              post.desc.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
      }

      // Set the norms post as selected by default.
      if (selectedPosts.length == 0) {
        let myPosts = res.data.posts;
        for (let i = 0; i < myPosts.length; i++) {
          if (myPosts[i]._id == "665c95b7a533f30c4328c60f") {
            setSelectedPosts([myPosts[i]]);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    performFilter();
  }, [filter]);

  const handleFilterChange = (category) => {
    setFilter(category);
  };

  const handleToggleSelectPost = (postList, multi = false, select = true) => {
    if (!multi) {
      // Handle toggling of selecting one post
      if (postList.length > 0) {
        if (selectedPosts.some((p) => p._id === postList[0]._id)) {
          setSelectedPosts(
            selectedPosts.filter((p) => p._id !== postList[0]._id)
          );
        } else {
          setSelectedPosts([...selectedPosts, postList[0]]);
        }
      }
    } else {
      // Handle toggling "select all"
      let newSelectedPosts = [];
      if (select) {
        // Select posts that are not already in selectedPosts
        const selectedIds = new Set(selectedPosts.map((p) => p._id));
        newSelectedPosts = [
          ...selectedPosts,
          ...postList.filter((p) => !selectedIds.has(p._id)),
        ];
      } else {
        // Unselect posts that are in selectedPosts
        const postIdsToUnselect = new Set(postList.map((p) => p._id));
        newSelectedPosts = selectedPosts.filter(
          (p) => !postIdsToUnselect.has(p._id)
        );
      }
      setSelectedPosts(newSelectedPosts);
    }
  };

  const handleRefresh = async (searchValue) => {
    if (searchValue !== undefined) {
      searchQuery = searchValue;
    }
    performFilter();
    await setRefresh(Math.random());
  };

  return (
    <>
      <Navbar handleSearch={handleRefresh} />
      <div className="flex">
        <Sidebar
          onFilterChange={handleFilterChange}
          minimize={selectedPosts.length > 0}
        />
        <div className="flex-grow p-4">
          <UploadPost refreshFn={handleRefresh} />
          <CollapsedList
            // posts={filteredPosts}
            posts={[]}
            onSelectPost={handleToggleSelectPost}
            selectedPosts={selectedPosts}
            refreshPosts={refresh}
            category={filter}
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
              removePost={handleToggleSelectPost}
              refreshCollapsed={handleRefresh}
              reversed={true}
              onLikePost={handleRefresh}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
