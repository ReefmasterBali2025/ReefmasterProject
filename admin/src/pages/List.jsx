import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App.jsx";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newImages, setNewImages] = useState(Array(4).fill(null));
  const [isUpdating, setIsUpdating] = useState(false); // ✅ State untuk animasi loading
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // ✅ State untuk popup sukses
  const [selectedProducts, setSelectedProducts] = useState([]); // ✅ Produk yang dipilih untuk dihapus


  // 🔹 Fetch produk dari MongoDB
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Hapus produk dari database
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await axios.post(`${backendUrl}/api/product/remove`, { id }, { headers: { token } });
      if (response.data.success) {
        toast.success("Product deleted successfully!");
        setProducts(products.filter((product) => product._id !== id));
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Error deleting product");
    }
  };

  // 🔹 Handle Upload Gambar Baru
  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const updatedImages = [...newImages];
    updatedImages[index] = file;
    setNewImages(updatedImages);
  };
  // 🔹 Hapus produk yang dipilih
  const deleteSelectedProducts = async () => {
    if (selectedProducts.length === 0) {
      toast.warn("No products selected!");
      return;
    }
    if (!window.confirm(`Are you sure you want to delete ${selectedProducts.length} products?`)) return;

    try {
      const response = await axios.post(`${backendUrl}/api/product/remove-multiple`, { ids: selectedProducts }, { headers: { token } });
      if (response.data.success) {
        toast.success("Selected products deleted successfully!");
        setProducts(products.filter((product) => !selectedProducts.includes(product._id)));
        setSelectedProducts([]); // Reset pilihan
      } else {
        toast.error("Failed to delete selected products");
      }
    } catch (error) {
      console.error("Error deleting products:", error);
      toast.error("Error deleting selected products");
    }
  };

  // 🔹 Hapus semua produk
  const deleteAllProducts = async () => {
    if (!window.confirm("Are you sure you want to delete ALL products? This action cannot be undone!")) return;

    try {
      const response = await axios.post(`${backendUrl}/api/product/remove-all`, {}, { headers: { token } });
      if (response.data.success) {
        toast.success("All products deleted successfully!");
        setProducts([]);
      } else {
        toast.error("Failed to delete all products");
      }
    } catch (error) {
      console.error("Error deleting all products:", error);
      toast.error("Error deleting all products");
    }
  };

  // 🔹 Handle Checkbox untuk memilih produk
  const handleSelectProduct = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((prodId) => prodId !== id) : [...prev, id]
    );
  };

  // 🔹 Update produk di database
  const updateProduct = async (e) => {
    e.preventDefault();
    setIsUpdating(true); // ✅ Aktifkan animasi loading

    try {
      const formData = new FormData();
      formData.append("id", editingProduct._id);
      formData.append("name", editingProduct.name);
      formData.append("price", editingProduct.price);
      formData.append("category", editingProduct.category);
      formData.append("bestseller", editingProduct.bestseller);

      // Upload gambar baru jika ada perubahan
      newImages.forEach((image, index) => {
        if (image) {
          formData.append(`image${index + 1}`, image);
        }
      });

      const response = await axios.post(`${backendUrl}/api/product/update`, formData, { headers: { token } });

      if (response.data.success) {
        toast.success("Product updated successfully!");
        setEditingProduct(null);
        setNewImages(Array(4).fill(null));
        setShowSuccessPopup(true); // ✅ Tampilkan popup sukses
        setTimeout(() => setShowSuccessPopup(false), 2000); // ✅ Hilangkan setelah 2 detik
        fetchProducts(); // Refresh daftar produk setelah update
      } else {
        toast.error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Error updating product");
    } finally {
      setIsUpdating(false); // ✅ Matikan animasi loading setelah selesai
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Product List</h2>


      {/* 🔥 Tombol Delete Selected & Delete All */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={deleteSelectedProducts}
          className={`py-2 px-4 bg-red-500 text-white rounded-md font-semibold ${selectedProducts.length === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"}`}
          disabled={selectedProducts.length === 0}
        >
          Delete Selected
        </button>
        <button
          onClick={deleteAllProducts}
          className="py-2 px-4 bg-red-700 text-white rounded-md font-semibold hover:bg-red-800"
        >
          Delete All
        </button>
      </div>

      {/* 🔄 Loading Indicator */}
      {loading && <p className="text-center text-gray-600">Loading products...</p>}

      {/* ❌ Jika Tidak Ada Produk */}
      {!loading && products.length === 0 && (
        <p className="text-center text-gray-600">No products found.</p>
      )}

      {/* 🔥 Grid Produk */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white shadow-md rounded-lg overflow-hidden p-4">

            {/* Checkbox untuk memilih produk */}
            <input
              type="checkbox"
              checked={selectedProducts.includes(product._id)}
              onChange={() => handleSelectProduct(product._id)}
              className="absolute top-3 left-3 w-5 h-5"
            />

            {/* Gambar Produk */}
            <div className="h-48 w-full flex items-center justify-center overflow-hidden rounded-md">
              <img src={product.image[0]} alt={product.name} className="object-cover w-full h-full" />
            </div>

            {/* Detail Produk */}
            <div className="mt-3">
              <h3 className="text-lg font-semibold text-gray-700">{product.name}</h3>
              <p className="text-gray-500 text-sm">{product.category} - {product.subCategory}</p>
              <p className="text-gray-800 font-bold mt-1">${product.price}</p>
            </div>

            {/* Tombol Aksi */}
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => setEditingProduct(product)}
                className="flex-1 py-2 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProduct(product._id)}
                className="flex-1 py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 Modal Edit */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Edit Product</h3>

            <form onSubmit={updateProduct} className="space-y-4">
              {/* Nama */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Product Name</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>

              {/* Harga */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Price</label>
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>

              {/* Kategori */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Category</label>
                <select
                  value={editingProduct.category}
                  onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="Culture">Culture</option>
                  <option value="Wild">Wild</option>
                </select>
              </div>

              {/* Upload Gambar Baru */}
              <div className="grid grid-cols-4 gap-2">
                {editingProduct.image.map((img, index) => (
                  <label key={index} className="relative w-full aspect-square overflow-hidden cursor-pointer rounded-md">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, index)}
                      className="hidden"
                    />
                    <img
                      src={newImages[index] ? URL.createObjectURL(newImages[index]) : img}
                      alt="Upload"
                      className="w-full h-full object-cover rounded-md"
                    />
                  </label>
                ))}
              </div>

              {/* Best Seller */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editingProduct.bestseller}
                  onChange={() => setEditingProduct({ ...editingProduct, bestseller: !editingProduct.bestseller })}
                  className="w-5 h-5"
                />
                <label className="text-gray-700">Best Seller</label>
              </div>

              {/* Tombol Simpan & Batal */}
              <div className="flex gap-3 mt-4">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-green-500 text-white rounded-md font-semibold hover:bg-green-600 transition"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="flex-1 py-2 bg-gray-300 text-gray-700 rounded-md font-semibold hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Loading Animation */}
      {isUpdating && (
        <div className="loading-overlay">
          <div className="loading-animation"></div>
        </div>
      )}
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="success-popup">✅ Product updated successfully!</div>
      )}
    </div>
  );
};

export default List;
