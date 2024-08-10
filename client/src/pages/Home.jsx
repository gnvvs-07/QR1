import { useEffect, useRef } from "react";

export default function Home() {
  const splineViewerRef = useRef(null);

  useEffect(() => {
    // Load the Spline Viewer script
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@splinetool/viewer/build/spline-viewer.js";
    script.type = "module";
    script.onload = () => {
      if (splineViewerRef.current) {
        // Optionally perform any actions when the script is loaded
      }
    };
    document.body.appendChild(script);

    // Clean up the script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="shadow-lg flex flex-col sm:flex-row gap-6 md:gap-8 p-6 md:p-8 bg-white rounded-lg">
      <div className="flex-1 flex flex-col gap-4 md:gap-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Welcome to Our Service
        </h1>
        <p className="text-gray-700 text-base md:text-lg">
          Discover our innovative solutions designed to help you achieve your
          goals. Our team of experts is dedicated to providing top-notch
          services and support.
        </p>
        <p className="text-gray-700 text-base md:text-lg">
          Whether you're looking for cutting-edge technology, personalized
          advice, or exceptional customer care, we've got you covered. Explore
          our offerings and find out how we can assist you.
        </p>
        <p className="text-gray-700 text-base md:text-lg">
          We pride ourselves on our commitment to excellence and customer
          satisfaction. Our mission is to deliver results that exceed your
          expectations and help you reach new heights.
        </p>
      </div>
      <div className="flex-1 flex justify-center items-center bg-gray-100 rounded-lg p-4 md:p-6 shadow-md">
        <spline-viewer
          url="https://prod.spline.design/PBQQBw8bfXDhBo7w/scene.splinecode"
          ref={splineViewerRef}
          className="w-full h-full rounded-lg"
        ></spline-viewer>
      </div>
    </div>
  );
}
