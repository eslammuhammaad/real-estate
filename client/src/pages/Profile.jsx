import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateStart,
  updateFailure,
  updateSuccess,
  deleteFailure,
  deleteStart,
  deleteSuccess,
  signoutStart,
  signoutSuccess,
  signoutFailure,
} from "../redux/user/userSlice";

export default function Profile() {
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [userUpdated, setUserUpdated] = useState(false);
  const [formData, setFormData] = useState({});
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  useEffect(() => {
    const delay = 2000;

    if (filePercentage === 100) {
      setTimeout(() => {
        setShowSuccessMessage(true);
      }, delay);
    }
  }, [filePercentage]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadFile = uploadBytesResumable(storageRef, file);

    uploadFile.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadFile.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...formData, avatar: downloadUrl });
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
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateFailure(data.message));
        return;
      }
      dispatch(updateSuccess(data));
      setUserUpdated(true);
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };

  const handleDelete =async ()=>{
    try {
      dispatch(deleteStart());
      const res =await fetch(`/api/user/delete/${currentUser._id}`,{
        method:'DELETE'
      })
      const data =await res.json();
      if(data.success===false){
        dispatch(deleteFailure(data.message));
        return;
      }
      dispatch(deleteSuccess(data));

    } catch (error) {
      dispatch(deleteFailure(error.message));
    }

  }

  const handleSignout = async ()=>{
    try {
      signoutStart();
      const res =await fetch('api/auth/signout')
      const data = await res.json();
      if(data.success===false){
        dispatch(signoutFailure(data.message));
        return;
      }
      dispatch(signoutSuccess(data));
    }
     catch (error) {
      dispatch(signoutFailure(error.message));
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold my-7 text-center text-gray-700">
        profile
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          onChange={(e) => {
            e.target.files && setFile(e.target.files[0]);
          }}
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current?.click()}
          src={formData.avatar || currentUser.avatar}
          alt="User Photo"
          className="mt-2 w-28 h-28 rounded-full self-center cursor-pointer"
        />
        <p className="text-sm self-center">
          {fileUploadError && formData.avatar === "" ? (
            <span className="text-red-700">
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePercentage > 0 && filePercentage < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePercentage}%`}</span>
          ) : showSuccessMessage ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          id="username"
          placeholder="username"
          className="border p-3 rounded-lg"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          placeholder="email"
          className="border p-3  rounded-lg"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className="border p-3  rounded-lg"
          onChange={handleChange}
        />
        <button disabled={loading} className="my-4 bg-gray-700 text-white p-3 rounded-lg hover:opacity-75 uppercase">
          {loading ? "Loading..." : "Update"}
        </button>
        <Link to={"/create-listing"} className="bg-green-600 text-white text-center p-3 rounded-lg hover:opacity-75 uppercase">
            Create Listing
        </Link>
      </form>
      <div className="flex mt-6 justify-between">
        <span onClick={handleDelete} className="uppercase text-red-600 cursor-pointer hover:underline">
          Delete account
        </span>
        <span onClick={handleSignout} className="uppercase text-red-600 cursor-pointer hover:underline">
          Sign Out
        </span>
      </div>
      <p className="text-red-700 mt-6">{error?error:''}</p>
      <p className="text-green-700 mt-6">{userUpdated?'Your Data Updated Successfully':''}</p>
    </div>
  );
}
