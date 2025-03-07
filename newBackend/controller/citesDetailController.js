import { google } from 'googleapis';
import CitesDetail from '../models/citesDetailModel.js';

export const importCitesDetail = async (req, res) => {
    try {
        console.log("🚀 Memulai proses import data dari Google Sheets...");

        // 🔹 Setup autentikasi menggunakan service account
        const auth = new google.auth.GoogleAuth({
            keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
            scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
        });
        const authClient = await auth.getClient();
        const sheets = google.sheets({ version: "v4", auth: authClient });

        const spreadsheetId = process.env.SHEET_ID;
        const range = "CRM Cites Detail!A1:L";

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
        console.log("🔍 Contoh Data (Baris Pertama):", rows[1]);

        // 🔹 Mapping header dari Google Sheets ke field schema MongoDB
        const mapping = {
            "INITIAL 01": "initial_01",
            "PAGE HEADER": "page_header",
            "KEY": "key",
            "NO": "no",
            "TIME STAMPS": "timestamps",
            "KEY CITES": "key_cites",
            "CITES NUMBER": "cites_number",
            "CITES CATEGORY": "cites_category",
            "SECTION CITES DETAIL": "section_cites_detail",
            "SCIENTIFIC NAME KEY": "scientific_name_key",
            "SCIENTIFIC NAME": "scientific_name",
            "QUANTITY": "quantity",
        };

        // 🔹 Ambil header (baris pertama) dan lakukan trim agar konsisten
        const headers = rows[0].map(col => col.trim());
        const headerMapping = headers.map(col => mapping[col] || col);

        console.log("📝 Header yang digunakan untuk mapping:", headerMapping);

        let updatedCount = 0;
        let insertedCount = 0;

        // 🔹 Mapping setiap baris data ke objek sesuai schema MongoDB
        for (let i = 1; i < rows.length; i++) {
            let obj = {};
            headerMapping.forEach((key, index) => {
                obj[key] = rows[i][index] ? rows[i][index].trim() : "";
            });

            // 🔹 Cek apakah data dengan `key` sudah ada
            const existingItem = await CitesDetail.findOne({ key: obj.key });

            if (existingItem) {
                // ✅ Jika data sudah ada, update
                console.log("🔄 Mengupdate data di MongoDB:", obj);
                await CitesDetail.updateOne({ key: obj.key }, obj);
                updatedCount++;
                console.log(`🔄 Data Diperbarui: ${obj.key}`);
            } else {
                // ✅ Jika data belum ada, insert baru
                console.log("📥 Menambahkan data ke MongoDB:", obj);
                await CitesDetail.create(obj);
                insertedCount++;
                console.log(`✅ Data Ditambahkan: ${obj.key}`);
            }
        }

        console.log(`🚀 Import selesai! 🔄 ${updatedCount} data diperbarui, ✅ ${insertedCount} data ditambahkan.`);

        return res.status(200).json({
            success: true,
            message: `Import selesai! 🔄 ${updatedCount} data diperbarui, ✅ ${insertedCount} data ditambahkan.`,
        });

    } catch (error) {
        console.error("❌ Error importing data:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const getCitesDetailByNumber = async (req, res) => {
    try {
        const { citesNumber } = req.params;

        // 🔥 Cari data berdasarkan cites_number
        const citesRecords = await CitesDetail.find({ cites_number: citesNumber });

        if (!citesRecords.length) {
            return res.status(404).json({ success: false, message: "CITES not found." });
        }

        return res.status(200).json({
            success: true,
            cites_category: citesRecords[0].cites_category, // 🔥 Ambil kategori dari data pertama
            data: citesRecords,
        });
    } catch (error) {
        console.error("❌ Error fetching CITES details:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllCitesDetails = async (req, res) => {
    try {
        const { citesList } = req.body;

        // 🔥 Cari semua CITES berdasarkan daftar CITES yang dimiliki user
        const citesRecords = await CitesDetail.find({ cites_number: { $in: citesList } });

        if (!citesRecords.length) {
            return res.status(404).json({ success: false, message: "No CITES found." });
        }

        // 🔥 Kelompokkan berdasarkan CITES Category
        const groupedData = citesRecords.reduce((acc, item) => {
            if (!acc[item.cites_category]) {
                acc[item.cites_category] = [];
            }
            acc[item.cites_category].push({
                scientific_name: item.scientific_name,
                quantity: item.quantity,
                order: 0,
            });
            return acc;
        }, {});

        return res.status(200).json({
            success: true,
            data: groupedData,
        });
    } catch (error) {
        console.error("❌ Error fetching all CITES details:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
