import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
export default function Profile() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({username:'',email:'',password:'',avatar:''});
  const { currentUser } = useSelector((state: any) => state.user);

  console.log(file);
  console.log(filePercentage);
  console.log(formData);


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


  const handleFileUpload = (file: any) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadFile = uploadBytesResumable(storageRef, file);

    uploadFile.on(
      "state_changed",
      (snapshot: any) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
      },
      (error: any) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadFile.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...formData, avatar: downloadUrl });
        });
      }
    );
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold my-7 text-center text-gray-700">
        profile
      </h1>
      <form className="flex flex-col gap-4">
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
          src={formData.avatar||currentUser.avatar}
          alt="User Photo"
          className="mt-2 w-28 h-28 rounded-full self-center cursor-pointer"
        />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePercentage > 0 && filePercentage < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePercentage}%`}</span>
          ) : showSuccessMessage ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <input
          type="text"
          id="username"
          placeholder="username"
          className="border p-3 rounded-lg"
        />
        <input
          type="email"
          id="email"
          placeholder="email"
          className="border p-3  rounded-lg"
        />
        <input
          type="passwword"
          id="password"
          placeholder="password"
          className="border p-3  rounded-lg"
        />
        <button className="my-6 bg-gray-700 text-white p-3 rounded-lg hover:opacity-75 ">
          Update
        </button>
      </form>
      <div className="flex mt-6 justify-between">
        <span className="uppercase text-red-600 cursor-pointer hover:underline">
          Delete account
        </span>
        <span className="uppercase text-red-600 cursor-pointer hover:underline">
          Sign Out
        </span>
      </div>
    </div>
  );
}
