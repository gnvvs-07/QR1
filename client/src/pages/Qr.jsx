import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import QR from "../components/Qr";

export default function Qr() {
  const { currentUser } = useSelector((state) => state.user);
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

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

  const isCurrentUser = currentUser && currentUser.username === username;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        {isCurrentUser ? "Your Profile" : "User Profile"}
      </h1>

      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : user ? (
        <div className="bg-white p-6 shadow-md rounded-lg">
          <div className="flex flex-col items-center">
            {user.profilePic && (
              <img
                src={user.profilePic}
                alt={`${user.username}'s profile`}
                className="w-32 h-32 object-cover rounded-full shadow-lg mb-4"
              />
            )}
            <h2 className="text-2xl font-semibold text-gray-700">
              {user.username}
            </h2>
            <p className="text-gray-600">{user.email}</p>

            {user.backgroundPic && (
              <div className="mt-4 w-full">
                <img
                  src={user.backgroundPic}
                  alt={`${user.username}'s background`}
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                />
              </div>
            )}
          </div>

          {isCurrentUser && (
            <div className="mt-8 text-center">
              <h2 className="text-2xl font-semibold text-gray-800">
                Your Custom QR Code
              </h2>
              <p className="text-gray-600 mb-4">
                Share this QR code to let others view your profile.
              </p>
              <div className="flex justify-center">
                <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
                  <QR
                    value={window.location.href}
                    imageSrc={currentUser.profilePic}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-600">Loading...</p>
      )}
    </div>
  );
}
