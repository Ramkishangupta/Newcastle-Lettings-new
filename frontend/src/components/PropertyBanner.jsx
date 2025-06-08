import React from 'react';

const PropertyBanner = ({ title, description }) => {
  return (
    <section className="bg-gray-200 border-b-4 border-[#0c1b57] py-16 px-4 text-center">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-semibold text-[#0c1b57] mb-6">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
          {description}
        </p>
      </div>
    </section>
  );
};


export default PropertyBanner;
