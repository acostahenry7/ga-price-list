import React from "react";
import "./ItemList.css";

function ItemList({ children, title, counter, icon }) {
  return (
    <div className="ItemList-container">
      <p>
        {icon}
        {title} ({counter})
      </p>
      <ul>{children}</ul>
    </div>
  );
}

export { ItemList };
