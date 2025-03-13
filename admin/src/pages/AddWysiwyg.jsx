import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App.jsx";
import { toast } from "react-toastify";
import { assets } from "../assets/assets.js";
import Select from 'react-select'

const AddWysiwyg = ({ token }) => {

  // Variable
  const [images, setImages] = useState(Array(4).fill(null));
  const [uniqueId, setUniqueId] = useState();
  const [maxUniqueId, setMaxUniqueId] = useState(null); // 🔥 Simpan uniqueId terbesar
  const [line, setLine] = useState("");
  const [aquarium, setAquarium] = useState("");
  const [number, setNumber] = useState("");
  const [pageHeader, setPageHeader] = useState("");
  const [appsheetCode, setAppsheetCode] = useState("");
  const [commonName, setCommonName] = useState("");
  const [latinName, setLatinName] = useState("");
  const [size, setSize] = useState("");
  const [plasticSize, setPlasticSize] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [plasticSizeOptions, setPlasticSizeOptions] = useState([
    { value: 10, label: 10 },
    { value: 13, label: 13 },
    { value: 15, label: 15 },
    { value: 17, label: 17 },
    { value: 20, label: 20 },
    { value: 22, label: 22 },
    { value: 25, label: 25 },
    { value: 30, label: 30 },
    { value: 35, label: 35 },
  ]);
  const [price, setPrice] = useState(""); // 🔥 Harga tetap angka di frontend
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [commonNamesList, setCommonNamesList] = useState([]);
  const [latinNameList, setLatinNamesList] = useState([]);
  const [sizeOptions, setSizeOptions] = useState([
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
    { value: "All Size", label: "All Size" },
  ]);
  const [aquariumOptions, setAquariumOptions] = useState([
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
    { value: 6, label: 6 },
    { value: 7, label: 7 },
    { value: 8, label: 8 },
    { value: 9, label: 9 },
    { value: 10, label: 10 }
  ])
  const [inputSize, setInputSize] = useState(""); // 🔥 State buat menangkap input baru
  const [inputAquarium, setInputAquarium] = useState("");
  // 🔥 Pilihan untuk Size
  const lineOptions = [
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "C", label: "C" },
    { value: "D", label: "D" },
    { value: "E", label: "E" },
    { value: "F", label: "F" },
    { value: "G", label: "G" },
    { value: "H", label: "H" },
  ];


  // All Logic Here

  // ✅ Fetch data offerwysiwygs lalu cari uniqueId terbesar
  const fetchMaxUniqueId = async () => {
    setLoading(true); // 🔄 Mulai loading
    try {
      console.log("📡 Fetching max uniqueId from backend...");

      const response = await axios.get(`${backendUrl}/api/maxUniqueId`, {
        headers: { "Cache-Control": "no-cache" },
      });

      // ✅ Pastikan response memiliki `data`
      if (!response || !response.data) {
        throw new Error("Invalid response from server");
      }

      // ✅ Pastikan response memiliki `success` dan `maxUniqueId`
      if (response.data.success && response.data.maxUniqueId !== undefined) {
        setMaxUniqueId(response.data.maxUniqueId);
        console.log("✅ Max Unique ID Terbaru:", response.data.maxUniqueId);
      } else {
        console.warn("⚠️ No Unique ID found in response.");
        setMaxUniqueId("No Unique ID found");
      }
    } catch (error) {
      console.error("❌ Error fetching max uniqueId:", error);
      toast.error("Failed to fetch max uniqueId!");
      setMaxUniqueId("Error fetching data");
    } finally {
      setLoading(false); // ✅ Selesai loading
    }
  };

  // 🔥 Panggil saat pertama kali halaman dimuat
  useEffect(() => {
    console.log("🔥 State maxUniqueId berubah:", maxUniqueId);
  }, [maxUniqueId]);


  // ✅ Fetch data `common_name` dari database
  useEffect(() => {
    const fetchCommonNames = async () => {
      try {
        console.log("📡 Fetching common names...");
        const response = await axios.get(`${backendUrl}/api/common-names-wysiwyg`);
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

  // ✅ Fetch data `latinName` dari database
  useEffect(() => {
    const fetchLatinNamesWysiwyg = async () => {
      try {
        console.log("📡 Fetching latin names...");
        const response = await axios.get(`${backendUrl}/api/latin-names-wysiwyg`);
        if (response.data.success) {
          setLatinNamesList(response.data.data);
        } else {
          toast.error("Failed to fetch latin names!");
        }
      } catch (error) {
        console.error("Error fetching common names:", error);
        toast.error("Error fetching common names!");
      }
    };
    fetchLatinNamesWysiwyg();
  }, []);

  // 🔥 Konversi data ke format react-select
  const options = commonNamesList.map((name) => ({ value: name, label: name }));
  const latinNameOptions = latinNameList.map((name) => ({ value: name, label: name }));


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

      // 🔹 Upload gambar ke ImgBB
      for (const image of images) {
        if (image) {
          const formData = new FormData();
          formData.append("image", image);
          formData.append("key", "e8d64594db1210de2a1f2ebdf0843870");

          const response = await fetch("https://api.imgbb.com/1/upload", { method: "POST", body: formData });
          const data = await response.json();
          if (data.success) {
            imageUrls.push(data.data.url);
          }
        }
      }

      // ⏳ Ambil timestamp otomatis
      const now = new Date();
      const formattedDate = now.toLocaleString("id-ID", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      // ✅ Konversi harga ke format "$xx.xx"
      const formattedPrice = parseFloat(price).toFixed(2);

      // ✅ Pastikan line tetap string & aquarium tetap number
      const formattedLine = typeof line === "string" ? line : "";
      const formattedAquarium = typeof aquarium === "number" ? aquarium : 0;

      // 🔹 Kirim data ke backend
      const productData = {
        uniqueId: uniqueId, // Pastikan tidak kosong
        date: formattedDate, // ⏳ Tanggal otomatis
        latinName: latinName,
        common_name: commonName,
        size: size, 
        plasticSize: plasticSize,
        heightCm: heightCm,
        line: line,
        aquarium: aquarium,
        price: formattedPrice, // ✅ Format harga
        link_image: imageUrls || "", // Ambil gambar pertama jika ada
      };

      console.log("📤 Mengirim data ke backend...", productData);

      const response = await axios.post(`${backendUrl}/api/product/addWysiwyg`, productData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });

      console.log("✅ Response dari server:", response.data);
      toast.success("Product added successfully!");
      setSuccess(true);

      // 🔹 Reset form setelah sukses
      setTimeout(() => {
        setSuccess(false);
      }, 3000);

    } catch (error) {
      console.error("❌ Error:", error);
      toast.error("Failed to add product!");
    } finally {
      setLoading(false);
    }
  };



  // ✅ Fungsi untuk menangani input custom (menambah ukuran baru)
  const handleCreateSize = (inputValue) => {
    if (!inputValue) return;

    // Cek apakah ukuran sudah ada di dalam opsi
    const exists = sizeOptions.some((option) => option.value === inputValue);
    if (!exists) {
      const newSize = { value: inputValue, label: inputValue };
      setSizeOptions((prev) => [...prev, newSize]); // Tambahkan ke opsi
    }

    // Tambahkan langsung ke selected size
    setSize((prev) => [...prev, inputValue]);
    setInputSize(""); // 🔥 Kosongkan input setelah ditambahkan
  };


  // ✅ Tangani Enter untuk menambahkan ukuran baru
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // 🔥 Cegah submit form
      handleCreateSize(inputSize);
    }
  };

  // ✅ Fungsi untuk menghapus ukuran dari dropdown
  const handleRemoveSize = (sizeValue) => {
    setSizeOptions((prev) => prev.filter((option) => option.value !== sizeValue));
    if (size === sizeValue) {
      setSize(null); // 🔥 Hapus pilihan jika yang dihapus adalah yang sedang dipilih
    }
  };


  // ✅ Fungsi untuk menangani input custom (menambah ukuran baru)
  const handleCreateAquarium = (inputValue) => {
    if (!inputValue) return;

    // Cek apakah ukuran sudah ada di dalam opsi
    const exists = aquariumOptions.some((option) => option.value === inputValue);
    if (!exists) {
      const newAquarium = { value: inputValue, label: inputValue };
      setAquariumOptions((prev) => [...prev, newAquarium]); // Tambahkan ke opsi
    }

    // Tambahkan langsung ke selected size
    setAquarium((prev) => [...prev, inputValue]);
    setInputAquarium(""); // 🔥 Kosongkan input setelah ditambahkan
  };

  // ✅ Tangani Enter untuk menambahkan ukuran baru
  const handleKeyDownAquarium = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // 🔥 Cegah submit form
      handleCreateAquarium(inputAquarium);
    }
  };

  // ✅ Fungsi untuk menghapus ukuran dari dropdown
  const handleRemoveAquarium = (aquariumValue) => {
    setAquariumOptions((prev) => prev.filter((option) => option.value !== aquariumValue));
    if (aquarium === aquariumValue) {
      setAquarium(null); // 🔥 Hapus pilihan jika yang dihapus adalah yang sedang dipilih
    }
  };

  // ✅ Fungsi untuk menghapus ukuran dari dropdown
  // const handleRemoveHeight = (heightValue) => {
  //   setHeightCmOptions((prev) => prev.filter((option) => option.value !== heightValue));
  //   if (heightCm === heightValue) {
  //     setHeightCm(null); // 🔥 Hapus pilihan jika yang dihapus adalah yang sedang dipilih
  //   }
  // };



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

        {/* Unique Id */}
        <div className="w-full">
          <label className="block font-semibold text-gray-700 mb-1">Unique ID</label>
          <input
            type="number"
            value={uniqueId}
            onChange={(e) => setUniqueId(e.target.value)}
            placeholder={`Enter Unique ID`}
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-400"

          />

          {/* 🔥 Tampilkan Unique ID Terakhir */}
          {maxUniqueId !== null && (
            <p className="text-sm text-gray-500 mt-1">
              Nomor urut terakhir: <strong>{maxUniqueId}</strong>
            </p>
          )}

          {/* 🔄 Tombol Sync */}
          <button
            type="button"
            onClick={fetchMaxUniqueId}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
            disabled={loading} // ❌ Disable saat loading
          >
            {loading ? "Syncing..." : "Sync Unique ID 🔄"}
          </button>
        </div>

        {/* ✅ Dropdown untuk Latin Name */}
        <div className="w-full">
          <label className="block font-semibold text-gray-700 mb-1">Latin Name</label>
          <Select
            options={latinNameOptions}
            value={latinNameOptions.find((option) => option.value === latinName)}
            onChange={(selectedOption) => setLatinName(selectedOption.value)}
            className="w-full block"
            styles={{
              menu: (provided) => ({
                ...provided,
                zIndex: 50, // 🔥 Supaya tidak tertutup elemen lain
              }),
            }}
            placeholder="Select Latin Name"
          />
        </div>

        {/* ✅ Dropdown untuk Common Name */}
        <div className="w-full">
          <label className="block font-semibold text-gray-700 mb-1">Common Name</label>
          <Select
            options={options}
            value={options.find((option) => option.value === commonName)}
            onChange={(selectedOption) => setCommonName(selectedOption.value)}
            className="w-full block"
            styles={{
              menu: (provided) => ({
                ...provided,
                zIndex: 50, // 🔥 Supaya tidak tertutup elemen lain
              }),
            }}
            placeholder="Select Common Name"
          />
        </div>

        <div className="flex flex-wrap md:grid md:grid-cols-2 gap-3 w-full">
          {/* ✅ Dropdown untuk Size (Bisa Tambah & Hapus Langsung) */}
          <div className="w-full">
            <label className="block font-semibold text-gray-700 mb-1">Size</label>
            <Select
              options={sizeOptions.map((option) => ({
                ...option,
                label: (
                  <div className="flex justify-between items-center">
                    <span>{option.label}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // 🔥 Cegah dropdown tertutup
                        handleRemoveSize(option.value);
                      }}
                      className="text-red-500 hover:text-red-700 text-sm font-bold ml-2"
                    >
                      ✕
                    </button>
                  </div>
                ),
              }))}
              value={sizeOptions.find((option) => option.value === size)}
              onChange={(selectedOption) => setSize(selectedOption.value)}
              className="w-full block"
              styles={{ menu: (provided) => ({ ...provided, zIndex: 50 }) }}
              placeholder="Select or Add Size"
              isClearable
              isSearchable
              inputValue={inputSize} // 🔥 Handle input manual
              onInputChange={(value) => setInputSize(value)} // 🔥 Simpan input ke state
              onKeyDown={handleKeyDown} // 🔥 Tangani event Enter
              noOptionsMessage={() => "Press Enter to add new size"} // 🔥 Info user bisa tambah opsi
            />
          </div>


          {/* ✅ Input Harga */}
          <div className="w-full">
            <label className="block font-semibold text-gray-700 mb-1">Price ($)</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-4 py-2 border rounded-md" placeholder="Enter price ($)" required />
          </div>
        </div>



        {/* ✅ Dropdown untuk Height (Bisa Tambah & Hapus Langsung) */}
        {/* <div>
          <label className="block font-semibold text-gray-700 mb-1">Height</label>
          <Select
            options={heightCmOptions.map((option) => ({
              ...option,
              label: (
                <div className="flex justify-between items-center">
                  <span>{option.label}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // 🔥 Cegah dropdown tertutup
                      handleRemoveHeight(option.value);
                    }}
                    className="text-red-500 hover:text-red-700 text-sm font-bold ml-2"
                  >
                    ✕
                  </button>
                </div>
              ),
            }))}
            value={heightCmOptions.find((option) => option.value === heightCm)}
            onChange={(selectedOption) => setAquarium(selectedOption.value)}
            className="w-full"
            styles={{ menu: (provided) => ({ ...provided, zIndex: 50 }) }}
            placeholder="Select or Add Height"
            isClearable

            isSearchable
            inputValue={inputHeightCm} // 🔥 Handle input manual
            onInputChange={(value) => setInputHeightCm(value)} // 🔥 Simpan input ke state
            onKeyDown={handleKeyDownHeight} // 🔥 Tangani event Enter
            noOptionsMessage={() => "Press Enter to add new size"} // 🔥 Info user bisa tambah opsi
          />
        </div> */}

        <div className="flex gap-4 w-full flex-wrap sm:flex-nowrap">
          <div className="w-full">
            <label className="block font-semibold text-gray-700 mb-1">Plastic Size</label>
            <Select
              options={plasticSizeOptions}
              value={plasticSizeOptions.find(option => option.value === plasticSize)}
              onChange={selectedOption => setPlasticSize(selectedOption.value)}
              className="w-full block"
              styles={{
                menu: (provided) => ({
                  ...provided,
                  zIndex: 50,
                }),
              }}
              placeholder="Select Plastic Size"
            />
          </div>


          {/* ✅ Input Height */}
          <div className="w-full">
            <label className="block font-semibold text-gray-700 mb-1">Height</label>
            <input type="number" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} className="w-full px-4 py-2 border rounded-md" placeholder="Enter height (cm)" required />
          </div>

        </div>

        <div className="flex gap-4 w-full flex-wrap sm:flex-nowrap">
          {/* ✅ Dropdown untuk Line */}
          <div className="w-full">
            <label className="block font-semibold text-gray-700 mb-1">Line</label>
            <Select
              options={lineOptions}
              value={lineOptions.find((option) => option.value === line)}
              onChange={(selectedOption) => setLine(selectedOption.value)}
              className="w-full block"
              styles={{
                menu: (provided) => ({
                  ...provided,
                  zIndex: 50, // 🔥 Supaya tidak tertutup elemen lain
                }),
              }}
              placeholder="Select Line"
            />
          </div>

          {/* ✅ Dropdown untuk Aquarium */}
          <div className="w-full">
            <label className="block font-semibold text-gray-700 mb-1">Aquarium</label>
            <Select
              options={[
                { value: 1, label: "1" },
                { value: 2, label: "2" },
                { value: 3, label: "3" },
                { value: 4, label: "4" },
                { value: 5, label: "5" },
                { value: 6, label: "6" },
                { value: 7, label: "7" },
                { value: 8, label: "8" },
                { value: 9, label: "9" },
                { value: 10, label: "10" },
              ]}
              value={{ value: aquarium, label: aquarium.toString() }}
              onChange={(selectedOption) => setAquarium(Number(selectedOption.value))}
              className="w-full"
              placeholder="Select Aquarium"
            />

          </div>
        </div>

        {/* <div>
          <label className="block font-semibold text-gray-700 mb-1">Aquarium</label>
          <Select
            options={aquariumOptions.map((option) => ({
              ...option,
              label: (
                <div className="flex justify-between items-center">
                  <span>{option.label}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // 🔥 Cegah dropdown tertutup
                      handleRemoveAquarium(option.value);
                    }}
                    className="text-red-500 hover:text-red-700 text-sm font-bold ml-2"
                  >
                    ✕
                  </button>
                </div>
              ),
            }))}
            value={aquariumOptions.find((option) => option.value === aquarium)}
            onChange={(selectedOption) => setAquarium(selectedOption.value)}
            className="w-full"
            styles={{ menu: (provided) => ({ ...provided, zIndex: 50 }) }}
            placeholder="Select or Add Aquarium"
            isClearable
            isSearchable
            inputValue={inputAquarium} // 🔥 Handle input manual
            onInputChange={(value) => setInputAquarium(value)} // 🔥 Simpan input ke state
            onKeyDown={handleKeyDownAquarium} // 🔥 Tangani event Enter
            noOptionsMessage={() => "Press Enter to add new size"} // 🔥 Info user bisa tambah opsi
          />
        </div> */}


        {/* ✅ Submit Button */}
        <button type="submit" className="w-full py-3 font-semibold rounded-md bg-green-600 hover:bg-green-700 text-white">
          {loading ? "Processing..." : "ADD PRODUCT"}
        </button>
      </form>
    </>
  );
};

export default AddWysiwyg;
