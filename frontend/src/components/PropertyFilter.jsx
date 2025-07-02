import React, { useState, useContext, useEffect } from "react";
import { PropertyContext } from "../context/propertyContext";

const PropertyFilter = () => {
  const { properties, setFilteredProperties } = useContext(PropertyContext);

  const [search, setSearch] = useState("");
  const [bedrooms, setBedrooms] = useState("Any");
  const [price, setPrice] = useState("Any");
  const [availability, setAvailability] = useState("Any");
  const [baths, setBaths] = useState("Any");
  const [floors, setFloors] = useState("Any");

  const handleFilter = () => {
    const result = properties.filter((property) => {
      const matchArea =
        property.city.toLowerCase().includes(search.toLowerCase()) ||
        property.location.toLowerCase().includes(search.toLowerCase());

      const matchBeds = bedrooms === "Any" || property.beds === parseInt(bedrooms);
      const matchBaths = baths === "Any" || property.baths === parseInt(baths);
      const matchFloors = floors === "Any" || property.floors === parseInt(floors);
      const matchPrice =
        price === "Any" ||
        (price === "0-1000" && property.price <= 1000) ||
        (price === "1000-2000" && property.price > 1000 && property.price <= 2000) ||
        (price === "2000+" && property.price > 2000);
      const matchStatus = availability === "Any" || property.currentStatus === availability;

      return matchArea && matchBeds && matchBaths && matchFloors && matchPrice && matchStatus;
    });

    setFilteredProperties(result);
  };

  useEffect(() => {
    handleFilter();
  }, [search, bedrooms, baths, floors, price, availability, properties]);

  return (
    <div className="w-full px-6 py-10 bg-transparent">
  {/* Top Search Bar */}
  <div className="w-full max-w-6xl mx-auto rounded-full bg-white shadow-md px-6 py-3 flex items-center">
    <input
      type="text"
      placeholder="Search town or postcode"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="flex-grow bg-transparent outline-none text-gray-700 text-sm placeholder-gray-500"
    />
    <svg
      className="w-5 h-5 text-gray-500"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
    </svg>
  </div>

  {/* Bottom Filters */}
  <div className="w-full max-w-6xl mx-auto mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
    <select
      value={price}
      onChange={(e) => setPrice(e.target.value)}
      className="w-full text-center px-4 py-3 rounded-full border border-gray-300 bg-white text-gray-600 font-semibold appearance-none"
    >
      <option value="Any">Any Price</option>
      <option value="0-1000">Below £1000</option>
      <option value="1000-2000">£1000 - £2000</option>
      <option value="2000+">Above £2000</option>
    </select>

    <select
      value={availability}
      onChange={(e) => setAvailability(e.target.value)}
      className="w-full text-center px-4 py-3 rounded-full border border-gray-300 bg-white text-gray-600 font-semibold appearance-none"
    >
      <option value="Any">Any Status</option>
      <option value="Available">Available</option>
      <option value="Occupied">Occupied</option>
      <option value="Let Agreed">Let Agreed</option>
    </select>

    <select
      value={bedrooms}
      onChange={(e) => setBedrooms(e.target.value)}
      className="w-full text-center px-4 py-3 rounded-full border border-gray-300 bg-white text-gray-600 font-semibold appearance-none"
    >
      <option value="Any">Any Beds</option>
      <option value="1">1 Bed</option>
      <option value="2">2 Beds</option>
      <option value="3">3 Beds</option>
      <option value="4">4+ Beds</option>
    </select>
  </div>
</div>

  );
};

export default PropertyFilter;
