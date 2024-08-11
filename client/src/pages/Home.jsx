import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import InteractiveImage from "../components/InteractiveImage";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function Home() {
  const splineViewerRef = useRef(null);
  const splineViewerRef2 = useRef(null);

  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@splinetool/viewer/build/spline-viewer.js";
    script.type = "module";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://unpkg.com/@splinetool/viewer@1.9.6/build/spline-viewer.js";
    script.type = "module";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center gap-12 p-6 md:p-12 min-h-screen ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-r from-blue-50 to-blue-100 text-gray-900"
      } transition-all duration-300`}
    >
      <div className="w-full rounded-lg p-4 md:p-6 shadow-lg mb-8">
        <spline-viewer
          url="https://prod.spline.design/gRXNLvNTf8ipxDAi/scene.splinecode"
          ref={splineViewerRef2}
          className="w-full h-[400px] md:h-[600px]"
        ></spline-viewer>
      </div>

      {/* Content and Interactive Image */}
      <div className="flex flex-row gap-6">
        <div className="flex-1 justify-center items-center transform hover:scale-105 transition-transform duration-300">
          <InteractiveImage />
        </div>
        <div className="flex-1">
          <spline-viewer
            url="https://prod.spline.design/PBQQBw8bfXDhBo7w/scene.splinecode"
            ref={splineViewerRef2}
          ></spline-viewer>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl gap-12">
        <div className="flex-1 flex flex-col gap-6 md:gap-8 text-center md:text-left">
          <h1
            className={`text-4xl md:text-5xl font-extrabold mb-6 leading-tight ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Share Your Profile with Ease
          </h1>
          <p
            className={`text-lg md:text-xl mb-4 ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Our platform makes it effortless to share your profile and connect
            with others. Generate unique QR codes for your profile and share
            them effortlessly. Whether you’re networking at an event or sharing
            with friends, our solution provides a seamless experience.
          </p>
          <p
            className={`text-lg md:text-xl mb-4 ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Explore the benefits of quick and secure profile sharing. Customize
            your profile, generate a QR code, and let others scan it to access
            your details instantly.
          </p>
          <button >
            <Link to="/sign-in" className="border w-fit text-center p-3 rounded-lg shadow-xl hover:p-5 transition-all duration-100">Explore more</Link>
          </button>
        </div>
      </div>

      {/* Photos at the bottom */}
      <div className="w-full max-w-6xl mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className={`flex flex-col items-center rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 ${
            theme === "dark"
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-800"
          }`}
        >
          <img
            src="https://images.unsplash.com/photo-1499557354967-2b2d8910bcca?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
            alt="Profile Sharing"
            className="w-32 h-32 object-cover rounded-full mb-4"
          />
          <p className="text-lg md:text-xl">Effortless profile sharing</p>
        </div>
        <div
          className={`flex flex-col items-center rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 ${
            theme === "dark"
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-800"
          }`}
        >
          <img
            src="https://plus.unsplash.com/premium_photo-1682339496371-d71e65e3e42d?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="QR Code Sharing"
            className="w-32 h-32 object-cover mb-4 rounded-full"
          />
          <p className="text-lg md:text-xl">Unique QR codes for your profile</p>
        </div>
        <div
          className={`flex flex-col items-center rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 ${
            theme === "dark"
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-800"
          }`}
        >
          <img
            src="https://images.unsplash.com/photo-1605098293544-25f4c32344c8?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="QR Code Sharing"
            className="w-32 h-32 object-cover mb-4 rounded-full"
          />
          <p className="text-lg md:text-xl">Share Your Card in QR</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
