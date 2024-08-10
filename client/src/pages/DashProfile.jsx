import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../redux/user/userSlice";

export default function DashProfile() {
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(0);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileBg, setImageFileBg] = useState(null);
  const [imageFileUrlBg, setImageFileUrlBg] = useState(null);
  const [imageFileUploadProgressBg, setImageFileUploadProgressBg] = useState(0);
  const [imageFileUploadErrorBg, setImageFileUploadErrorBg] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const filePickerRef = useRef();
  const filePickerRefBg = useRef();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  useEffect(() => {
    if (imageFileBg) {
      uploadImageBg();
    }
  }, [imageFileBg]);

  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.username);
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const handleImageChangeBg = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFileBg(file);
      setImageFileUrlBg(URL.createObjectURL(file));
    }
  };

  const uploadImage = () => {
    setImageFileUploadError(null);
    setImageFileUploadProgress(0);

    const storage = getStorage(app);
    const fileName = `profile-${Date.now()}-${imageFile.name}`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setImageFileUploadProgress(progress);
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        setImageFile(null);
        setImageFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setImageFileUrl(downloadURL);
          })
          .catch(() => {
            setImageFileUploadError("Could not get image download URL");
          });
      }
    );
  };

  const uploadImageBg = () => {
    setImageFileUploadErrorBg(null);
    setImageFileUploadProgressBg(0);

    const storage = getStorage(app);
    const fileName = `background-${Date.now()}-${imageFileBg.name}`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFileBg);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setImageFileUploadProgressBg(progress);
      },
      (error) => {
        setImageFileUploadErrorBg(
          "Could not upload image (File must be less than 2MB)"
        );
        setImageFileBg(null);
        setImageFileUrlBg(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setImageFileUrlBg(downloadURL);
          })
          .catch(() => {
            setImageFileUploadErrorBg("Could not get image download URL");
          });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserStart());
    try {
      const updatedData = {
        username,
        email,
        profilePic: imageFileUrl || currentUser.profilePic,
        backgroundPic: imageFileUrlBg || currentUser.backgroundPic,
        password: password || undefined,
      };

      const response = await fetch(`/api/users/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedUser = await response.json();
      dispatch(updateUserSuccess(updatedUser));
      navigate(`/profile/${updatedUser.username}`);
    } catch (error) {
      console.error("Error updating profile:", error);
      dispatch(updateUserFailure(error.message));
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 w-full">
      <h1 className="my-8 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChangeBg}
          ref={filePickerRefBg}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress > 0 && (
            <CircularProgressbar
              value={imageFileUploadProgress}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(50, 50, 50, ${imageFileUploadProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePic}
            alt="Profile"
            className={`rounded-full w-full h-full object-cover border-4 border-gray-200 ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-70"
            }`}
          />
        </div>
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRefBg.current.click()}
        >
          {imageFileUploadProgressBg > 0 && (
            <CircularProgressbar
              value={imageFileUploadProgressBg}
              text={`${imageFileUploadProgressBg}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(50, 50, 50, ${
                    imageFileUploadProgressBg / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrlBg || currentUser.backgroundPic}
            alt="Background"
            className={`rounded-full w-full h-full object-cover border-4 border-gray-200 ${
              imageFileUploadProgressBg &&
              imageFileUploadProgressBg < 100 &&
              "opacity-70"
            }`}
          />
        </div>
        {imageFileUploadError && (
          <div className="text-red-500 text-center">{imageFileUploadError}</div>
        )}
        {imageFileUploadErrorBg && (
          <div className="text-red-500 text-center">
            {imageFileUploadErrorBg}
          </div>
        )}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border rounded-md"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded-md"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
