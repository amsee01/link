import React, { useState, useEffect } from "react";
import { MdBook, MdEmojiPeople, MdGroups, MdScience } from "react-icons/md";
import { IoBriefcase, IoGlobe } from "react-icons/io5";
import { ALL, POST_TYPES } from "../../constants/constants";

const Sidebar = ({ onFilterChange, minimize = false }) => {
  const [activeCategory, setActiveCategory] = useState(ALL);
  const [resizeTrigger, setResizeTrigger] = useState(0);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (onFilterChange) {
      onFilterChange(category);
    }
  };

  const postTypes = [ALL, ...POST_TYPES]; // add an everything filter

  // handle minimizing category cards based on window size
  function getZoomLevel() {
    return Math.round((window.outerWidth / window.innerWidth) * 100);
  }

  function isZoomAtMost(threshold) {
    const zoomLevel = getZoomLevel();
    return zoomLevel <= threshold;
  }

  const threshold = 80;

  useEffect(() => {
    const handleResize = () => {
      setResizeTrigger((prev) => prev + 1);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const shouldMinimize = isZoomAtMost(threshold) ? false : minimize;

  return (
    <div
      style={{
        flex: 3,
        height: "calc(100vh - 50px)",
        width: shouldMinimize ? "60px" : "200px", // Adjust width based on minimize prop
        transition: "width 0.3s ease-in-out",
      }}
      className="custom-scrollbar overflow-y-auto sticky top-[50px] bg-gray-100"
    >
      <div className="p-[20px]">
        <ul className="sidebarList m-0 p-0">
          {postTypes.map((category) => (
            <li
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`flex items-center cursor-pointer p-[10px] mb-[10px] ${
                activeCategory === category
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              {category === "Classes" && <MdBook className="mr-[10px]" />}
              {category === "Clubs" && <MdEmojiPeople className="mr-[10px]" />}
              {category === ALL && <IoGlobe className="mr-[10px]" />}
              {category === "Research" && <MdScience className="mr-[10px]" />}
              {category === "Hobbies" && <MdGroups className="mr-[10px]" />}
              {category === "Work" && <IoBriefcase className="mr-[10px]" />}
              {!shouldMinimize && <span>{category}</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
