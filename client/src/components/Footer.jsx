import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Footer() {
  const { theme } = useSelector((state) => state.theme);

  return (
    <footer
      className={`flex flex-col md:flex-row justify-between items-center p-4 border-t-2 border-t-slate-600 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } transition-all duration-300`}
    >
      <div className="text-sm">
        &copy; {new Date().getFullYear()} ECards. All rights reserved.
      </div>
      <div className="flex gap-4 mt-4 md:mt-0">
        <Link to="/about" className="hover:underline">
          About
        </Link>
        <Link to="/contact" className="hover:underline">
          Contact
        </Link>
        <Link to="/privacy" className="hover:underline">
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}
