import { google } from "googleapis";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// 🔥 Koneksi ke MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("🔥 MongoDB Connected"))
    .catch(err => console.error("MongoDB Connection Error:", err));

// 🔥 Konfigurasi Google Sheets API
const sheets = google.sheets({ version: "v4", auth: process.env.GOOGLE_API_KEY });

// ✅ Fungsi untuk ambil data dari Google Sheets
const fetchSheetData = async (sheetName) => {
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SHEET_ID,
            range: `${sheetName}`,
        });

        return response.data.values; // Mengembalikan data sheet
    } catch (error) {
        console.error(`❌ Error fetching sheet '${sheetName}':`, error);
        return null;
    }
};

// ✅ Fungsi untuk menyimpan data ke MongoDB sesuai nama sheet
const saveToMongoDB = async (sheetName, data) => {
    if (!data || data.length === 0) {
        console.log(`❌ Tidak ada data untuk '${sheetName}'`);
        return;
    }

    const headers = data[0]; // Ambil nama kolom dari baris pertama
    const rows = data.slice(1); // Ambil isi datanya

    // 🔥 Buat Schema MongoDB sesuai dengan headers
    const schemaDefinition = {};
    headers.forEach(header => schemaDefinition[header] = String); // Semua dianggap string untuk fleksibilitas

    const DynamicSchema = new mongoose.Schema(schemaDefinition);
    const DynamicModel = mongoose.model(sheetName, DynamicSchema); // Nama collection = nama sheet

    // 🔥 Insert data ke MongoDB
    const formattedData = rows.map(row => {
        let obj = {};
        headers.forEach((header, index) => {
            obj[header] = row[index] || "";
        });
        return obj;
    });

    await DynamicModel.insertMany(formattedData);
    console.log(`✅ Data dari sheet '${sheetName}' berhasil disimpan ke MongoDB!`);
};

// ✅ Fungsi utama untuk import semua sheet
const importSheetsToMongo = async () => {
    try {
        const sheetMetadata = await sheets.spreadsheets.get({
            spreadsheetId: process.env.SHEET_ID,
        });

        const sheetNames = sheetMetadata.data.sheets.map(sheet => sheet.properties.title);
        console.log(`🔥 Sheets ditemukan: ${sheetNames.join(", ")}`);

        for (const sheetName of sheetNames) {
            const sheetData = await fetchSheetData(sheetName);
            await saveToMongoDB(sheetName, sheetData);
        }

        console.log("🎉 Semua data berhasil di-import ke MongoDB!");
        mongoose.connection.close(); // Tutup koneksi MongoDB setelah selesai
    } catch (error) {
        console.error("❌ Error importing sheets:", error);
    }
};

// 🔥 Jalankan proses import
importSheetsToMongo();
