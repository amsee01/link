import React, { useEffect, useState } from "react";
import CollapsedPost from "../CollapsedPost/CollapsedPost";
import { getPostComments } from "../../utils/api/api";
import {
  FaSortAmountDown,
  FaSortAmountUp,
  FaCheckSquare,
  FaSquare,
} from "react-icons/fa";
import "./CollapsedList.css";

const CollapsedList = ({
  posts,
  onSelectPost,
  selectedPosts,
  refreshPosts,
  category,
}) => {
  const [sortCriteria, setSortCriteria] = useState("createdAt");
  const [isReverse, setIsReverse] = useState(false);
  const [commentCounts, setCommentCounts] = useState({});

  const handleSortChange = (e) => {
    const criteria = e.target.value;
    if (sortCriteria === criteria) {
      setIsReverse(!isReverse);
    } else {
      setSortCriteria(criteria);
      setIsReverse(false);
    }
  };

  const getComments = async (currentPosts) => {
    let counts = {};
    for (let i = 0; i < currentPosts.length; i++) {
      const post = currentPosts[i];
      const res = await getPostComments(post._id);
      counts[post._id] = res.data.comments.length;
    }
    setCommentCounts(counts);
  };

  // load comment counts
  useEffect(() => {
    getComments(posts);
  }, [posts]);

  const sortedPosts = [...posts].sort((a, b) => {
    let comparison = 0;
    if ((a.pinned && !b.pinned) || (b.pinned && !a.pinned)) {
      comparison = a.pinned ? -1 : 1;
    } else if (sortCriteria === "createdAt") {
      comparison = new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortCriteria === "likes") {
      comparison = b.likes.length - a.likes.length;
    } else if (sortCriteria === "comments") {
      comparison = commentCounts[b._id] - commentCounts[a._id];
    }
    return isReverse ? -comparison : comparison;
  });

  const allSelected =
    sortedPosts.length > 0 &&
    sortedPosts.every((post) => selectedPosts.some((p) => p._id === post._id));

  const handleSelectAll = () => {
    if (allSelected) {
      onSelectPost(sortedPosts, true, false);
    } else {
      onSelectPost(sortedPosts.reverse(), true);
    }
  };

  return (
    <div className="collapsed-list-container" key={refreshPosts}>
      <div className="toolbar flex items-center justify-between mb-4">
        <div className="flex items-center">
          <label htmlFor="sortCriteria">Sort By:</label>
          <select
            id="sortCriteria"
            value={sortCriteria}
            onChange={handleSortChange}
            className="sort-select"
          >
            <option value="createdAt">Date</option>
            <option value="likes">Likes</option>
            <option value="comments">Comments</option>
          </select>
          <button
            className="reverse-button"
            onClick={() => setIsReverse(!isReverse)}
          >
            {isReverse ? <FaSortAmountUp /> : <FaSortAmountDown />}
          </button>
        </div>
        <button className="select-all-button" onClick={handleSelectAll}>
          {allSelected ? (
            <FaCheckSquare className="checked-icon" />
          ) : (
            <FaSquare className="unchecked-icon" />
          )}
          Select All
        </button>
      </div>
      {sortedPosts.length === 0 ? (
        <p className="no-posts">No posts found in {category}.</p>
      ) : (
        sortedPosts.map((post) => {
          const isSelected =
            selectedPosts && selectedPosts.some((p) => p._id === post._id);
          return (
            <CollapsedPost
              key={post._id}
              post={post}
              isSelected={isSelected}
              numComments={commentCounts[post._id]}
              onSelectPost={onSelectPost}
            />
          );
        })
      )}
    </div>
  );
};

export default CollapsedList;
