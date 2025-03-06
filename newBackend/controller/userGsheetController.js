import { google } from "googleapis";
import UserGsheet from "../models/userGsheetModel.js";
import fs from "fs";

export const importUserGsheet = async (req, res) => {
    try {
        console.log("🚀 Memulai proses import data dari Google Sheets...");

        // 🔥 Pastikan file kredensial tersedia
        if (!fs.existsSync(process.env.GOOGLE_APPLICATION_CREDENTIALS)) {
            console.error("❌ File kredensial Google tidak ditemukan.");
            return res.status(500).json({ success: false, message: "Google credentials not found." });
        }

        // 🔹 Setup autentikasi menggunakan service account
        const auth = new google.auth.GoogleAuth({
            keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
            scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
        });

        const authClient = await auth.getClient();
        const sheets = google.sheets({ version: "v4", auth: authClient });

        const spreadsheetId = process.env.SHEET_ID;
        const range = "USER!A1:ZZ"; // Pastikan sheet dan range sesuai

        console.log("📡 Mengambil data dari Google Sheets...");
        const result = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });

        const rows = result.data.values;
        if (!rows || rows.length === 0) {
            console.log("❌ Tidak ada data ditemukan di Google Sheets.");
            return res.status(404).json({ success: false, message: "No data found in sheet" });
        }

        console.log(`✅ Berhasil mengambil ${rows.length - 1} baris data dari Google Sheets!`);

        // 🔹 Lanjutkan proses parsing dan penyimpanan ke MongoDB...
        // (kode mapping tetap sama)

    } catch (error) {
        console.error("❌ Error importing data:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
