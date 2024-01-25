import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import PropertyCard from '../components/PropertyCard';
import { FaSearch } from "react-icons/fa";


export default function Home() {
  const [offerProperties, setOfferProperties] = useState([]);
  const [saleProperties, setSaleProperties] = useState([]);
  const [rentProperties, setRentProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();


  SwiperCore.use([Navigation]);

  const handleSearch = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermUrl = urlParams.get("searchTerm");
    if (searchTermUrl) {
      setSearchTerm(searchTermUrl);
    }
  }, [location.search]);
 
  useEffect(() => {
    const fetchOfferProperties = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferProperties(data);
        fetchRentProperties();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentProperties = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentProperties(data);
        fetchSaleProperties();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleProperties = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sell&limit=4');
        const data = await res.json();
        setSaleProperties(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferProperties();
  }, []);
  return (
    <div>
      <div className="text-gray-700  py-20 px-4">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
            Find your next{' '}
            <span className="text-blue-500">perfect</span> place with ease
          </h1>
          <p className="text-gray-400 text-lg  p-3">
            Infinity Estate is the best place to find your next perfect place to
            live. We have a wide range of properties for you to choose from.
         
          </p>
          <form
          onSubmit={handleSearch}
          className="bg-gray-200 p-3 rounded-lg items-center  flex mt-10 justify-between w-full sm:w-[600px]
          "
        > 
          <input
            type="text"
            placeholder="Enter Address or City"
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <button>
            <FaSearch className="text-blue-500" />
          </button>
        </form>
        </div>
      </div>

      <Swiper navigation>
        {offerProperties &&
          offerProperties.length > 0 &&
          offerProperties.map((property) => (
            <SwiperSlide key={property._id}>
              <div
                style={{
                  background: `url(${property.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
                key={property._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>


      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerProperties && offerProperties.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerProperties.map((property) => (
                <PropertyCard property={property} key={property._id} />
              ))}
            </div>
          </div>
        )}
        {rentProperties && rentProperties.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentProperties.map((property) => (
                <PropertyCard property={property} key={property._id} />
              ))}
            </div>
          </div>
        )}
        {saleProperties && saleProperties.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sell'}>Show more places for sale</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleProperties.map((property) => (
                <PropertyCard property={property} key={property._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}