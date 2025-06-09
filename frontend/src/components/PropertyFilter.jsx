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
    <div className="w-full px-6 py-10 bg-[#f4f9fc]">
      <div className="w-full max-w-[1400px] mx-auto bg-white border border-[#d6eaf5] rounded-lg shadow-md p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <input
          type="text"
          placeholder="Search by city or postcode"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 text-sm rounded-md border border-[#aad4ed] bg-[#e8f4fb] text-[#003049] placeholder-[#6c98b6] focus:outline-none focus:ring-2 focus:ring-[#0096db] transition"
        />

        <select
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full px-4 py-2 text-sm rounded-md border border-[#aad4ed] bg-[#e8f4fb] text-[#003049] focus:outline-none focus:ring-2 focus:ring-[#0096db]"
        >
          <option value="Any">Any Price</option>
          <option value="0-1000">Below £1000</option>
          <option value="1000-2000">£1000 - £2000</option>
          <option value="2000+">Above £2000</option>
        </select>

        <select
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          className="w-full px-4 py-2 text-sm rounded-md border border-[#aad4ed] bg-[#e8f4fb] text-[#003049] focus:outline-none focus:ring-2 focus:ring-[#0096db]"
        >
          <option value="Any">Any Status</option>
          <option value="Available">Available</option>
          <option value="Occupied">Occupied</option>
          <option value="Let Agreed">Let Agreed</option>
        </select>

        <select
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
          className="w-full px-4 py-2 text-sm rounded-md border border-[#aad4ed] bg-[#e8f4fb] text-[#003049] focus:outline-none focus:ring-2 focus:ring-[#0096db]"
        >
          <option value="Any">Any Beds</option>
          <option value="1">1 Bed</option>
          <option value="2">2 Beds</option>
          <option value="3">3 Beds</option>
          <option value="4">4+ Beds</option>
        </select>

        <select
          value={baths}
          onChange={(e) => setBaths(e.target.value)}
          className="w-full px-4 py-2 text-sm rounded-md border border-[#aad4ed] bg-[#e8f4fb] text-[#003049] focus:outline-none focus:ring-2 focus:ring-[#0096db]"
        >
          <option value="Any">Any Baths</option>
          <option value="1">1 Bath</option>
          <option value="2">2 Baths</option>
          <option value="3">3+ Baths</option>
        </select>

        <select
          value={floors}
          onChange={(e) => setFloors(e.target.value)}
          className="w-full px-4 py-2 text-sm rounded-md border border-[#aad4ed] bg-[#e8f4fb] text-[#003049] focus:outline-none focus:ring-2 focus:ring-[#0096db]"
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
