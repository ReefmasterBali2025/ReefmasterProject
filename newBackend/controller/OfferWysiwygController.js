import { google } from "googleapis";
import OfferWysiwyg from "../models/OfferWYSIWYGModel.js";
import dotenv from "dotenv";

dotenv.config();


export const importOfferWysiwyg = async (req, res) => {
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
        const range = "OFFER_WYSIWYG!A1:AS";

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
            "PAGE HEADER": "pageHeader",
            "DATE": "date",
            "UNIQUE ID": "uniqueId",
            "GENERATE UNIQUE ID": "generateUniqueId",
            "DOUBLE ID CHECKER": "doubleIdChecker",
            "CORAL DATA": "coralData",
            "LINE": "line",
            "AQUARIUM": "aquarium",
            "NUMBER": "number",
            "LOCATION": "location",
            "LOCATION CHECKER": "locationChecker",
            "APPSHEET CODE": "appsheetCode",
            "CITES": "cites",
            "ALIAS CITES 1": "aliasCites1",
            "CODE": "code",
            "LATIN NAME": "latinName",
            "COMMON NAME": "commonName",
            "SIZE": "size",
            "MARKING": "marking",
            "PLASTIC SIZE": "plasticSize",
            "HEIGHT (cm)": "heightCm",
            "PRICE": "price",
            "INDIVIDUAL DISCOUNT": "individualDiscount",
            "CITES COMBO": "citesCombo",
            "CITES SCLERACTINIAN FRAGMEN": "citesScleractinianFragmen",
            "CHERRY PICK IMAGE": "cherryPickImage",
            "EXCLUSIVE SECTION": "exclusiveSection",
            "EXCLUSIVE FOR": "exclusiveFor",
            "DUPLICATE IMAGE SECTION": "duplicateImageSection",
            "DUPLICATE CHECKER": "duplicateChecker",
            "SYSTEM": "system",
            "IMAGE FILE NAME": "imageFileName",
            "IMAGE": "image",
            "IMAGE SALE": "imageSale",
            "IMAGE CHECKER": "imageChecker",
            "ORDER STATUS": "orderStatus",
            "ORDER BY CART KEY": "orderByCartKey",
            "ORDER BY CRM": "orderByCrm",
            "ORDER BY USER": "orderByUser",
            "ORDER BY ID": "orderById",
            "SCRIPT RESPONSE": "scriptResponse",
            "SHOW": "show",
            "TEXT ALL PRICE MARGIN": "textAllPriceMargin",
            "TEXT INDIVIDUAL PRICE MARGIN": "textIndividualPriceMargin",
            "LINK IMAGE": "link_image"
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

            // 🔹 Cek apakah data dengan `uniqueId` sudah ada
            const existingItem = await OfferWysiwyg.findOne({ uniqueId: obj.uniqueId });

            if (existingItem) {
                // ✅ Jika data sudah ada, update
                console.log("🔄 Mengupdate data di MongoDB:", obj);
                await OfferWysiwyg.updateOne({ uniqueId: obj.uniqueId }, obj);
                updatedCount++;
                console.log(`🔄 Data Diperbarui: ${obj.uniqueId}`);
            } else {
                // ✅ Jika data belum ada, insert baru
                console.log("📥 Menambahkan data ke MongoDB:", obj);
                await OfferWysiwyg.create(obj);
                insertedCount++;
                console.log(`✅ Data Ditambahkan: ${obj.uniqueId}`);
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

export const getMaxUniqueId = async (req, res) => {
    try {
        // 🔥 Cari Unique ID terbesar
        const maxId = await OfferWysiwyg.findOne().sort({ uniqueId: -1 }).select("uniqueId");

        if (!maxId) {
            return res.status(404).json({ success: false, message: "No Unique ID found" });
        }

        return res.status(200).json({ success: true, maxUniqueId: maxId.uniqueId });
    } catch (error) {
        console.error("❌ Error fetching max Unique ID:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const fetchLatinNamesWysiwyg = async (req, res) => {
    try {
        console.log("🚀 Fetching Latin Names from Google Sheets...");

        // ✅ Setup autentikasi Google Sheets API
        const auth = new google.auth.GoogleAuth({
            keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
            scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
        });

        const authClient = await auth.getClient();
        const sheets = google.sheets({ version: "v4", auth: authClient });

        const spreadsheetId = process.env.SHEET_ID;
        const sheetName = "PRICE LIST WYSIWYG"; // 🔥 Sesuaikan dengan nama sheet
        const range = `${sheetName}!R2:R`; // 🔥 Ambil kolom A, asumsi `common_name` ada di kolom A

        const result = await sheets.spreadsheets.values.get({ spreadsheetId, range });
        const rows = result.data.values;

        if (!rows || rows.length === 0) {
            console.log("❌ Tidak ada data ditemukan.");
            return res.status(404).json({ success: false, message: "No data found" });
        }

        const latinNames = rows.map(row => row[0]).filter(name => name).sort((a, b) => a.localeCompare(b)); // Ambil hanya nama yang ada
        console.log("✅ Latin Names Fetched:", latinNames.length);

        return res.json({ success: true, data: latinNames });

    } catch (error) {
        console.error("❌ Error fetching Common Names:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
