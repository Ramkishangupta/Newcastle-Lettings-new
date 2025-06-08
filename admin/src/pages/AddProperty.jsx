import { useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const AddProperty = () => {
  const [form, setForm] = useState({
    title: "",
    desc: "",
    location: "",
    city: "",
    beds: 0,
    baths: 0,
    floors: 0,
    price: 0,
    tenantType: "Any",
    deposit: 0,
    currentStatus: "Available",
    epcRating: "",
    councilTaxBand: "",
    map: "",
    availableFrom: "",
  });

  const [images, setImages] = useState([null, null, null, null]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const updatedImages = [...images];
    updatedImages[index] = file;
    setImages(updatedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // Append all form fields to FormData
      for (const key in form) {
        formData.append(key, form[key]);
      }

      // Append image files (up to 4) to FormData under "images"
      images.slice(0, 4).forEach((image) => {
        if (image) {
          formData.append("images", image);
        }
      });

      const response = await fetch(`${backendUrl}/api/v1/properties`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      toast.success("Property added successfully!");
      // Reset form and images
    setForm({
      title: "",
      desc: "",
      location: "",
      city: "",
      beds: 0,
      baths: 0,
      floors: 0,
      price: 0,
      tenantType: "Any",
      deposit: 0,
      currentStatus: "Available",
      epcRating: "",
      councilTaxBand: "",
      map: "",
      availableFrom: "",
    });

    setImages([null, null, null, null]);
    } catch (error) {
      alert("Failed to add property. " + error.message);
      toast.error("Failed to add property: " + error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 rounded-lg space-y-6"
    >
      {/* Upload Images with Preview */}
      <div className="flex flex-wrap gap-2">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="relative w-24 h-24 border-2 border-dashed border-gray-300 flex items-center justify-center rounded overflow-hidden group"
          >
            {img ? (
              <img
                src={URL.createObjectURL(img)}
                alt={`Preview ${idx + 1}`}
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-sm text-gray-400">Upload</span>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, idx)}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        ))}
      </div>

      {/* Title */}
      <input
        type="text"
        name="title"
        placeholder="Property title"
        value={form.title}
        onChange={handleInputChange}
        required
        className="w-full border border-gray-300 rounded px-4 py-2"
      />

      {/* Description */}
      <textarea
        name="desc"
        placeholder="Property description"
        value={form.desc}
        onChange={handleInputChange}
        required
        className="w-full border border-gray-300 rounded px-4 py-2"
      ></textarea>

      {/* Location & City */}
      <div className="flex gap-4">
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleInputChange}
          required
          className="w-1/2 border border-gray-300 rounded px-4 py-2"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleInputChange}
          required
          className="w-1/2 border border-gray-300 rounded px-4 py-2"
        />
      </div>

      {/* Beds, Baths, Floors */}
      <div className="flex gap-4">
        {["beds", "baths", "floors"].map((field) => (
          <div key={field} className="w-1/3">
            <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
              {field}
            </label>
            <input
              type="number"
              name={field}
              value={form[field]}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>
        ))}
      </div>

      {/* Price & Deposit */}
      <div className="flex gap-4">
        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Deposit
          </label>
          <input
            type="number"
            name="deposit"
            value={form.deposit}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
        </div>
      </div>

      {/* Tenant Type & Status */}
      <div className="flex gap-4">
        <select
          name="tenantType"
          value={form.tenantType}
          onChange={handleInputChange}
          className="w-1/2 border border-gray-300 rounded px-4 py-2"
        >
          {["Any", "Student", "Professional", "Family"].map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          name="currentStatus"
          value={form.currentStatus}
          onChange={handleInputChange}
          className="w-1/2 border border-gray-300 rounded px-4 py-2"
        >
          {["Available", "Occupied", "Let Agreed"].map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* EPC & Council Tax Band */}
      <div className="flex gap-4">
        <input
          type="text"
          name="epcRating"
          placeholder="EPC Rating"
          value={form.epcRating}
          onChange={handleInputChange}
          className="w-1/2 border border-gray-300 rounded px-4 py-2"
        />
        <input
          type="text"
          name="councilTaxBand"
          placeholder="Council Tax Band"
          value={form.councilTaxBand}
          onChange={handleInputChange}
          className="w-1/2 border border-gray-300 rounded px-4 py-2"
        />
      </div>

      {/* Map Link */}
      <input
        type="text"
        name="map"
        placeholder="Google Maps link"
        value={form.map}
        onChange={handleInputChange}
        className="w-full border border-gray-300 rounded px-4 py-2"
      />

      {/* Available From */}
      <input
        type="date"
        name="availableFrom"
        value={form.availableFrom}
        onChange={handleInputChange}
        required
        className="w-full border border-gray-300 rounded px-4 py-2"
      />

      <button
        type="submit"
        onSubmit={handleSubmit}
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition cursor-pointer"
      >
        ADD
      </button>
    </form>
  );
};

export default AddProperty;
