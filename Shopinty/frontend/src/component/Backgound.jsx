import React from "react";
import back1 from "../assets/back1.png";
import back2 from "../assets/back2.jpg";
// 1. Import the new background images
import back3 from "../assets/back3.png"; // Assuming you have this file
import back4 from "../assets/back4.png"; // Assuming you have this file

function Background({ heroCount }) {
  const images = [back1, back2, back3, back4];
  const currentImage = images[heroCount] || images[0];

  return (
    // Reduced height slightly to accommodate the fixed nav better.
    <div className="w-full h-[60vh] sm:h-[70vh] md:h-[80vh] relative overflow-hidden">
      <img
        src={currentImage}
        alt={`Background ${heroCount + 1}`}
        className="w-full h-full object-cover transition-transform duration-700 ease-in-out"
      />
    </div>
  );
}

export default Background;