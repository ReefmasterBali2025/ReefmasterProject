import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App.jsx";
import { toast } from "react-toastify";
import { Await } from "react-router-dom";

const ListStockList = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState([]); // ✅ Produk yang dipilih untuk dihapus
  const [editingProduct, setEditingProduct] = useState(null);
  const [newImages, setNewImages] = useState(Array(4).fill(null));
  const [isUpdating, setIsUpdating] = useState(false); // ✅ State untuk animasi loading
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // ✅ State untuk popup sukses
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [deleteType, setDeleteType] = useState(""); // "single" | "multiple" | "all"
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [importing, setImporting] = useState(false); // ✅ State untuk loading import
  const [totalProducts, setTotalProducts] = useState(0); // ✅ State baru untuk total produk
  const [groupedProducts, setGroupedProducts] = useState({});
  const [isDeleting, setIsDeleting] = useState(false); // 🔥 Animasi loading saat menghapus




  // 🔹 Fetch produk dari MongoDB
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        const productList = response.data.products;
        setProducts(response.data.products);
        setTotalProducts(response.data.products.length); // ✅ Simpan total produk
        // ✅ Grouping berdasarkan `latin_name`
        const grouped = productList.reduce((acc, product) => {
          if (!acc[product.latinName]) {
            acc[product.latinName] = [];
          }
          acc[product.latinName].push(product);
          return acc;
        }, {});

        setGroupedProducts(grouped);
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



  // 🔹 Handle Upload Gambar Baru
  const handleImageUpload = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const updatedImages = [...newImages];
    updatedImages[index] = file;
    setNewImages(updatedImages);

    // 🔥 Upload ke ImgBB
    const formData = new FormData();
    formData.append("image", file);
    formData.append("key", "e8d64594db1210de2a1f2ebdf0843870"); // API Key ImgBB

    try {
      const response = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("✅ ImgBB Response:", data);

      if (data.success) {
        const imageUrl = data.data.url;

        // ✅ Perbarui `link_image` langsung ke `editingProduct`
        setEditingProduct((prev) => ({
          ...prev,
          link_image: imageUrl,
        }));

        console.log("📸 Gambar berhasil diunggah dan diperbarui:", imageUrl);
      }
    } catch (error) {
      console.error("❌ Error uploading to ImgBB:", error);
    }
  };




  // 🔥 Tampilkan Konfirmasi Delete Pop-Up
  const confirmDelete = (type, targetId) => {
    setDeleteType(type);
    setDeleteTarget(targetId); // ✅ Simpan ID produk yang akan dihapus
    setShowConfirmPopup(true);
  };


  // ✅ Eksekusi Delete Produk
  const executeDelete = async () => {
    setShowConfirmPopup(false);
    setIsDeleting(true); // 🔥 Tampilkan animasi loading

    try {
      if (deleteType === "single" && deleteTarget) {
        // 🔥 Hapus satu produk
        const response = await axios.post(`${backendUrl}/api/product/remove`, { id: deleteTarget }, { headers: { token } });

        if (response.data.success) {
          toast.success("Product deleted successfully!");

          // ✅ Hapus produk langsung dari state `products`
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product._id !== deleteTarget)
          );
          // 🔥 Tunggu 1 detik untuk efek loading sebelum menghapus dari UI
          setTimeout(() => {

            setDeleteTarget(null);
            setIsDeleting(false); // 🔥 Sembunyikan loading setelah selesai
          }, 800);
          fetchProducts();

          // setDeleteTarget(null); // Reset target setelah dihapus
        } else {
          toast.error("Failed to delete product");
          setIsDeleting(false); // 🔥 Sembunyikan loading jika gagal
        }
      } else if (deleteType === "multiple") {
        // 🔥 Hapus beberapa produk sekaligus
        if (selectedProducts.length === 0) {
          toast.warn("No products selected!");
          return;
        }

        const response = await axios.post(`${backendUrl}/api/product/remove-multiple`, { ids: selectedProducts }, { headers: { token } });

        if (response.data.success) {
          toast.success("Selected products deleted successfully!");

          // ✅ Hapus produk langsung dari state `products`
          setProducts((prevProducts) =>
            prevProducts.filter((product) => !selectedProducts.includes(product._id))
          );

          setSelectedProducts([]); // Reset produk yang dipilih
        } else {
          toast.error("Failed to delete selected products");
        }
      } else if (deleteType === "all") {
        // 🔥 Hapus semua produk
        const response = await axios.post(`${backendUrl}/api/product/remove-all`, {}, { headers: { token } });

        if (response.data.success) {
          toast.success("All products deleted successfully!");

          // ✅ Kosongkan state `products`
          setProducts([]);
        } else {
          toast.error("Failed to delete all products");
        }
      }
    } catch (error) {
      console.error("❌ Error deleting product(s):", error);
      toast.error("Error deleting product(s)");
    }
  };

  // 🔹 Handle Checkbox untuk memilih produk
  const handleSelectProduct = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((prodId) => prodId !== id) : [...prev, id]
    );
  };

  // 🔹 Update produk di database
  // ✅ Fungsi untuk mengupdate produk
  const updateProduct = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const updatedData = {
        _id: editingProduct._id,
        page_header: editingProduct.page_header,
        appsheet_code: editingProduct.appsheet_code,
        cites: editingProduct.cites,
        alias_cites_1: editingProduct.alias_cites_1,
        code: editingProduct.code,
        latin_name: editingProduct.latin_name,
        common_name: editingProduct.common_name,
        size: editingProduct.size,
        stock: editingProduct.stock,
        actual_stock: editingProduct.actual_stock,
        available_stock: editingProduct.available_stock,
        value: editingProduct.value,
        plastic_size: editingProduct.plastic_size,
        height_cm: editingProduct.height_cm,
        price: editingProduct.price,
        system: editingProduct.system,
        link_image: editingProduct.link_image
      };

      console.log("📤 Mengirim update ke backend:", updatedData);

      const response = await axios.post(`${backendUrl}/api/product/update`, updatedData, {
        headers: { token, "Content-Type": "application/json" },
      });

      if (response.data.success) {
        toast.success("Product updated successfully!");
        fetchProducts();
        setEditingProduct(null);
      } else {
        toast.error("Failed to update product");
      }
    } catch (error) {
      console.error("❌ Error updating product:", error);
      toast.error("Error updating product");
    } finally {
      setIsUpdating(false);
    }
  };

  // ✅ Fungsi untuk mengimpor data dari Google Sheet
  const importData = async () => {
    setImporting(true);
    try {
      const response = await axios.get(`${backendUrl}/api/importOfferStockList`);
      if (response.data.success) {
        toast.success("Data imported successfully!");
        fetchProducts(); // 🔄 Refresh data setelah import sukses
      } else {
        toast.error("Failed to import data");
      }
    } catch (error) {
      console.error("❌ Error importing data:", error);
      toast.error("Error importing data");
    } finally {
      setImporting(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);



  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Product List</h2>

      {/* 🔥 Tombol Delete Selected & Delete All */}
      <div className="flex gap-3 mb-4 items-center">
        <button
          onClick={() => confirmDelete("multiple")}
          className={`py-2 px-4 bg-red-500 text-white rounded-md font-semibold ${selectedProducts.length === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"}`}
          disabled={selectedProducts.length === 0}
        >
          Delete Selected
        </button>
        <button
          onClick={() => confirmDelete("all")}
          className="py-2 px-4 bg-red-700 text-white rounded-md font-semibold hover:bg-red-800"
        >
          Delete All
        </button>
        <button
          onClick={importData}
          className="py-2 px-4 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700"
          disabled={importing} // Disable saat sedang mengimpor
        >
          Import from Google Sheets
        </button>

      </div>

      <div className="flex gap-3 mb-4 items-center">
        <p>Total produk : {totalProducts}</p>
      </div>

      {/* 🔄 Loading Indicator */}
      {loading && <p className="text-center text-gray-600">Loading products...</p>}

      {/* ❌ Jika Tidak Ada Produk */}
      {!loading && products.length === 0 && (
        <p className="text-center text-gray-600">No products found.</p>
      )}

      {/* 🔥 Tampilkan Produk dalam Grup berdasarkan `latin_name` */}
      <div className="space-y-6">
        {Object.entries(groupedProducts)
          .sort((a, b) => a.toString().localeCompare(b.toString())) // ✅ Urutkan grup berdasarkan abjad
          .map(([latinName, products]) => (
            <div key={latinName} className="bg-white shadow-md rounded-lg p-4">
              {/* 🔹 Header Grup */}
              <h3 className="text-xl font-bold text-gray-700 border-b pb-2 mb-3">
                {latinName} ({products.length} items)
              </h3>
              {/* 🔥 Grid Produk */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product._id} className="bg-white shadow-md rounded-lg overflow-hidden p-4 relative">

                    {/* Checkbox untuk memilih produk */}
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product._id)}
                      onChange={() => handleSelectProduct(product._id)}
                      className="absolute top-3 left-3 w-5 h-5"
                    />

                    {/* Gambar Produk */}
                    <div className="h-48 w-full flex items-center justify-center overflow-hidden rounded-md">
                      {product.link_image ? (
                        <img
                          src={product.link_image}
                          alt="NOT"
                          className=" w-full h-full object-cover"
                        />
                      ) : (
                        <p className="text-gray-500">No Image</p>
                      )}
                      {/* <img src="https://drive.google.com/thumbnail?id=1yYJuOtb-2_WZDfwvM73qes-ewSOmtXNS" /> */}
                    </div>


                    {/* 🔹 Detail Produk */}
                    <div className="mt-3">
                      <h3 className="text-lg font-semibold text-gray-700">{product.commonName}-{product.code}</h3>
                      <p className="text-gray-500 text-sm">{product.latinName} - {product.cites}</p>
                      <p className="text-gray-800 font-bold mt-1">${product.price}</p>
                      <p className="text-gray-500 text-sm">Stock: {product.available_stock}</p>
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
                        onClick={() => confirmDelete("single", product._id)}
                        className="flex-1 py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
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
              {/* Nama Umum */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Common Name</label>
                <input
                  type="text"
                  value={editingProduct.common_name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, common_name: e.target.value })}
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

              {/* Stock */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Stock</label>
                <input
                  type="number"
                  value={editingProduct.stock}
                  onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>

              {/* Upload Gambar Baru */}
              <div className="grid grid-cols-4 gap-2">
                {editingProduct.link_image ? (
                  <label className="relative w-full aspect-square overflow-hidden cursor-pointer rounded-md">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 0)}
                      className="hidden"
                    />
                    <img
                      src={newImages[0] ? URL.createObjectURL(newImages[0]) : editingProduct.link_image}
                      alt="Product"
                      className="w-full h-full object-cover rounded-md"
                    />
                  </label>
                ) : (
                  <p className="text-gray-500">No Image Available</p>
                )}
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

      {/* 🔥 Konfirmasi Delete Pop-Up */}
      {showConfirmPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <p className="popup-text mb-">Apakah kamu yakin ingin menghapusnya?</p>
            <div className="popup-buttons grid grid-cols-2 gap-2">
              <button className="popup-btn ok" onClick={executeDelete}>OK</button>
              <button className="popup-btn cancel" onClick={() => setShowConfirmPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* 🔥 Overlay Loading Import */}
      {importing && (
        <div className="import-overlay">
          <div className="import-loading">
            Importing...
            <div className="bubble-container">
              <span className="bubble"></span>
              <span className="bubble"></span>
              <span className="bubble"></span>
            </div>
          </div>
        </div>
      )}

      {/* 🔥 Loading Overlay untuk Delete */}
      {isDeleting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
            <p className="mt-3 text-white font-semibold">Deleting...</p>
          </div>
        </div>
      )}


    </div>
  );
};

export default ListStockList;
