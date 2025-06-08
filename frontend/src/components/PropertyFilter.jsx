import React, { useState, useContext, useEffect } from "react";
import { PropertyContext } from "../context/propertyContext";

const PropertyFilter = () => {
  const {
    properties,
    setFilteredProperties
  } = useContext(PropertyContext);

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

      const matchBeds =
        bedrooms === "Any" || property.beds === parseInt(bedrooms);

      const matchBaths =
        baths === "Any" || property.baths === parseInt(baths);

      const matchFloors =
        floors === "Any" || property.floors === parseInt(floors);

      const matchPrice =
        price === "Any" ||
        (price === "0-1000" && property.price <= 1000) ||
        (price === "1000-2000" && property.price > 1000 && property.price <= 2000) ||
        (price === "2000+" && property.price > 2000);

      const matchStatus =
        availability === "Any" || property.currentStatus === availability;

      return (
        matchArea &&
        matchBeds &&
        matchBaths &&
        matchFloors &&
        matchPrice &&
        matchStatus
      );
    });

    setFilteredProperties(result);
  };

  // Automatically re-run filter when any filter input or property list changes
  useEffect(() => {
    handleFilter();
  }, [search, bedrooms, baths, floors, price, availability, properties]);

  return (
    <div className="px-4 py-10">
      {/* === FIRST FILTER BAR === */}
      <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-[40px] p-4 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 justify-center shadow-md">
        <input
          type="text"
          placeholder="Search town or postcode"
          className="flex-grow px-6 py-3 rounded-full border border-gray-300 outline-none text-gray-700"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="px-4 py-3 rounded-full border border-gray-300 text-gray-700"
        >
          <option value="Any">Any Price</option>
          <option value="0-1000">Below £1000</option>
          <option value="1000-2000">£1000 - £2000</option>
          <option value="2000+">Above £2000</option>
        </select>

        <select
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          className="px-4 py-3 rounded-full border border-gray-300 text-gray-700"
        >
          <option value="Any">Any Availability</option>
          <option value="Available">Available</option>
          <option value="Occupied">Occupied</option>
          <option value="Let Agreed">Let Agreed</option>
        </select>
      </div>

      {/* === SECOND FILTER BAR === */}
      <div className="max-w-3xl mt-4 mx-auto bg-white border border-gray-200 rounded-[40px] p-4 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 justify-center shadow-md">
        <select
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
          className="px-4 py-3 rounded-full border border-gray-300 text-gray-700"
        >
          <option value="Any">Any Bedrooms</option>
          <option value="1">1 Bedroom</option>
          <option value="2">2 Bedrooms</option>
          <option value="3">3 Bedrooms</option>
          <option value="4">4+ Bedrooms</option>
        </select>

        <select
          value={baths}
          onChange={(e) => setBaths(e.target.value)}
          className="px-4 py-3 rounded-full border border-gray-300 text-gray-700"
        >
          <option value="Any">Any Baths</option>
          <option value="1">1 Bath</option>
          <option value="2">2 Baths</option>
          <option value="3">3+ Baths</option>
        </select>

        <select
          value={floors}
          onChange={(e) => setFloors(e.target.value)}
          className="px-4 py-3 rounded-full border border-gray-300 text-gray-700"
        >
          <option value="Any">Any Floors</option>
          <option value="1">1 Floor</option>
          <option value="2">2 Floors</option>
          <option value="3">3+ Floors</option>
        </select>
      </div>
    </div>
  );
};

export default PropertyFilter;
