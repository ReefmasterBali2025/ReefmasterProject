import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Scan = ({ closeModal }) => {
  const [qrNumber, setQrNumber] = useState("");
  const [file, setFile] = useState(null);
  const [isDOA, setIsDOA] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ qrNumber, file, isDOA });
    alert("Data berhasil dikirim!");
    closeModal(); // Tutup modal
    navigate("/Unboxing"); // Kembali ke halaman Unboxing
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Scan Barcode / Input QR Code
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input QR Code */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Input QR Code
            </label>
            <input
              type="text"
              value={qrNumber}
              onChange={(e) => setQrNumber(e.target.value)}
              placeholder="Type QR Number"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Upload QR File */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Scan Barcode
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full border p-2 rounded-md"
            />
            <p className="text-sm text-red-600 text-[12px]">
              Note: If you can't scan the barcode, please type the QR Number
            </p>
          </div>

          {/* Checkbox Dead on Arrival */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isDOA}
              onChange={() => setIsDOA(!isDOA)}
              className="h-4 w-4 text-red-600 border-gray-300 rounded"
            />
            <label className="text-sm text-gray-700">Dead on Arrival</label>
          </div>

          {/* Tombol Submit & Close */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Scan;
