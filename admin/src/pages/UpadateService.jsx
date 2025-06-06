import { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const UpdateService = () => {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);

  const fetchServices = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/v1/services`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setServices(data.services);
    } catch (err) {
      toast.error("Error fetching services");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      const res = await fetch(`${backendUrl}/api/v1/service/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success("Service deleted successfully!");
      fetchServices();
    } catch (err) {
      toast.error("Failed to delete: " + err.message);
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${backendUrl}/api/v1/service/${editingService._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingService),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success("Service updated successfully!");
      setEditingService(null);
      fetchServices();
    } catch (err) {
      toast.error("Update failed: " + err.message);
    }
  };

  const handleEditChange = (field, value) => {
    setEditingService((prev) => ({ ...prev, [field]: value }));
  };

  const handleSectionChange = (index, field, value) => {
    const updated = [...editingService.sections];
    updated[index][field] = value;
    setEditingService((prev) => ({ ...prev, sections: updated }));
  };

  return (
    <div className="max-w-6xl mx-auto p-8 flex flex-col md:flex-row gap-12">
      {/* LEFT COLUMN: Edit Form */}
      <div className="w-full md:w-1/2">
        <h2 className="text-xl font-semibold mb-6 border-b border-black inline-block">
          {editingService ? "EDIT SERVICE" : "SERVICE INFORMATION"}
        </h2>

        {editingService ? (
          <form
            onSubmit={handleUpdate}
            className="flex flex-col gap-6 p-6 rounded"
          >
            <input
              type="text"
              value={editingService.serviceName}
              onChange={(e) => handleEditChange("serviceName", e.target.value)}
              placeholder="Service Name"
              className="w-full border border-gray-300 px-4 py-2 rounded"
              required
            />

            <textarea
              value={editingService.desc}
              onChange={(e) => handleEditChange("desc", e.target.value)}
              rows={4}
              placeholder="Description"
              className="w-full border border-gray-300 px-4 py-2 rounded"
              required
            />

            <div>
              <h3 className="text-lg font-medium mb-2">Sections</h3>
              {editingService.sections.map((s, idx) => (
                <div key={idx} className="mb-4">
                  <input
                    type="text"
                    value={s.subtitle}
                    onChange={(e) => handleSectionChange(idx, "subtitle", e.target.value)}
                    placeholder="Subtitle"
                    className="w-full mb-2 border border-gray-300 px-3 py-2 rounded"
                    required
                  />
                  <textarea
                    value={s.content}
                    onChange={(e) => handleSectionChange(idx, "content", e.target.value)}
                    rows={3}
                    placeholder="Content"
                    className="w-full border border-gray-300 px-3 py-2 rounded"
                    required
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
              >
                UPDATE
              </button>
              <button
                type="button"
                onClick={() => setEditingService(null)}
                className="text-gray-600 hover:underline"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <p className="text-gray-500 text-lg">Select a service to edit</p>
        )}
      </div>

      {/* RIGHT COLUMN: Services List */}
      <div className="w-full md:w-1/2">
        <h2 className="text-xl font-semibold mb-6 border-b border-black inline-block">
          ALL SERVICES
        </h2>

        <div className="space-y-6">
          {services.map((service) => (
            <div
              key={service._id}
              className="p-6 rounded-sm border border-gray-400"
            >
              <h3 className="text-lg font-semibold">{service.serviceName}</h3>
              <p className="text-gray-700 text-sm mt-1">{service.desc}</p>

              <ul className="list-disc pl-5 mt-3 text-sm text-gray-600">
                {service.sections.map((s, i) => (
                  <li key={i}>
                    <strong>{s.subtitle}</strong>: {s.content}
                  </li>
                ))}
              </ul>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handleEdit(service)}
                  className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(service._id)}
                  className="border border-red-500 text-red-500 px-4 py-1 rounded hover:bg-red-50 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpdateService;
