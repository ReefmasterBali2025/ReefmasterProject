import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import { importSheetData } from './controller/sheetImportController.js';
import { importOfferStockList } from './controller/OfferStockListController.js';
import { checkImgBBConnection } from "./middleware/imgbb.js"; // 🔥 Import ImgBB Connection Check
// Import the functions you need from the SDKs you need


// APP Config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();
checkImgBBConnection(); // ✅ Cek apakah ImgBB terhubung

// Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);

app.get('/', (req, res) => {
    res.send("API Working");
});

// Route untuk import data dari Google Sheets ke MongoDB
app.get('/api/import', importSheetData);

// Route untuk import data dari Google Sheets ke MongoDB
app.get('/api/importOfferStockList', importOfferStockList);
// 🔹 Proxy untuk mengambil gambar dari Google Drive
app.get("/api/google-drive-image/:id", async (req, res) => {
    try {
        const fileId = req.params.id;
        const imageUrl = `https://drive.google.com/uc?id=${fileId}`;
        res.redirect(imageUrl);
    } catch (error) {
        console.error("❌ Error fetching Google Drive Image:", error);
        res.status(500).json({ success: false, message: "Failed to fetch image" });
    }
});


// Start Server
app.listen(port, () => console.log("Server started on PORT : " + port));
