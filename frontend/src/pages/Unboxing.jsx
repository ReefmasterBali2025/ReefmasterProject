import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import Scan from "./Scan"; // Import komponen Scan

const Unboxing = () => {
  const { products, currency } = useContext(ShopContext);
  const [isScanOpen, setIsScanOpen] = useState(false); // State modal scan

  return (
    <div className="border-t py-20 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <div className="text-2xl">
        <Title text2={"UNBOXING"} />
      </div>

      <div>
        {products.slice(1, 4).map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items-start gap-6 text-sm">
              <img className="w-16 sm:w-20" src={item.image[0]} alt="" />
              <div>
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex items-start gap-3 mt-2 text-base text-gray-700">
                  <p className="text-lg">{currency}{item.price}</p>
                  <p>Quantity: 1</p>
                  <p>Size: M</p>
                </div>
                <p className="mt-4">
                  Date: <span className="text-gray-400">03 Jan 2025</span>
                </p>
              </div>
            </div>

            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base">Arrived</p>
              </div>
              {/* Tombol SCAN memunculkan modal */}
              <button
                onClick={() => setIsScanOpen(true)}
                className="text-blue-600 border border-blue-600 px-4 py-2 text-sm font-medium rounded-sm"
              >
                SCAN
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Scan */}
      {isScanOpen && <Scan closeModal={() => setIsScanOpen(false)} />}
    </div>
  );
};

export default Unboxing;
