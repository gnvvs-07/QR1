import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function DashProfile() {
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(0);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);

  const filePickerRef = useRef();

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const uploadImage = () => {
    setImageFileUploadError(null);
    setImageFileUploadProgress(0);

    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
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
          .catch((error) => {
            setImageFileUploadError("Could not get image download URL");
          });
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for updating the profile, including updating Firebase with new data
    // and potentially making an API request to update the user information in the database
    // Replace this comment with your logic
    console.log("Profile updated");
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
            alt="User"
            className={`rounded-full w-full h-full object-cover border-8 border-[#26235b62] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-35"
            }`}
          />
        </div>
        {imageFileUploadError && (
          <div className="text-red-500 text-center">{imageFileUploadError}</div>
        )}
        <input
          type="text"
          placeholder="Username"
          defaultValue={currentUser.username}
          className="p-2 border rounded-md"
        />
        <input
          type="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          className="p-2 border rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 border rounded-md"
        />
        <button
          type="submit"
          className="bg-purple-500 text-white p-2 rounded-md hover:bg-purple-700"
        >
          Update
        </button>
      </form>
      <div className="text-red-500 flex justify-between mt-7">
        <span className="cursor-pointer hover:underline">Delete Account</span>
        <span className="cursor-pointer hover:underline">Sign Out</span>
      </div>
    </div>
  );
}
