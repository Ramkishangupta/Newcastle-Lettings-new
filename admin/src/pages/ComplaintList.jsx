import { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const statusOptions = ["pending", "in progress", "resolved", "rejected"];

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);

  const fetchComplaints = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/v1/complaints`, {
        credentials: "include",
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setComplaints(data.complaints);
    } catch (err) {
      toast.error("Failed to fetch complaints");
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`${backendUrl}/api/v1/complaint/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success("Status updated!");
      fetchComplaints();
    } catch (err) {
      toast.error("Error updating status: " + err.message);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
  <div className="max-w-5xl mx-auto p-6">
    <h2 className="text-2xl font-semibold mb-6">Complaint Dashboard</h2>

    {complaints.length === 0 ? (
      <p className="text-gray-500 text-center mt-10 text-lg">
        There are no complaints.
      </p>
    ) : (
      complaints.map((c) => (
        <div
          key={c._id}
          className="bg-white shadow-sm border p-5 rounded mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          {/* LEFT SIDE: Complaint Summary */}
          <div className="flex-1">
            <p className="font-semibold mb-1">{c.title}</p>
            <p className="text-sm text-gray-600">{c.mostRelevant}</p>

            <div className="text-sm text-gray-500 mt-2">
              <p>
                <strong>Address:</strong>{" "}
                {[
                  c.buildingNameOrFlatNo,
                  c.buildingOrStreetNo,
                  c.streetName,
                  c.postcode,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </p>
              <p>
                <strong>Contact:</strong>{" "}
                {`${c.contact?.title || ""} ${c.contact?.firstName || ""} ${
                  c.contact?.lastName || ""
                }`}{" "}
                | {c.contact?.mobileNo}
              </p>
              <p>
                <strong>Identity:</strong> {c.identity}
              </p>
              <p>
                <strong>Created:</strong>{" "}
                {new Date(c.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* RIGHT SIDE: Status + Picture */}
          <div className="flex flex-col items-end gap-3">
            <p className="font-semibold">Status</p>
            <select
              value={c.status}
              onChange={(e) => updateStatus(c._id, e.target.value)}
              className="border px-3 py-1 rounded text-sm"
            >
              {statusOptions.map((s) => (
                <option key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>

            {c.picture && (
              <img
                src={c.picture}
                alt="Complaint"
                className="w-24 h-24 object-cover rounded mt-2 border"
              />
            )}
          </div>
        </div>
      ))
    )}
  </div>
);
};

export default ComplaintList;
