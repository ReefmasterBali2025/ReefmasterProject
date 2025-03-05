import { google } from "googleapis";
import dotenv from "dotenv";
import PlasticSize from "../models/PlasticSizeModel";

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
        const sheetName = "PLASTIC SIZE";
        const range = `${sheetName}!A1:B`;

        // ✅ Ambil data dari Google Sheets
        const result = await sheets.spreadsheets.values.get({ spreadsheetId, range });
        const rows = result.data.values;
        if (!rows || rows.length === 0) {
            return res.status(404).json({ success: false, message: "No data found in sheet" });
        }

        console.log("✅ Data berhasil diambil dari Google Sheets!");

        // 🔥 Mapping header sesuai dengan MongoDB Schema
        const mapping = {
            "PLASTIC SIZE": "plastic_size",
            "DIAMETER": "diameter"
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
            const existingItem = await PlasticSize.findOne({ unique_key: obj.unique_key });

            if (existingItem) {
                // ✅ Jika data sudah ada, update
                await PlasticSize.updateOne({ unique_key: obj.unique_key }, obj);
                console.log(`🔄 Data Updated: ${obj.unique_key}`);
            } else {
                // ✅ Jika data belum ada, insert baru
                await PlasticSize.create(obj);
                console.log(`✅ Data Inserted: ${obj.unique_key}`);
            }
        }

        return res.status(200).json({ success: true, message: "Data imported successfully" });

    } catch (error) {
        console.error("❌ Error importing data:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

