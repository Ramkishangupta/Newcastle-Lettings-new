import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { PropertyContext } from "../../context/propertyContext";
import Header from "../../components/Header";
import Gallery from "../../components/Gallery";
import PropertyTable from "../../components/PropertyTable";
import ViewingForm from "../../components/ViewingForm";
import PropertyDetails from "../../components/PropertyDetails";

const Property = () => {
  const { properties } = useContext(PropertyContext);
  const { propertyId } = useParams();
  const property = properties.find((p) => p._id === propertyId);


  return (
    <div>
      <Header
        title={property?.title}
        subtitle={property?.desc}
        address={`${property?.location}, ${property?.city}`}
      />
      <Gallery
      images={property?.images}
      locationEmbedUrl={property?.map}/>
      <div className="flex flex-wrap gap-4">
              <div>
                <PropertyTable property = {property}/>
                <PropertyDetails property = {property}/>
              </div>
              <ViewingForm></ViewingForm>
      </div>

    </div>
  );
};

export default Property;
