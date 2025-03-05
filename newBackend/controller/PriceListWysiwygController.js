import { google } from 'googleapis';
import priceListWysiwyg from '../models/PriceListWysiwygModel.js';
import dotenv from "dotenv";

dotenv.config();


export const importPriceListWysiwyg = async (req, res) => {
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
        const range = "PRICE LIST WYSIWYG!A1:Z";

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
            "NO": "no",
            "WYSIWYG UNIQUE KEY": "wysiwygUniqueKey",
            "CODE": "code",
            "CITES I": "citesI",
            "CITES II": "citesII",
            "CITES III": "citesIII",
            "CITES IV": "citesIV",
            "CITES V": "citesV",
            "CITES VI": "citesVI",
            "1. Category": "field1Category",
            "2. Genus": "field2Genus",
            "3. Species": "field3Species",
            "4": "field4",
            "5. Color": "field5Color",
            "6. Grade": "field6Grade",
            "7. Size": "field7Size",
            "SCIENTIFIC NAME": "scientificName",
            "COMMON NAME": "commonName",
            "LOCAL NAME": "localName",
            "GRADE": "grade",
            "SIZE": "size",
            "HARGA JUAL": "hargaJual",
            "UPSALE": "upsale",
            "HARGA GROSS": "hargaGross",
            "COST": "cost",
            "GROUP": "group",
            "ALIAS CITES WILD": "aliasCitesWild"
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

            // 🔥 Konversi angka yang mengandung simbol mata uang
            const parseCurrency = (value) => {
                if (!value) return "0";
                return value.replace(/[^0-9.,]+/g, ""); // Hapus semua karakter kecuali angka dan koma/desimal
            };

            // 🔥 Format Harga
            obj.hargaJual = `$${parseCurrency(obj.hargaJual)}`;
            obj.hargaGross = `$${parseCurrency(obj.hargaGross)}`;
            obj.cost = `Rp ${parseCurrency(obj.cost)}`;

            // 🔥 Format Upsale sebagai diskon dalam persen
            obj.upsale = `${parseCurrency(obj.upsale)}%`;

            // 🔹 Cek apakah data dengan `wysiwygUniqueKey` sudah ada
            const existingItem = await priceListWysiwyg.findOne({ wysiwygUniqueKey: obj.wysiwygUniqueKey });

            if (existingItem) {
                // ✅ Jika data sudah ada, update
                console.log("🔄 Mengupdate data di MongoDB:", obj);
                await priceListWysiwyg.updateOne({ wysiwygUniqueKey: obj.wysiwygUniqueKey }, obj);
                updatedCount++;
                console.log(`🔄 Data Diperbarui: ${obj.wysiwygUniqueKey}`);
            } else {
                // ✅ Jika data belum ada, insert baru
                console.log("📥 Menambahkan data ke MongoDB:", obj);
                await priceListWysiwyg.create(obj);
                insertedCount++;
                console.log(`✅ Data Ditambahkan: ${obj.wysiwygUniqueKey}`);
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
