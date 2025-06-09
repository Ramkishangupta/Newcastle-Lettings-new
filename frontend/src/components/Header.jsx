import React from 'react';
import { FaArrowLeft, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Header = ({ title, subtitle, address }) => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="text-left m-8 text-sm font-semibold text-[#0C1635] flex items-center gap-2 cursor-pointer font-roboto-condensed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0C1635]"
        aria-label="Back to Listings"
      >
        <FaArrowLeft />
        <span>BACK TO LISTINGS</span>
      </button>

      {/* Title Section */}
      <div className="text-center font-sans text-[#0C1635] px-6 py-10 md:px-30">
        <h1 className="text-4xl md:text-5xl font-semibold leading-tight font-playfair">
          {title}
        </h1>

        <div className="my-4 flex justify-center text-[#0C1635]">
          <FaMapMarkerAlt className="text-xl" />
        </div>

        <p className="text-[#64748B] text-base md:text-lg border-t border-solid border-[#CBD5E1] inline-block pt-2 mt-2">
          {address}
        </p>
      </div>
    </div>
  );
};

export default Header;
