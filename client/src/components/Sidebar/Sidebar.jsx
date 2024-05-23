import React, { useState } from "react";
import { POST_TYPES } from "../../constants/constants";

const Sidebar = ({ onFilterChange }) => {
  const [activeCategory, setActiveCategory] = useState(POST_TYPES[0]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    onFilterChange(category);
  };

  return (
    <div style={{ flex: 3 }}>
      <div className="p-[20px]">
        <ul className="sidebarList m-0 p-0">
          {POST_TYPES.map((category) => (
            <li
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`cursor-pointer p-[10px] mb-[10px] ${
                activeCategory === category
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              <span>{category}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
