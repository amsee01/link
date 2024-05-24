import React, { useState } from "react";
import { MdBook, MdEmojiPeople, MdScience, MdGroups } from "react-icons/md";
import { IoBriefcase } from "react-icons/io5";
import { POST_TYPES } from "../../constants/constants";

const Sidebar = ({ onFilterChange }) => {
  const [activeCategory, setActiveCategory] = useState(POST_TYPES[0]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    onFilterChange(category);
  };

  return (
    <div
      style={{ flex: 3, height: "calc(100vh - 50px)" }}
      className="custom-scrollbar overflow-y-auto sticky top-[50px] bg-gray-100"
    >
      <div className="p-[20px]">
        <ul className="sidebarList m-0 p-0">
          {POST_TYPES.map((category) => (
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
              {category === "Research" && <MdScience className="mr-[10px]" />}
              {category === "Hobbies" && <MdGroups className="mr-[10px]" />}
              {category === "Work" && <IoBriefcase className="mr-[10px]" />}
              <span>{category}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
