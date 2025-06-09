import React from "react";

const PropertyTable = ({ property }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="w-[90%] max-w-3xl mx-auto mt-6">
      <h2 className="text-2xl font-bold text-[#0b1f4d] mb-4 text-left font-playfair">
        Property Info
      </h2>
      <table className="w-full border-collapse shadow">
        <tbody>
          <tr>
            <td className="bg-[#0b1f4d] text-white font-semibold px-4 py-3 w-1/3 border-b border-white">
              Available from:
            </td>
            <td className="bg-[#f2f3f5] text-[#4a4a4a] px-4 py-3 border-b border-white">
              {formatDate(property.availableFrom)}
            </td>
          </tr>
          <tr>
            <td className="bg-[#0b1f4d] text-white font-semibold px-4 py-3 border-b border-white">
              Rent Breakdown:
            </td>
            <td className="bg-[#f2f3f5] text-[#4a4a4a] px-4 py-3 border-b border-white">
              £{property.price}.00 pppw
            </td>
          </tr>
          <tr>
            <td className="bg-[#0b1f4d] text-white font-semibold px-4 py-3 border-b border-white">
              Tenant type:
            </td>
            <td className="bg-[#f2f3f5] text-[#4a4a4a] px-4 py-3 border-b border-white">
              {property.tenantType}
            </td>
          </tr>
          <tr>
            <td className="bg-[#0b1f4d] text-white font-semibold px-4 py-3 border-b border-white">
              Deposit:
            </td>
            <td className="bg-[#f2f3f5] text-[#4a4a4a] px-4 py-3 border-b border-white">
              {property.deposit.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td className="bg-[#0b1f4d] text-white font-semibold px-4 py-3 border-b border-white">
              Current Status:
            </td>
            <td className="bg-[#f2f3f5] text-[#4a4a4a] px-4 py-3 border-b border-white">
              {property.currentStatus}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PropertyTable;
