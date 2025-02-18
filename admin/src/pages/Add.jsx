import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App.jsx";
import { toast } from "react-toastify";
import { assets } from "../assets/assets.js";

const Add = ({ token }) => {
  const [images, setImages] = useState(Array(4).fill(null));
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Culture");
  const [subCategory, setSubCategory] = useState("WYSIWYG Hard Coral");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      images.forEach((image, index) => {
        if (image) {
          formData.append(`image${index + 1}`, image);
        }
      });

      const response = await axios.post(backendUrl + "/api/product/add", formData, {
        headers: { token },
      });

      setLoading(false);
      setSuccess(true);
      toast.success("Product added successfully!");

      // Reset form setelah sukses
      setTimeout(() => {
        setSuccess(false);
      }, 2000);

    } catch (error) {
      setLoading(false);
      toast.error("Failed to add product!");
    }
  };

  return (

    <>
      {/* ✅ Overlay saat loading */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative flex flex-col items-center">
            <div className="relative w-24 h-24">
              {/* Gelembung berjalan */}
              <div className="absolute top-0 left-0 w-6 h-6 bg-white rounded-full animate-bounce"></div>
              <div className="absolute top-0 right-0 w-6 h-6 bg-white rounded-full animate-bounce delay-150"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 bg-white rounded-full animate-bounce delay-300"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-white rounded-full animate-bounce delay-450"></div>
            </div>
            <p className="text-white font-semibold mt-4">Processing...</p>
          </div>
        </div>
      )}

      {/* ✅ Overlay saat sukses */}
      {success && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center animate-pop">
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
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, index)}
                className="hidden"
              />
              <img
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt="Upload"
                className="w-full h-full object-cover rounded-md"
              />
            </label>
          ))}
        </div>

        {/* ✅ Product Name */}
        <div className="w-full">
          <label className="block font-semibold text-gray-700 mb-1">Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-400"
            required
          />
        </div>

        {/* ✅ Product Description */}
        <div className="w-full">
          <label className="block font-semibold text-gray-700 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-400"
            required
          />
        </div>

        {/* ✅ Category & Subcategory */}
        <div className="grid grid-cols-2 gap-4 w-full">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-400"
              required
            >
              <option value="Culture">Culture</option>
              <option value="Wild">Wild</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Subcategory</label>
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-400"
              required
            >
              <option value="WYSIWYG Hard Coral">WYSIWYG Hard Coral</option>
              <option value="WYSIWYG Soft Coral">WYSIWYG Soft Coral</option>
              <option value="WYSIWYG Anemone">WYSIWYG Anemone</option>
              <option value="General Hard Coral">General Hard Coral</option>
              <option value="General Soft Coral">General Soft Coral</option>
              <option value="Fish">Fish</option>
            </select>
          </div>
        </div>

        {/* ✅ Price & Sizes */}
        <div className="grid grid-cols-2 gap-4 w-full">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Sizes</label>
            <div className="flex gap-2">
              {["S", "M", "L", "XL", "All Size"].map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() =>
                    setSizes((prev) =>
                      prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size]
                    )
                  }
                  className={`px-3 py-1 border rounded-md ${sizes.includes(size) ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ✅ Bestseller Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={bestseller}
            onChange={() => setBestseller((prev) => !prev)}
            className="w-5 h-5"
          />
          <label className="text-gray-700">Add to Best Seller</label>
        </div>

        {/* ✅ Submit Button */}

        <button
          type="submit"
          className={`w-full py-3 font-semibold rounded-md transition-all ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          disabled={loading}
        >
          {loading ? "Processing..." : "ADD PRODUCT"}
        </button>
      </form>

      {/* ✅ CSS Animation */}
      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .animate-bounce {
          animation: bounce 1s infinite ease-in-out;
        }

        .delay-150 { animation-delay: 0.15s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-450 { animation-delay: 0.45s; }

        @keyframes pop {
          0% { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .animate-pop {
          animation: pop 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Add;
