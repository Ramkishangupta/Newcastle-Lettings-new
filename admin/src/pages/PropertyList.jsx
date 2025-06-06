import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { backendUrl } from "../App";
import { toast } from "react-toastify"; 
import Loader from "../components/Loader";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/v1/properties`, {
        withCredentials: true,
      });
      setProperties(data.properties || []);
    } catch (error) {
      console.error("Failed to fetch properties:", error);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteProperty = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/v1/properties/${id}`);
      setProperties((prev) => prev.filter((property) => property._id !== id));
      toast.success("Property deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete property"); 
    }
  };

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">All Properties List</h2>

      {loading ? (
        <Loader/>
      ) : (
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">C. Status</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {properties.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No properties found.
                </td>
              </tr>
            ) : (
              properties.map((property) => (
                <tr
                  key={property._id}
                  className="border-b last:border-b-0 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">
                    <img
                      src={property.images?.[0]?.url}
                      alt="property"
                      className="h-14 w-14 object-cover rounded"
                    />
                  </td>
                  <td className="py-3 px-4">{property.title}</td>
                  <td className="py-3 px-4">
                    {property.currentStatus || "N/A"}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => deleteProperty(property._id)}
                      className="text-red-600 hover:text-red-800 cursor-pointer"
                      title="Delete"
                    >
                      <MdDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PropertyList;
