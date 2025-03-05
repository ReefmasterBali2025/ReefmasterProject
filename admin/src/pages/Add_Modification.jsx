import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App.jsx";
import { toast } from "react-toastify";
import { assets } from "../assets/assets.js";

const Add = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    subCategory: "",
    price: "",
    sizes: "",
    bestSeller: false
  });

  // Handle saat user memilih gambar
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setFormVisible(true); // Form langsung muncul setelah gambar dipilih
    }
  };

  // Handle perubahan input form
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Submit Form (Gambar + Data Produk)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please select an image first!");
      return;
    }

    const productData = new FormData();
    productData.append("image", image);
    productData.append("name", formData.name);
    productData.append("description", formData.description);
    productData.append("category", formData.category);
    productData.append("subCategory", formData.subCategory);
    productData.append("price", formData.price);
    productData.append("sizes", formData.sizes);
    productData.append("bestSeller", formData.bestSeller);

    try {
      const response = await axios.post(`${backendUrl}/api/products/add`, productData);
      if (response.data.success) {
        toast.success("Product added successfully!");
        setFormData({ name: "", description: "", category: "", subCategory: "", price: "", sizes: "", bestSeller: false });
        setPreview(null);
        setFormVisible(false);
        setImage(null);
      } else {
        toast.error("Failed to add product!");
      }
    } catch (error) {
      toast.error("Error adding product!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Add New Product</h2>

      {/* Upload Image Section */}
      <div className="mb-6 border-2 border-dashed border-gray-300 p-6 rounded-lg text-center">
        {preview ? (
          <div className="relative">
            <img src={preview} alt="Preview" className="w-40 h-40 mx-auto rounded-md shadow-md object-cover" />
            <button onClick={() => { setPreview(null); setImage(null); setFormVisible(false); }} className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full px-2 py-1 text-xs">✖</button>
          </div>
        ) : (
          <>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="imageUpload" />
            <label htmlFor="imageUpload" className="cursor-pointer text-blue-500 hover:underline">
              <img src={assets.upload_area} className="w-10 mx-auto" />
            </label>
          </>
        )}
      </div>

      {/* Form Detail Produk (Muncul setelah gambar dipilih) */}
      {formVisible && (
        <form onSubmit={handleSubmit} className="space-y-6 mt-6 transition-all duration-300">
          {/* Product Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all resize-none"
              required
            />
          </div>

          {/* Category & Subcategory */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g. Culture"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Subcategory</label>
              <input
                type="text"
                name="subCategory"
                value={formData.subCategory}
                onChange={handleChange}
                placeholder="e.g. Hard Coral"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* Price & Sizes */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter product price"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Sizes</label>
              <input
                type="text"
                name="sizes"
                value={formData.sizes}
                onChange={handleChange}
                placeholder="e.g. S, M, L"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full py-3 bg-green-600 text-white rounded-md font-semibold text-lg transition-all hover:bg-green-700 shadow-lg">
            Add Product
          </button>
        </form>
      )}
    </div>
  );
}

export default Add