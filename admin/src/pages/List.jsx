import React, { useEffect, useState } from "react";
import { Await, useNavigate } from "react-router-dom";

const List = ({ token }) => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");

  // 🔹 Fungsi untuk menghandle navigasi berdasarkan pilihan user
  const handleNavigation = () => {
    if (selectedOption === "stockList") {
      navigate("/list-stock-list");
    } else if (selectedOption === "wysiwyg") {
      navigate("/list-wysiwyg");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Choose List Type</h2>

      {/* 🔹 Dropdown Pilihan */}
      <select
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
        className="w-64 px-4 py-2 border rounded-md focus:ring focus:ring-blue-400 mb-4"
      >
        <option value="">Select Type</option>
        <option value="stockList">List Stock List</option>
        <option value="wysiwyg">List Wysiwyg</option>
      </select>

      {/* 🔹 Button Submit */}
      <button
        onClick={handleNavigation}
        disabled={!selectedOption}
        className={`w-64 py-2 text-white font-semibold rounded-md transition ${selectedOption ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
          }`}
      >
        Proceed
      </button>
    </div>
  );
};

export default List;
