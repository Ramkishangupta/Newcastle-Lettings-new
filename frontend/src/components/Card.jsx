import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({
  id,
  image,
  title,
  location,
  place,
  price,
  beds,
  baths,
  floors,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/property/:{id}`);
  };

  return (
    <div className="w-[300px] h-auto shadow-md overflow-hidden border border-gray-200 bg-white flex flex-col">
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <img
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
          src={image}
          alt={title}
          loading="lazy"
        />
      </div>

      {/* Text Content Section */}
      <div className="p-2 text-center text-blue-900 flex-grow">
        <h2 className="text-base sm:text-lg font-medium leading-relaxed">
          {title}
          <br />
          <span className="text-sm text-blue-900">{location}</span>
        </h2>
        <h3 className="text-xl font-bold mt-0.5 underline uppercase">{place}</h3>
        <p className="text-lg font-semibold mt-2">
          ${price}
          <span className="text-base font-normal"> pcm</span>
        </p>
        <p className="text-sm mt-1">
          <span className="font-medium">Beds:</span> {beds}{" "}
          <span className="font-medium">Baths:</span> {baths}{" "}
          <span className="font-medium">Floors:</span> {floors}
        </p>
      </div>

      {/* Button Section */}
      <div className="flex justify-center items-center p-3">
        <button
          type="button"
          onClick={handleClick}
          className="relative w-[200px] py-2 border-2 border-[#2b3f7d] text-[#2b3f7d] font-semibold overflow-hidden z-0 group cursor-pointer"
          aria-label={`View details for ${title}`}
        >
          <span className="relative z-10 group-hover:text-white transition-colors duration-300">
            View
          </span>
          <span className="absolute left-0 top-0 h-full w-0 bg-gradient-to-r from-[#2b3f7d] to-[#2b3f7d] transition-all duration-500 group-hover:w-full z-0" />
        </button>
      </div>
    </div>
  );
};

export default Card;
