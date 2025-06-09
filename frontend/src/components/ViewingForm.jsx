import React from "react";

const ViewingForm = () => {
  return (
    <div className="bg-[#f5f6f8] p-8 max-w-[500px] mx-auto rounded my-4">
      <h2 className="text-2xl font-bold text-[#0b1f4d] mb-6 font-playfair">
        ARRANGE A VIEWING
      </h2>

      <form className="space-y-2">
        <div>
          <label className="block text-[#0b1f4d] font-medium mb-1">Your Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#0b1f4d]"
          />
        </div>

        <div>
          <label className="block text-[#0b1f4d] font-medium mb-1">Email Address</label>
          <input
            type="email"
            className="w-full border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#0b1f4d]"
          />
        </div>

        <div>
          <label className="block text-[#0b1f4d] font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            className="w-full border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#0b1f4d]"
          />
        </div>

        <div>
          <label className="block text-[#0b1f4d] font-medium mb-1">When is best to call?</label>
          <input
            type="text"
            className="w-full border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#0b1f4d]"
          />
        </div>

        <div>
          <label className="block text-[#0b1f4d] font-medium mb-1">
            Please prove you are human; what is 2+1?
          </label>
          <input
            type="text"
            className="w-24 border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#0b1f4d]"
          />
        </div>

        <button
          type="submit"
          className="bg-[#1d771d] text-white font-bold py-2 px-8 mt-4 hover:bg-[#249224] transition"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ViewingForm;
