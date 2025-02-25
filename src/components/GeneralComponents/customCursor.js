"use client";
import React, { useEffect } from "react";

const CustomCursor = ({ children }) => {
  useEffect(() => {
    const cursor = document.createElement("div");
    cursor.id = "custom-cursor";
    cursor.style.position = "fixed";  // Use fixed positioning
    cursor.style.width = "32px";
    cursor.style.height = "32px";
    cursor.style.backgroundImage = 'url("/sprite-0005.GIF")';
    cursor.style.backgroundSize = "cover";
    cursor.style.zIndex = "999";  // Set a lower zIndex
    cursor.style.pointerEvents = "none"; // Allow content to be clickable
    cursor.style.transition = "background-image 0.2s, width 0.2s, height 0.2s";
    document.body.appendChild(cursor);

    const handleMouseMove = (e) => {
      cursor.style.left = `${e.pageX - cursor.offsetWidth / 2}px`;
      cursor.style.top = `${e.pageY - cursor.offsetHeight / 2}px`;
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName === "BUTTON" ||
        e.target.tagName === "A" ||
        e.target.closest("button") ||
        e.target.closest("a")
      ) {
        cursor.style.backgroundImage = 'url("/prite-0005.PNG")';
        cursor.style.width = "24px";  // Decrease size
        cursor.style.height = "24px"; // Decrease size
      }
    };

    const handleMouseOut = () => {
      cursor.style.backgroundImage = 'url("/sprite-0005.GIF")';
      cursor.style.width = "32px";  // Restore size
      cursor.style.height = "32px"; // Restore size
    };

    // Add listeners
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    // Clean up on unmount
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.body.removeChild(cursor);
    };
  }, []);

  return (
    <>
      {children}
      <style jsx global>{`
        body,
        button,
        a,
        * {
          cursor: none !important;  /* Hide the system cursor everywhere */
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
