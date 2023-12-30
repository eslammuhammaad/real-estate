import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";

export default function CreateListing() {
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  console.log(formData);

  const handleUploadImages = (e) => {
    if (images.length > 0 && images.length + formData.imageUrls.length < 7) {
      setUploading(true);
      const promises = [];
      for (let i = 0; i < images.length; i++) {
        promises.push(storeImages(images[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((error) => {
          setImageUploadError(
            "Image Upload Failed, (max 2 mb per each image.)"
          );
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload max 6 images");
    }
  };

  const storeImages = async (image) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const imageName = new Date().getTime() + image.name;
      const storageRef = ref(storage, imageName);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "states_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            resolve(downloadUrl);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => {
        return i !== index;
      }),
    });
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-gray-700 text-center my-7">
        Create A Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            id="name"
            className="p-3 rounded-lg border border-gray-300"
            maxLength="62"
            minLength="10"
            required
          />
          <textarea
            type="text"
            id="description"
            className="p-3 rounded-lg border border-gray-300"
            placeholder="Description"
            required
          ></textarea>
          <input
            type="text"
            placeholder="Address"
            id="address"
            className="p-3 rounded-lg border border-gray-300"
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="bedrooms"
                className="p-3 border rounded-lg"
                min="1"
                max="10"
                required
              />
              <p>Bedrooms</p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="bathrooms"
                className="p-3 border rounded-lg"
                min="1"
                max="10"
                required
              />
              <p>Bathrooms</p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="regularPrice"
                className="p-3 border rounded-lg"
                min="50"
                max="10000000"
                required
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">$ / Month</span>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="discountPrice"
                className="p-3 border rounded-lg"
                min="0"
                max="10000000"
                required
              />
              <div className="flex flex-col items-center">
                <p>Discounted Price</p>
                <span className="text-xs">$ / Month</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-500 ml-2">
              {" "}
              The First image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              className="border border-gray-300 rounded p-3 w-full"
              onChange={(e) => setImages(e.target.files)}
            />
            <button
              onClick={handleUploadImages}
              type="button"
              className="uppercase border border-green-500 text-green-500 p-3 rounded-lg hover:shadow-lg disabled:opacity-90"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <p className="text-xs text-red-600">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={index}
                className="flex justify-between items-center border p-3 rounded-lg"
              >
                <img
                  alt="property images"
                  src={url}
                  className="w-20 h-20 rounded-lg object-contain"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="text-red-500 border border-red-500 rounded-lg  p-3 hover:text-white hover:bg-red-500 uppercase"
                >
                  Delete
                </button>
              </div>
            ))}
          <button className="bg-gray-700 text-white p-3 rounded-lg uppercase my-6 hover:opacity-75">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
