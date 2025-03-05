// import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();

// const IMGBB_API_KEY = process.env.IMGBB_API_KEY;

// // 🔹 Fungsi untuk mengecek koneksi ke ImgBB
// export const checkImgBBConnection = async () => {
//     try {
//         if (!IMGBB_API_KEY) {
//             throw new Error("IMGBB API Key is missing!");
//         }

//         const formData = new FormData();
//         formData.append("image", file.buffer); // ✅ Gambar yang diunggah
//         formData.append("key", IMGBB_API_KEY); // ✅ API Key untuk otorisasi ke ImgBB

//         const response = await axios.post("https://api.imgbb.com/1/upload", formData, {
//             headers: { "Content-Type": "multipart/form-data" },
//         });

//         return response.data.data.url; // ✅ URL gambar yang dihasilkan oleh ImgBB
//     } catch (error) {
//         console.error("❌ Error uploading to ImgBB:", error.response?.data || error.message);
//         throw new Error("Failed to upload file to ImgBB");
//     }
// };

// // 🔹 Fungsi untuk upload gambar ke ImgBB
// export const uploadToImgBB = async (file) => {
//     try {
//         if (!IMGBB_API_KEY) {
//             throw new Error("IMGBB API Key is missing!");
//         }

//         // 🔥 Baca file gambar sebagai base64
//         const imageData = file.buffer.toString("base64");

//         // 🔥 Upload ke ImgBB
//         const response = await axios.post(
//             "https://api.imgbb.com/1/upload",
//             null,
//             {
//                 params: {
//                     key: IMGBB_API_KEY,
//                     image: imageData,
//                 },
//             }
//         );

//         return response.data.data.url; // ✅ Return URL gambar dari ImgBB
//     } catch (error) {
//         console.error("❌ Error uploading to ImgBB:", error.response?.data || error.message);
//         throw new Error("Failed to upload file to ImgBB");
//     }
// };
