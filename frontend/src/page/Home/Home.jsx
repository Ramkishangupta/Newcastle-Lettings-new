import React, { useContext, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import MembersSection from '../../components/MembersSection';
import Card from '../../components/Card';
import PropertyBanner from '../../components/PropertyBanner';
import HeroSection from '../../components/HeroSection';
import { PropertyContext } from '../../context/propertyContext';
import { background1, background2 } from '../../assets/assets';

const images = [background1, background2];

const Home = () => {
  const { filteredProperties } = useContext(PropertyContext);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <Navbar />
      
      <HeroSection
        images={images}
        label="Properties"
        heading="Newcastle Lettings"
        subheading="Search properties for sale and to rent across the UK."
      />
      
      {/* <PropertyFilter /> */}

      {/* Cards Section */}
      <div className="flex flex-col items-center">
        <h2 className="text-xl md:text-4xl font-semibold text-[#002B5B] m-6 font-montserrat border-b-2 pb-2 border-[#002B5B]">Featured Properties</h2>
        <div className="flex flex-wrap gap-4 p-6 justify-center">
        {filteredProperties.map((item) => (
          <Card
            key={item._id}
            id={item._id}
            image={item.images[0]?.url || '/default.jpg'}
            title={item.title}
            location={item.location}
            place={item.city}
            price={item.price}
            beds={item.beds}
            baths={item.baths}
            floors={item.floors}
          />
        ))}
      </div>
      </div>
      <MembersSection/>
      {/* Property Banner Section */}
      <PropertyBanner
        title="Find Properties in Newcastle"
        description="Ideal Properties offer a variety of professional lettings in Newcastle, with our decades of combined experience we can help you find the perfect home in the North East. Our team are talented and dedicated to providing a reliable and professional service that you can trust."
      />
    </>
  );
};

export default Home;
