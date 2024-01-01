import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import Contact from "../components/Contact";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [property, setProperty] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [contact, setContact] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const getProperty = async (id) => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
          setLoading(false);
          return;
        }
        setProperty(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    getProperty(params.listingId);
  }, [params.listingId]);
  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {property && !error && !loading && (
        <div>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{
              type: "progressbar",
            }}
            scrollbar={{ draggable: true }}
          >
            {property.imageUrls?.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold ">
              {property.name +
                " - $ " +
                (property.offer
                  ? property.discountPrice
                  : property.regularPrice) +
                (property.type === "rent" ? " / month" : "")}
            </p>
            <p className="flex items-center gap-2 mt-6 text-gray-500 font-semibold text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {property.address}
            </p>
            <div className="flex gap-4">
              <p className="p-1 bg-red-900 rounded-md w-full max-w-[200px] text-center text-white">
                {property.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {property.offer && (
                <p className="p-1 bg-green-900 rounded-md w-full max-w-[200px] text-center text-white">
                  ${+property.regularPrice - +property.discountPrice} OFF
                </p>
              )}
            </div>
            <p className="text-slate-800">
              <span className="font-semibold text-black">Description - </span>
              {property.description}
            </p>
            <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBed className="text-lg" />
                {property.bedrooms > 1
                  ? `${property.bedrooms} beds `
                  : `${property.bedrooms} bed `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBath className="text-lg" />
                {property.bathrooms > 1
                  ? `${property.bathrooms} baths `
                  : `${property.bathrooms} bath `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaParking className="text-lg" />
                {property.parking ? "Parking spot" : "No Parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaChair className="text-lg" />
                {property.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>
            {currentUser && property.userRef !== currentUser._id && !contact && (
              <button onClick={() => setContact(true)} className="text-white uppercase bg-gray-700 rounded-lg p-3 hover:opacity-85">
                Contact Owner
              </button>
            )}
            {contact && <Contact property={property} />}
          </div>
        </div>
      )}
    </main>
  );
}
