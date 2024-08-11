import { useState } from "react";

export default function InteractiveImage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Function to handle mouse movement
  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    setMousePosition({ x: clientX, y: clientY });
  };

  // Calculate rotation based on mouse position
  const calculateRotation = () => {
    const xRotation = (mousePosition.y / window.innerHeight)*10 ;
    const yRotation = (mousePosition.x / window.innerWidth) *180;
    return `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
  };

  return (
    <div
      className="relative w-full h-full flex items-center justify-center"
      onMouseMove={handleMouseMove}
    >
      <div
        className="transition-transform duration-300 ease-in-out"
        style={{
          transform: calculateRotation(),
          transformStyle: "preserve-3d",
        }}
      >
        <img
          src="https://plus.unsplash.com/premium_photo-1682339496376-72d0870e1d82?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHFyfGVufDB8fDB8fHww" // Replace with your image URL
          alt="Interactive"
          className="w-80 h-80 object-cover rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}
