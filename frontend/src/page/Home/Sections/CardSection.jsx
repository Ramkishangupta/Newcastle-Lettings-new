import React, { useContext } from 'react';
import Card from '../../../components/Card';
import {PropertyContext} from '../../../context/propertyContext';

const CardsSection = () => {
  const { properties } = useContext(PropertyContext);

  return (
    <div className="flex flex-wrap gap-4 p-6 justify-center">
      {properties.map((item) => (
        <Card
          key={item._id}
          image={item.images[0]?.url || "/default.jpg"} 
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
  );
};

export default CardsSection;
