import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App.jsx";
import { toast } from "react-toastify";
import { assets } from "../assets/assets.js";
import { data } from "react-router-dom";
import Select from 'react-select'

const AddStockList = ({ token }) => {
  const [images, setImages] = useState(Array(4).fill(null));
  const [linkImages, setLinkImages] = useState([]); // 🔥 Simpan URL gambar di sini
  const [pageHeader, setPageHeader] = useState("");
  const [appsheetCode, setAppsheetCode] = useState("");
  const [cites, setCites] = useState("");
  const [aliasCites1, setAliasCites1] = useState("");
  const [code, setCode] = useState("");
  const [latinName, setLatinName] = useState("");
  const [commonName, setCommonName] = useState("");
  const [size, setSize] = useState("");
  const [stock, setStock] = useState("");
  const [actualStock, setActualStock] = useState("");
  const [availableStock, setAvailableStock] = useState("");
  const [value, setValue] = useState("");
  const [plasticSize, setPlasticSize] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [price, setPrice] = useState("");
  const [system, setSystem] = useState("");
  const [imageChecker, setImageChecker] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [commonNamesList, setCommonNamesList] = useState([]); // 🔹 Data untuk dropdown

  // ✅ Fetch data common_name dari Google Sheets API saat halaman dimuat
  useEffect(() => {
    const fetchCommonNames = async () => {
      try {
        console.log("📡 Fetching common names...");
        const response = await axios.get(`${backendUrl}/api/common-names`);

        if (response.data.success) {
          setCommonNamesList(response.data.data);
        } else {
          toast.error("Failed to fetch common names!");
        }
      } catch (error) {
        console.error("Error fetching common names:", error);
        toast.error("Error fetching common names!");
      }
    };

    fetchCommonNames();
  }, []);




  // ✅ Handle Upload Gambar
  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  // ✅ Handle Submit Form
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const imageUrls = [];

      // 🔹 Upload Gambar ke ImgBB Dulu
      for (const image of images) {
        if (image) {
          const formData = new FormData();
          formData.append("image", image);
          formData.append("key", "e8d64594db1210de2a1f2ebdf0843870"); // 🔥 API Key ImgBB HARUS ADA

          const response = await fetch("https://api.imgbb.com/1/upload", {
            method: "POST",
            body: formData,
          });

          const data = await response.json(); // ✅ HARUS `response.json()`
          console.log("✅ ImgBB Response:", data);

          if (data.success) {
            imageUrls.push(data.data.url);
          }
        }
      }

      console.log("✅ Semua gambar diunggah ke ImgBB:", imageUrls);

      // 🔹 Kirim Data ke Backend
      const productData = {
        page_header: pageHeader,
        appsheet_code: appsheetCode,
        cites: cites,
        alias_cites_1: aliasCites1,
        code: code,
        latin_name: latinName,
        common_name: commonName,
        size: JSON.stringify(size),
        stock: stock,
        actual_stock: actualStock,
        available_stock: availableStock,
        value: value,
        plastic_size: plasticSize,
        height_cm: heightCm,
        price: price,
        system: system,
        link_image: imageUrls[0] || "", // 🔥 Simpan hanya gambar pertama di kolom `image`
      };

      console.log("📤 Mengirim data ke backend...", productData);

      const response = await axios.post(backendUrl + "/api/product/add", productData, {
        headers: {
          Authorization: `Bearer ${token}`, // 🔥 Pastikan format token benar
          "Content-Type": "application/json",
        },
      });

      console.log("✅ Response dari server:", response.data);
      toast.success("Product added successfully!");

      setSuccess(true);

      // 🔹 **Set Timeout untuk menghilangkan status success setelah 3 detik**
      setTimeout(() => {
        setSuccess(false);
      }, 3000);

    } catch (error) {
      console.error("❌ Error:", error);
      toast.error("Failed to add product!");
    } finally {
      // ✅ **Pastikan loading berhenti di semua kasus**
      setLoading(false);
    }
  };

  // 🔥 Konversi data ke format react-select
  const options = commonNamesList.map((name) => ({ value: name, label: name }));

  return (

    <>
      {/* ✅ Overlay saat loading */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <p className="text-white font-semibold">Processing...</p>
        </div>
      )}

      {/* ✅ Overlay saat sukses */}
      {success && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <span className="text-green-500 text-5xl">✅</span>
            <p className="mt-2 text-lg font-semibold">Product Added Successfully!</p>
          </div>
        </div>
      )}

      <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-6 bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-700">Add New Product</h2>

        {/* ✅ Upload Images (4 Slot) */}
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <label key={index} className="relative w-full aspect-square overflow-hidden cursor-pointer rounded-md">
              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, index)} className="hidden" />
              <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="Upload" className="w-full h-full object-cover rounded-md" />
            </label>
          ))}
        </div>

        {/* ✅ Dropdown untuk AppSheet Code */}
        <div className="w-full">
          <label className="block font-semibold text-gray-700 mb-1">AppSheet Code</label>
          <select
            value={appsheetCode}
            onChange={(e) => setAppsheetCode(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-400"
          >
            <option value="">Select AppSheet Code</option>
            {["GHCC", "GHCW", "GANE", "GSCC", "GSCW"].map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </div>

        {/* ✅ Dropdown untuk Common Name */}
        <div className="w-full">
          <label className="block font-semibold text-gray-700 mb-1">Common Name</label>
          <Select
            options={options}
            value={options.find((option) => option.value === commonName)}
            onChange={(selectedOption) => setCommonName(selectedOption.value)}
            className="w-full"
            styles={{
              menu: (provided) => ({
                ...provided,
                zIndex: 50, // 🔥 Supaya tidak tertutup elemen lain
              }),
            }}
            placeholder="Select Common Name"
          />
        </div>

        {/* ✅ Dropdown untuk Sizes */}
        <div className="w-full">
          <label className="block font-semibold text-gray-700 mb-1">Sizes</label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-400"
          >
            <option value="">Select Size</option>
            {["S", "M", "L", "XL", "All Size", "N", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"].map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </div>

        {/* ✅ Dropdown untuk Plastic Sizes */}
        <div className="w-full">
          <label className="block font-semibold text-gray-700 mb-1">Plastic Sizes</label>
          <select
            value={plasticSize}
            onChange={(e) => setPlasticSize(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-400"
          >
            <option value="">Select Plastic Sizes</option>
            {[10, 13, 15, 17, 20, 22, 25, 30, 35].map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </div>

        {/* ✅ Input Fields */}
        {[
          // { label: "Page Header", value: pageHeader, setter: setPageHeader },
          // { label: "CITES", value: cites, setter: setCites },
          // { label: "Alias CITES 1", value: aliasCites1, setter: setAliasCites1 },
          // { label: "Code", value: code, setter: setCode },
          // { label: "Latin Name", value: latinName, setter: setLatinName },
          // { label: "Stock", value: stock, setter: setStock },
          // { label: "Actual Stock", value: actualStock, setter: setActualStock },
          // { label: "Available Stock", value: availableStock, setter: setAvailableStock },
          // { label: "Value", value: value, setter: setValue },
          // { label: "Plastic Size", value: plasticSize, setter: setPlasticSize },
          { label: "Height (cm)", value: heightCm, setter: setHeightCm },
          // { label: "Price", value: price, setter: setPrice },
          // { label: "System", value: system, setter: setSystem },
          // { label: "Image Checker", value: imageChecker, setter: setImageChecker },
        ].map(({ label, value, setter }) => (
          <div className="w-full" key={label}>
            <label className="block font-semibold text-gray-700 mb-1">{label}</label>
            <input
              type="text"
              value={value}
              onChange={(e) => setter(e.target.value)}
              placeholder={`Enter ${label}`}
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-400"

            />
          </div>
        ))}





        {/* ✅ Submit Button */}
        <button type="submit" className="w-full py-3 font-semibold rounded-md bg-green-600 hover:bg-green-700 text-white">
          {loading ? "Processing..." : "ADD PRODUCT"}
        </button>
      </form>
    </>
  );
};

export default AddStockList;
