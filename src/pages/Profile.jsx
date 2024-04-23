import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../Firebase";
import { useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice";

import { Link } from "react-router-dom";

function Profile() {
  const { currentUser, loading } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingError, setShowListingError] = useState(false);
  const [userListing, setUserListing] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = async (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        console.error(error);
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prevData) => ({ ...prevData, avatar: downloadURL }));
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };

  const handleShowListing = async () => {
    try {
      setShowListingError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingError(true);
        return;
      }
      setUserListing(data);
    } catch (error) {
      setShowListingError(true);
    }
  };

  const handleDeleteListing = async (ListingId) => {
  try {
    const res = await fetch(`/api/listing/delete/${ListingId}`,{
      method: "DELETE",
    });
    const data = res.json();
    if (data.success === false) {
      console.log(data.message);
      return;
    }
    setUserListing((prev) =>
      prev.filter((listing) => listing._id !== ListingId)
    );
  } catch (error) {
    console.log(error.message);
  }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-10">User Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="user profile photo"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-3"
        />
        <p className="text-sm self-center mt-2">
          {fileUploadError ? (
            <span className="text-red-600">
              Error Image upload (image must be less than 2MB)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-blue-600">{`Uploading... ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-600">Uploaded successfully</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="Name"
          id="username"
          defaultValue={currentUser.username}
          className="border p-3 rounded-lg mt-3"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          id="email"
          className="border p-3 rounded-lg mt-3"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          defaultValue={currentUser.password}
          id="password"
          className="border p-3 rounded-lg mt-3"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-gray-800 text-white font-semibold border p-3 rounded-lg mt-3 uppercase hover:opacity-90 disabled:opacity-80"
        >
          {loading ? "Updating..." : "Update"}
        </button>
        <Link
          className="bg-indigo-800 text-white text-center font-semibold border p-3 rounded-lg mt-3 uppercase hover:opacity-90"
          to={"/services"}
        >
          Add Services
        </Link>
      </form>
      <div className="flex justify-between mt-3">
        <span
          onClick={handleDeleteUser}
          className="text-red-600 cursor-pointer"
        >
          Delete account
        </span>
        <span onClick={handleSignOut} className="text-black cursor-pointer">
          Sign out
        </span>
      </div>
      {updateSuccess ? (
        <p className="text-green-800 mt-3">Profile updated successfully</p>
      ) : (
        ""
      )}

      <button
        onClick={handleShowListing}
        className="text-green-700 mt-2 w-full"
      >
        Show Listing
      </button>
      <p className="text-red-600 mt-5">
        {showListingError ? "Error fetching listings" : ""}
      </p>
      {userListing &&
        userListing.length > 0 &&
        <div className=" flex flex-col gap-4">
          <h1 className="text-center text-2xl mt-7 font-semibold">Your Listed Services</h1>
        {userListing.map((listing) => (
          <div
            key={listing._id}
            className="border rounded-lg p-3 gap-4 flex justify-between items-center"
          >
            <Link to={`/listing/${listing._id}`}>
              <img
                src={listing.imageUrl[0]}
                alt="Listing cover image"
                className="h-20 w-20 object-contain"
              />
            </Link>
            <Link
              className="text-black font-semibold  hover:underline truncate flex-1 "
              to={`/listing/${listing._id}`}
            >
              <p>{listing.title}</p>
            </Link>

            <div className=" flex flex-col gap-2">
              <button onClick={() => handleDeleteListing(listing._id)} className="bg-red-600 text-white p-2 rounded-md hover:opacity-70">
                Remove
              </button>
              <Link to={`/updateservices/${listing._id}`}>
              <button className="bg-blue-800 text-white p-2 rounded-md hover:opacity-70">
                Edit
              </button>
              </Link>
            </div>
          </div>
        ))}
        </div>}
    </div>
  );
}

export default Profile;
