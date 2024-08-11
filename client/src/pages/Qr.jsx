import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import QR from "../components/Qr";

export default function Qr() {
  const { currentUser } = useSelector((state) => state.user);
  const [showQr, setShowQr] = useState(false);
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${username}`);
        if (!response.ok) throw new Error("User not found");
        const data = await response.json();
        setUser(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUser();
  }, [username]);
  const toggleShow = async () => {
    setShowQr(!showQr);
  };

  const isCurrentUser = currentUser && currentUser.username === username;

  return (
    <div className={`max-w-3xl mx-auto p-6 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } transition-all duration-300`}>
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : user ? (
        <div className="bg-white p-6 shadow-md rounded-lg">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold text-gray-700">
              {user.username}
            </h2>
            <p className="text-gray-600">{user.email}</p>

            {user.backgroundPic && (
              <div className="mt-6 w-full flex flex-col items-center relative">
                <div className="relative w-full h-56">
                  <img
                    src={user.backgroundPic}
                    alt={`${user.username}'s background`}
                    className="w-full h-full object-cover rounded-lg shadow-xl"
                  />
                  <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div>
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-6">
                  <div className="relative w-24 h-24">
                    <img
                      src={user.profilePic}
                      alt={`${user.username}'s profile`}
                      className="object-cover rounded-full border-4 border-white w-full h-full shadow-lg"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="">
            {isCurrentUser && (
              <div className="mt-8 text-center">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Your QR Code
                </h2>
                <p className="text-gray-600 mb-4">
                  Share this QR code to let others view your profile.
                </p>
                <div className="flex justify-center">
                  <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
                    <QR
                      value={window.location.href}
                      imageSrc={currentUser.profilePic}
                      toggleShow={toggleShow}
                      showQr={showQr}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">Loading...</p>
      )}
    </div>
  );
}
