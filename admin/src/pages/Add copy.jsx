import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App.jsx";
import { toast } from "react-toastify";
import { assets } from "../assets/assets.js";

const Add = () => {
  const [images, setImages] = useState(Array(4).fill(null));
  const [previews, setPreviews] = useState(Array(4).fill(assets.upload_area));
  const [formVisible, setFormVisible] = useState(false);
  const [isFirstImageUploaded, setIsFirstImageUploaded] = useState(false); // ✅ Cek apakah gambar pertama kali diunggah
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Culture", // ✅ Default Value
    subCategory: "WYSIWYG Hard Coral", // ✅ Default Value
    price: "",
    sizes: "S", // ✅ Default Value
    bestSeller: false,
  });

  const categories = ["Culture", "Wild"];
  const subCategories = [
    "WYSIWYG Hard Coral",
    "WYSIWYG Soft Coral",
    "WYSIWYG Anemone",
    "General Hard Coral",
    "General Soft Coral",
    "Fish",
  ];
  const sizes = ["S", "M", "L", "XL"];

  // ✅ Handle saat user memilih gambar
  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);

    const newPreviews = [...previews];
    newPreviews[index] = URL.createObjectURL(file);
    setPreviews(newPreviews);

    setFormVisible(true); // Form muncul setelah gambar dipilih
  };

  // ✅ Log setelah gambar pertama kali diunggah
  useEffect(() => {
    if (!isFirstImageUploaded && images.some((img) => img !== null)) {
      console.log("📸 Image uploaded!");
      console.log("✅ Selected Category:", formData.category);
      console.log("✅ Selected SubCategory:", formData.subCategory);
      console.log("✅ Selected Size:", formData.sizes);
      setIsFirstImageUploaded(true); // ✅ Supaya log hanya muncul sekali
    }
  }, [images]);

  // Handle perubahan input form
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // ✅ Console.log untuk pilihan dropdown yang dipilih admin
    if (name === "category") console.log("✔️ Selected Category:", value);
    if (name === "subCategory") console.log("✔️ Selected SubCategory:", value);
    if (name === "sizes") console.log("✔️ Selected Size:", value);
  };

  // ✅ Submit Form (Mengirim Gambar & Data Produk ke Backend)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in as an admin!");
      return;
    }


    try {
      const productData = new FormData();

      images.forEach((image, index) => {
        if (image) {
          productData.append(`image${index + 1}`, image);
        }
      });

      productData.append("name", formData.name);
      productData.append("description", formData.description);
      productData.append("category", formData.category);
      productData.append("subCategory", formData.subCategory);
      productData.append("price", formData.price);
      productData.append("sizes", JSON.stringify(formData.sizes));
      productData.append("bestSeller", formData.bestSeller);


      const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } })

      console.log(response.data);

      if (response.data.success) {
        toast.success("Product added successfully!");
        setFormData({
          name: "",
          description: "",
          category: "",
          subCategory: "",
          price: "",
          sizes: "",
          bestSeller: false,
        });
        setPreviews(Array(4).fill(assets.upload_area));
        setFormVisible(false);
        setImages([]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      const errorMsg =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Error adding product!";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Add New Product</h2>

      {/* ✅ Slot Upload Gambar Langsung Ganti */}
      <div className="mb-6 grid grid-cols-4 gap-4 place-items-center border-gray-400 border-2 p-8 border-dashed rounded-2xl">
        {previews.map((preview, index) => (
          <div key={index} className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, index)}
              className="hidden"
              id={`imageUpload-${index}`}
            />
            <label htmlFor={`imageUpload-${index}`} className="cursor-pointer">
              <img src={preview} alt="Upload" className="w-32 h-32 object-cover rounded-md" />
            </label>
          </div>
        ))}
      </div>

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
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Subcategory</label>
              <select
                name="subCategory"
                value={formData.subCategory}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                required
              >
                <option value="">Select Subcategory</option>
                {subCategories.map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
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
              <select
                name="sizes"
                value={formData.sizes}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                required
              >
                <option value="">Select Sizes</option>
                {sizes.map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
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
};

export default Add;
