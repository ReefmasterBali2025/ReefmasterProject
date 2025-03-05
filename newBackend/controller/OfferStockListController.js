import { google } from "googleapis";
import OfferStockList from "../models/OfferStockListModel.js"; // Model yang sudah dibuat
import dotenv from "dotenv";

dotenv.config();

export const importOfferStockList = async (req, res) => {
    try {
        // 🔥 Setup Google Sheets API
        const auth = new google.auth.GoogleAuth({
            keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
            scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
        });
        const authClient = await auth.getClient();
        const sheets = google.sheets({ version: "v4", auth: authClient });

        const spreadsheetId = process.env.SHEET_ID;
        const sheetName = "OFFER_Stock List";
        const range = `${sheetName}!A1:Z`;

        // ✅ Ambil data dari Google Sheets
        const result = await sheets.spreadsheets.values.get({ spreadsheetId, range });
        const rows = result.data.values;
        if (!rows || rows.length === 0) {
            return res.status(404).json({ success: false, message: "No data found in sheet" });
        }

        console.log("✅ Data berhasil diambil dari Google Sheets!");

        // 🔥 Mapping header sesuai dengan MongoDB Schema
        const mapping = {
            "PAGE HEADER": "page_header",
            "UNIQUE KEY": "unique_key",
            "APPSHEET CODE": "appsheet_code",
            "CITES": "cites",
            "ALIAS CITES 1": "alias_cites_1",
            "CODE": "code",
            "LATIN NAME": "latin_name",
            "COMMON NAME": "common_name",
            "SIZE": "size",
            "STOCK": "stock",
            "ACTUAL STOCK": "actual_stock",
            "AVAILABLE STOCK": "available_stock",
            "VALUE": "value",
            "PLASTIC SIZE": "plastic_size",
            "HEIGHT (cm)": "height_cm",
            "PRICE": "price",
            "SYSTEM": "system",
            "IMAGE FILE NAME": "image_file_name",
            "IMAGE": "image",
            "IMAGE CHECKER": "image_checker",
            "LINK IMAGE": "link_image"
        };

        // Ambil header (baris pertama) dan lakukan trimming agar konsisten
        const headers = rows[0].map((col) => col.trim());
        const headerMapping = headers.map((col) => mapping[col] || col);

        // 🔥 Update MongoDB tanpa menghapus data lama
        for (let i = 1; i < rows.length; i++) {
            let obj = {};
            headerMapping.forEach((key, index) => {
                obj[key] = rows[i][index] ? rows[i][index].trim() : "";
            });

            // 🔥 Hapus simbol "$" dan konversi harga ke Number dengan 2 angka di belakang koma
            if (obj.price) {
                obj.price = obj.price.replace(/[$,]/g, ""); // Hapus simbol $, ,
                obj.price = parseFloat(obj.price).toFixed(2); // Simpan dengan 2 angka desimal

            } else {
                obj.price = 0.00;
            }

            // 🔥 Konversi angka lain ke tipe Number
            obj.stock = Number(obj.stock) || 0;
            obj.actual_stock = Number(obj.actual_stock) || 0;
            obj.available_stock = Number(obj.available_stock) || 0;
            obj.value = Number(obj.value) || 0;
            obj.height_cm = Number(obj.height_cm) || 0;

            // 🔹 Cek apakah data dengan `unique_key` sudah ada
            const existingItem = await OfferStockList.findOne({ unique_key: obj.unique_key });

            if (existingItem) {
                // ✅ Jika data sudah ada, update
                await OfferStockList.updateOne({ unique_key: obj.unique_key }, obj);
                console.log(`🔄 Data Updated: ${obj.unique_key}`);
            } else {
                // ✅ Jika data belum ada, insert baru
                await OfferStockList.create(obj);
                console.log(`✅ Data Inserted: ${obj.unique_key}`);
            }
        }

        return res.status(200).json({ success: true, message: "Data imported successfully" });

    } catch (error) {
        console.error("❌ Error importing data:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

