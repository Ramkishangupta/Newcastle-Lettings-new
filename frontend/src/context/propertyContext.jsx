import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const PropertyContext = createContext();

const PropertyContextProvider = ({ children }) => {
  const currency = "£";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [services, setServices] = useState([]);
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);

  // Fetch Services
  const fetchServices = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/v1/services`)
      if (res.data.success) {
        setServices(res.data.services || []);
      } else {
        toast.error("Error fetching services");
      }
    } catch (err) {
      toast.error("Failed to fetch services");
    }
  };

  // Fetch Properties
  const fetchProperties = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/v1/properties`);

      if (res.data.success) {
        setProperties(res.data.properties || []);
        setFilteredProperties(res.data.properties || []);
      } else {
        toast.error("Error fetching properties");
      }
    } catch (err) {
      toast.error("Failed to fetch properties");
    }
  };

  // Fetch both
  const refetchAll = async () => {
    await Promise.all([fetchServices(), fetchProperties()]);
  };

  useEffect(() => {
    refetchAll();
  }, []);

  const contextValue = {
    currency,
    services,
    properties,
    fetchServices,
    fetchProperties,
    refetchAll,
    filteredProperties,
    setFilteredProperties
  };

  return (
    <PropertyContext.Provider value={contextValue}>
      {children}
    </PropertyContext.Provider>
  );
};

export default PropertyContextProvider;