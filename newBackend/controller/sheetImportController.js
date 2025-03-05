import { google } from 'googleapis';
import SheetImport from '../models/sheetImportModel.js';

export const importSheetData = async (req, res) => {
    try {
        console.log("🚀 Memulai proses import data dari Google Sheets...");

        // 🔹 Setup autentikasi menggunakan service account
        const auth = new google.auth.GoogleAuth({
            keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        });
        const authClient = await auth.getClient();
        const sheets = google.sheets({ version: 'v4', auth: authClient });

        const spreadsheetId = process.env.SHEET_ID;
        const range = 'PRICE LIST STOCK LIST!A1:Z';

        console.log("📡 Mengambil data dari Google Sheets...");
        const result = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });

        const rows = result.data.values;
        if (!rows || rows.length === 0) {
            console.log("❌ Tidak ada data ditemukan di Google Sheets.");
            return res.status(404).json({ success: false, message: 'No data found in sheet' });
        }

        console.log(`✅ Berhasil mengambil ${rows.length - 1} baris data dari Google Sheets!`);
        console.log("🔍 Contoh Data (Baris Pertama):", rows[1]);

        // 🔹 Mapping header dari Google Sheets ke field schema MongoDB
        const mapping = {
            "NO": "no",
            "STOCK LIST UNIQUE KEY": "stockListUniqueKey",
            "CODE": "code",
            "CITES I": "citesI",
            "CITES II": "citesII",
            "CITES III": "citesIII",
            "CITES IV": "citesIV",
            "CITES V": "citesV",
            "CITES VI": "citesVI",
            "1": "field1",
            "2": "field2",
            "3": "field3",
            "4": "field4",
            "5": "field5",
            "6": "field6",
            "7": "field7",
            "SCIENTIFIC NAME": "scientificName",
            "COMMON NAME": "commonName",
            "LOCAL NAME": "localName",
            "GRADE": "grade",
            "SIZE": "size",
            "HARGA JUAL": "hargaJual",
            "UPSALE": "upsale",
            "HARGA NET": "hargaNet",
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
            const parseCurrency = (value, currencySymbol) => {
                if (!value) return 0; // Jika kosong, default ke 0
                return parseFloat(value.replace(new RegExp(`[^0-9.]+`, "g"), "")) || 0;
            };

            // 🔥 Konversi Harga Jual dan Harga Net ke USD
            obj.hargaJual = `$${parseCurrency(obj.hargaJual, "$").toFixed(2)}`;
            obj.hargaNet = `$${parseCurrency(obj.hargaNet, "$").toFixed(2)}`;

            // 🔥 Konversi Cost ke Rupiah
            obj.cost = `Rp ${parseCurrency(obj.cost, "Rp").toLocaleString("id-ID")}`;

            // 🔥 Format Upsale sebagai diskon dalam persen
            obj.upsale = `${parseCurrency(obj.upsale, "%").toFixed(2)}%`;

            // 🔹 Konversi angka lain ke tipe Number
            obj.stock = Number(obj.stock) || 0;
            obj.actual_stock = Number(obj.actual_stock) || 0;
            obj.available_stock = Number(obj.available_stock) || 0;
            obj.value = Number(obj.value) || 0;
            obj.height_cm = Number(obj.height_cm) || 0;

            // 🔹 Cek apakah data dengan `stockListUniqueKey` sudah ada
            const existingItem = await SheetImport.findOne({ stockListUniqueKey: obj.stockListUniqueKey });

            if (existingItem) {
                // ✅ Jika data sudah ada, update
                await SheetImport.updateOne({ stockListUniqueKey: obj.stockListUniqueKey }, obj);
                updatedCount++;
                console.log(`🔄 Data Diperbarui: ${obj.stockListUniqueKey}`);
            } else {
                // ✅ Jika data belum ada, insert baru
                await SheetImport.create(obj);
                insertedCount++;
                console.log(`✅ Data Ditambahkan: ${obj.stockListUniqueKey}`);
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
