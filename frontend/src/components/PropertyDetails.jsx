import React from "react";

// Sample PropertyDetails Component
const PropertyDetails = ({ property }) => {
  if (!property) return <div>No property data available.</div>;

  const {
    price,
    beds,
    desc,
    tenantType,
    availableFrom,
    epcRating,
    councilTaxBand,
    location,
    city,
  } = property;

  const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

  return (
    <div className="bg-white space-y-4 w-[90%] max-w-3xl mx-auto m-6">
      {/* Header Line */}
      <h2 className="text-lg font-semibold text-gray-800">
        *** £{price}PPPW – {beds} bedrooms – {tenantType?.toLowerCase()} – available {formatDate(availableFrom)} ***
      </h2>

      {/* Description */}
      <p className="text-gray-700">{desc}</p>

      {/* Location Highlight */}
      <p className="text-gray-700">
        The property is situated at <strong>{location}, {city}</strong>, with easy access to local amenities and transport.
      </p>

      {/* Features */}
      <p className="text-gray-700">
        The property comprises {beds} bedrooms, lounge, bathroom(s), kitchen with fitted units, and may include central heating, double glazing, and outdoor space.
      </p>

      <p className="text-gray-700">
        Available on a furnished basis, call us today to arrange your viewing!
      </p>

      {/* EPC & Tax Band */}
      <div className="flex gap-8 mt-4">
        <p><strong>EPC Rating</strong> – {epcRating || "Not specified"}</p>
        <p><strong>Council Tax Band</strong> – {councilTaxBand || "Not specified"}</p>
      </div>
    </div>
  );
};

export default PropertyDetails;
