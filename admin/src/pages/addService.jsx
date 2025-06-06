import { useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const AddService = () => {
  const [form, setForm] = useState({
    serviceName: "",
    desc: "",
  });

  const [sections, setSections] = useState([
    { subtitle: "", content: "" },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSectionChange = (index, field, value) => {
    const updatedSections = [...sections];
    updatedSections[index][field] = value;
    setSections(updatedSections);
  };

  const addSection = () => {
    setSections([...sections, { subtitle: "", content: "" }]);
  };

  const removeSection = (index) => {
    const updated = sections.filter((_, i) => i !== index);
    setSections(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${backendUrl}/api/v1/service`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, sections }),
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      toast.success("Service added successfully!");
      setForm({ serviceName: "", desc: "" });
      setSections([{ subtitle: "", content: "" }]);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add service: " + err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto flex flex-col gap-12 p-8"
    >
      {/* LEFT SIDE */}
      <div>
        <h2 className="text-xl font-semibold mb-6 border-b border-black inline-block">
          SERVICE <span className="font-normal">INFORMATION</span>
        </h2>

        <input
          type="text"
          name="serviceName"
          placeholder="Service Name"
          value={form.serviceName}
          onChange={handleChange}
          required
          className="w-full mb-4 border border-gray-300 px-4 py-2 rounded"
        />

        <textarea
          name="desc"
          placeholder="Description"
          value={form.desc}
          onChange={handleChange}
          required
          rows="4"
          className="w-full border border-gray-300 px-4 py-2 rounded"
        ></textarea>

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Sections</h3>
          {sections.map((section, index) => (
            <div key={index} className="mb-4 rounded">
              <input
                type="text"
                placeholder="Subtitle"
                value={section.subtitle}
                onChange={(e) =>
                  handleSectionChange(index, "subtitle", e.target.value)
                }
                required
                className="w-full mb-2 border border-gray-300 px-3 py-1 rounded"
              />
              <textarea
                placeholder="Content"
                value={section.content}
                onChange={(e) =>
                  handleSectionChange(index, "content", e.target.value)
                }
                required
                rows="3"
                className="w-full border border-gray-300 px-3 py-1 rounded"
              ></textarea>
              {sections.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSection(index)}
                  className="mt-2 text-sm text-red-500 hover:underline"
                >
                  Remove section
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addSection}
            className="mt-2 text-sm text-blue-600 hover:underline"
          >
            + Add more sections
          </button>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-6 border-b border-black inline-block">
            SUMMARY
          </h2>
          <p className="text-sm mb-2"><strong>Sections:</strong> {sections.length}</p>
          <p className="text-sm mb-2"><strong>Title:</strong> {form.serviceName || "-"}</p>
          <p className="text-sm text-gray-500">
            Complete the service details and submit.
          </p>
        </div>

        <button
          type="submit"
          className="bg-black text-white py-2 mt-6 rounded hover:bg-gray-800 transition"
        >
          ADD SERVICE
        </button>
      </div>
    </form>
  );
};

export default AddService;
