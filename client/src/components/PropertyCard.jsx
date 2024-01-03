import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export default function PropertyCard({ property }) {
  return (
    <div className="bg-white shadow-md  hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${property._id}`}>
        <img
          src={property.imageUrls[0]}
          alt="Property Cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />

        <div className="flex flex-col p-3 gap-2 w-full">
          <p className="text-lg font-semibold truncate text-gray-700">
            {property.name}
          </p>
        <div className="flex gap-1 items-center">
            <MdLocationOn className="text-green-700 w-4 h-4"/>
            <p className="text-sm text-gray-600 truncate w-full">{property.address}</p>
        </div>
        <p className="text-sm truncate text-gray-500">{property.description}</p>
        <p className='text-gray-500 mt-2 font-semibold '>
            $
            {property.offer
              ? property.discountPrice
              : property.regularPrice}
            {property.type === 'rent' && ' / month'}
          </p>
          <div className='text-slate-700 flex gap-4'>
            <div className='font-bold text-xs'>
              {property.bedrooms > 1
                ? `${property.bedrooms} beds `
                : `${property.bedrooms} bed `}
            </div>
            <div className='font-bold text-xs'>
              {property.bathrooms > 1
                ? `${property.bathrooms} baths `
                : `${property.bathrooms} bath `}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
