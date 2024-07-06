"use client";

import { useState } from "react";

function TextExpander({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);
  if (children.length <= 40) {
    return <span>{children}</span>;
  }
  const displayText = isExpanded
    ? children
    : children.split(" ").slice(0, 40).join(" ") + "...";
  return (
    children.length > 40 && (
      <span>
        {displayText}{" "}
        <button
          className="border-b border-primary-700 pb-1 leading-3 text-primary-700"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Show less" : "Show more"}
        </button>
      </span>
    )
  );
}

export default TextExpander;
