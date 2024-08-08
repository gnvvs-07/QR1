import { Link } from "react-router-dom";
import { BsMoonStarsFill } from "react-icons/bs";
import { FaSun } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice.js";

export default function Header() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header
      className={`flex justify-between items-center p-4 mt-4 border-b-2 border-b-slate-600 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } transition-all duration-300`}
    >
      {/* Logo or Home Link */}
      <Link
        to="/"
        className="text-2xl font-bold tracking-wide hover:opacity-90 transition-opacity duration-300"
      >
        Kuarr
      </Link>

      {/* Theme Toggle Button */}

      {/* User Profile or Login Button */}
      <div className="flex flex-row-reverse items-center gap-3">
        <button
          onClick={() => dispatch(toggleTheme())}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
        >
          {theme === "dark" ? (
            <FaSun size={20} className="text-yellow-400" />
          ) : (
            <BsMoonStarsFill size={20} className="text-blue-500" />
          )}
        </button>
        {currentUser ? (
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium">
              Hello, {currentUser.username}
            </span>
            <Link to="/qr">
              <img
                src={currentUser.profilePic}
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600"
              />
            </Link>
          </div>
        ) : (
          <Link to="/sign-in">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300">
              Login
            </button>
          </Link>
        )}
      </div>
    </header>
  );
}
