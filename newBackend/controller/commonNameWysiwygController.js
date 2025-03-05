import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

export const fetchCommonNamesWysiwyg = async (req, res) => {
    try {
        console.log("🚀 Fetching Common Names from Google Sheets...");

        // ✅ Setup autentikasi Google Sheets API
        const auth = new google.auth.GoogleAuth({
            keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
            scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
        });

        const authClient = await auth.getClient();
        const sheets = google.sheets({ version: "v4", auth: authClient });

        const spreadsheetId = process.env.SHEET_ID;
        const sheetName = "PRICE LIST WYSIWYG"; // 🔥 Sesuaikan dengan nama sheet
        const range = `${sheetName}!S2:S`; // 🔥 Ambil kolom A, asumsi `common_name` ada di kolom A

        const result = await sheets.spreadsheets.values.get({ spreadsheetId, range });
        const rows = result.data.values;

        if (!rows || rows.length === 0) {
            console.log("❌ Tidak ada data ditemukan.");
            return res.status(404).json({ success: false, message: "No data found" });
        }

        const commonNames = rows.map(row => row[0]).filter(name => name); // Ambil hanya nama yang ada
        console.log("✅ Common Names Fetched:", commonNames.length);

        return res.json({ success: true, data: commonNames });

    } catch (error) {
        console.error("❌ Error fetching Common Names:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};