import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import { importSheetData } from './controller/sheetImportController.js';
import { importOfferStockList } from './controller/OfferStockListController.js';
// import priceListWysiwyg from './models/PriceListWysiwygModel.js';
import { importPriceListWysiwyg } from './controller/PriceListWysiwygController.js';
import { importOfferWysiwyg } from './controller/OfferWysiwygController.js';
import { fetchCommonNames } from './controller/commonNameController.js';
import { fetchCommonNamesWysiwyg } from './controller/commonNameWysiwygController.js';
import { importUserGsheet } from './controller/userGsheetController.js';
import { getAllCitesDetails, getCitesDetailByNumber, importCitesDetail } from './controller/citesDetailController.js';
// import { checkImgBBConnection } from "./middleware/imgbb.js"; // 🔥 Import ImgBB Connection Check
// Import the functions you need from the SDKs you need


// APP Config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();
// checkImgBBConnection(); // ✅ Cek apakah ImgBB terhubung

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

// Route untuk import data dari Price List Wysiwyg Google Sheets
app.get('/api/importPriceListWysiwyg', importPriceListWysiwyg)

// Route untuk import data offer wysiwyg dari google sheets ke mongo db
app.get('/api/importOfferWysiwyg', importOfferWysiwyg)

// Route untuk import data dari Google Sheets ke MongoDB
app.get('/api/importOfferStockList', importOfferStockList);
// 🔹 Proxy untuk mengambil gambar dari Google Drive

app.get("/api/common-names", fetchCommonNames); // 🔥 Route untuk ambil common_name

app.get("/api/common-names-wysiwyg", fetchCommonNamesWysiwyg); // 🔥 Route untuk ambil common_name

app.get("/api/userGsheet", importUserGsheet);

app.get("/api/citesDetail", importCitesDetail);

// 🔥 Tambahkan endpoint baru
app.get("/api/citesNumberDetail/:citesNumber", getCitesDetailByNumber);

app.post("/api/citesAllDetails", getAllCitesDetails);




// Start Server
app.listen(port, () => console.log("Server started on PORT : " + port));
