import { google } from "googleapis";
import UserGsheet from "../models/userGsheetModel.js";

export const importUserGsheet = async (req, res) => {
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
        console.log("🔍 Contoh Data (Baris Pertama):", rows[1]);

        // 🔹 Mapping header dari Google Sheets ke schema MongoDB (sesuai dengan model)
        const mapping = {
            "STARTING": "STARTING",
            "KEY": "KEY",
            "USER NO": "USER_NO",
            "ROLE": "ROLE",
            "SECTION VERIFICATION": "SECTION_VERIFICATION",
            "USER VERIFICATION CODE": "USER_VERIFICATION_CODE",
            "SECTION ACCOUNT": "SECTION_ACCOUNT",
            "ID": "ID",
            "PASSWORD": "PASSWORD",
            "LANGUAGE": "LANGUAGE",
            "DETAIL INFORMATION": "DETAIL_INFORMATION",
            "PROFORMA": "PROFORMA",
            "RULE": "RULE",
            "NOTE": "NOTE",
            "BOX CONFIGURATION": "BOX_CONFIGURATION",
            "SECTION DISPLAY CONFIRMATION": "SECTION_DISPLAY_CONFIRMATION",
            "NEXT SYNC": "NEXT_SYNC",
            "CONFIRMATION": "CONFIRMATION",
            "SECTION FOR EXPORTER ONLY": "SECTION_FOR_EXPORTER_ONLY",
            "MARKETING": "MARKETING",
            "ORDER TYPE": "ORDER_TYPE",
            "ORDER BATCH": "ORDER_BATCH",
            "CLOSE ORDER DATE": "CLOSE_ORDER_DATE",
            "FORCE CLOSE ORDER": "FORCE_CLOSE_ORDER",
            "CRM SECTION": "CRM_SECTION",
            "CUSTOMER KEY": "CUSTOMER_KEY",
            "CRM DASHBOARD": "CRM_DASHBOARD",
            "SUB SECTION CITES": "SUB_SECTION_CITES",
            "CITES TYPE": "CITES_TYPE",
            "CITES COMBO": "CITES_COMBO",
            "CITES SCLERACTINIAN FRAGMEN": "CITES_SCLERACTINIAN_FRAGMEN",
            "NO CITES 1": "NO_CITES_1",
            "NO CITES 2": "NO_CITES_2",
            "NO CITES 3": "NO_CITES_3",
            "NO CITES 4": "NO_CITES_4",
            "NO CITES 5": "NO_CITES_5",
            "NO CITES 6": "NO_CITES_6",
            "NO CITES 7": "NO_CITES_7",
            "NO CITES 8": "NO_CITES_8",
            "NO CITES 9": "NO_CITES_9",
            "NO CITES 10": "NO_CITES_10",
            "CITES CULTURE": "CITES_CULTURE",
            "CITES WILD": "CITES_WILD",
            "SECTION RATE": "SECTION_RATE",
            "CRM PACKING CHARGE HD BOXES": "CRM_PACKING_CHARGE_HD_BOXES",
            "CRM CITES CHARGE CULTURE CORAL": "CRM_CITES_CHARGE_CULTURE_CORAL",
            "CRM CITES CHARGE WILD CORAL": "CRM_CITES_CHARGE_WILD_CORAL",
            "CRM CITES PROCESSING FEE": "CRM_CITES_PROCESSING_FEE",
            "CRM STATEMENT LETTER CHARGE": "CRM_STATEMENT_LETTER_CHARGE",
            "CRM DOCUMENT HANDLING FEE": "CRM_DOCUMENT_HANDLING_FEE",
            "CRM FISH PERMIT": "CRM_FISH_PERMIT",
            "CRM RATE 100": "CRM_RATE_100",
            "CRM RATE 250": "CRM_RATE_250",
            "CRM RATE 300": "CRM_RATE_300",
            "CRM RATE 500": "CRM_RATE_500",
            "CRM RATE 1000": "CRM_RATE_1000",
            "CRM AWB + CCC FEE": "CRM_AWB_CCC_FEE",
            "CRM VAT FEE (1,1%)": "CRM_VAT_FEE",
            "CRM PICKUP": "CRM_PICKUP",
            "SECTION DISCOUNT": "SECTION_DISCOUNT",
            "RHCC DISCOUNT": "RHCC_DISCOUNT",
            "RHCW DISCOUNT": "RHCC_DISCOUNT",
            "RSCC DISCOUNT": "RHCC_DISCOUNT",
            "RANE DISCOUNT": "RHCC_DISCOUNT",
            "GHCC DISCOUNT": "RHCC_DISCOUNT",
            "GHCW DISCOUNT": "RHCC_DISCOUNT",
            "GSCC DISCOUNT": "RHCC_DISCOUNT",
            "GSCW DISCOUNT": "RHCC_DISCOUNT",
            "GANE DISCOUNT": "RHCC_DISCOUNT",
            "FISC DISCOUNT": "RHCC_DISCOUNT",
            "FISW DISCOUNT": "RHCC_DISCOUNT",
            "INVR DISCOUNT": "RHCC_DISCOUNT",
            "SECTION MENU SETTING": "SECTION_MENU_SETTING",
            "DEMO MODE": "DEMO_MODE",
            "TRANSHIPMENT MODE": "TRANSHIPMENT_MODE",
            "CITES DISPLAY": "CITES_DISPLAY",
            "LANDED COST DISPLAY": "LANDED_COST_DISPLAY",
            "PRICE MARGIN": "PRICE_MARGIN",
            "FREIGHT MARGIN": "FREIGHT_MARGIN",
            "IMPORT DUTIES": "IMPORT_DUTIES",
            "SECTION USER SUMMARY ORDER": "SECTION_USER_SUMMARY_ORDER",
            "CRM REFERENCE": "CRM_REFERENCE",
            "ORDER CULTURE CORAL": "ORDER_CULTURE_CORAL",
            "ORDER WILD CORAL": "ORDER_WILD_CORAL",
            "ORDER NON CITES CORAL": "ORDER_NON_CITES_CORAL",
            "ORDER FISH": "ORDER_FISH",
            "TOTAL ORDER": "TOTAL_ORDER",
            "AMOUNT BEFORE MARGIN": "AMOUNT_BEFORE_MARGIN",
            "AMOUNT": "AMOUNT",
            "WEIGHT": "WEIGHT",
            "VOLUME": "VOLUME",
            "TAX": "TAX",
            "BOX": "BOX",
            "NON CITES BOX": "NON_CITES_BOX",
            "TOTAL BOX": "TOTAL_BOX",
            "SECTION FREIGHT & COST": "SECTION_FREIGHT_COST",
            "PACKING CHARGE HD BOXES": "PACKING_CHARGE_HD_BOXES",
            "CITES CHARGE CULTURE CORAL": "CITES_CHARGE_CULTURE_CORAL",
            "CITES CHARGE WILD CORAL": "CITES_CHARGE_WILD_CORAL",
            "CITES PROCESSING FEE": "CITES_PROCESSING_FEE",
            "STATEMENT LETTER CHARGE": "STATEMENT_LETTER_CHARGE",
            "DOCUMENT HANDLING FEE": "DOCUMENT_HANDLING_FEE",
            "FISH PERMIT": "FISH_PERMIT",
            "RATE": "RATE",
            "FREIGHT CHARGE ALL IN": "FREIGHT_CHARGE_ALL_IN",
            "AWB + CCC FEE": "AWB_CCC_FEE",
            "VAT FEE": "VAT_FEE",
            "PICKUP": "PICKUP",
            "IMPORT FEE": "IMPORT_FEE",
            "TOTAL LANDED COST BEFORE MARGIN": "TOTAL_LANDED_COST_BEFORE_MARGIN",
            "TOTAL LANDED COST": "TOTAL_LANDED_COST",
            "TOTAL COST BEFORE MARGIN": "TOTAL_COST_BEFORE_MARGIN",
            "TOTAL COST": "TOTAL_COST",
            "PROFIT": "PROFIT",
            "SECTION UNPACKING": "SECTION_UNPACKING",
            "SCAN": "SCAN",
            "EXPORTER ONLY": "EXPORTER_ONLY",
            "NEW LINE": "NEW_LINE",
            "NEW AQUARIUM": "NEW_AQUARIUM",
            "NEW NUMBER": "NEW_NUMBER",
            "RHCC": "RHCC",
            "RHCW": "RHCW",
            "RSCC": "RSCC",
            "RSCW": "RSCW",
            "RANE": "RANE",
            "GHCC": "GHCC",
            "GHCW": "GHCW",
            "GSCC": "GSCC",
            "GSCW": "GSCW",
            "GANE": "GANE",
            "FISC": "FISC",
            "FISW": "FISW",
            "INVR": "INVR",

        };

        // 🔹 Ambil header (baris pertama) dan lakukan trim
        const headers = rows[0].map(col => col.trim());
        const headerMapping = headers.map(col => mapping[col] || col);

        console.log("📝 Header yang digunakan untuk mapping:", headerMapping);

        let updatedCount = 0;
        let insertedCount = 0;

        // 🔹 Mapping setiap baris data ke objek sesuai schema MongoDB
        for (let i = 1; i < rows.length; i++) {
            let obj = {};
            headerMapping.forEach((key, index) => {
                let value = rows[i][index] ? rows[i][index].trim() : "";

                // 🔥 Hilangkan simbol "$" dan "%" lalu konversi ke Number jika perlu
                // if (typeof value === "string") {
                //     value = value.replace(/[$,%]/g, "").trim();
                // }

                // 🔥 Konversi ke Number jika berisi angka
                // if (!isNaN(value) && value !== "") {
                //     value = parseFloat(value);
                // }

                // 🔥 Konversi ke Boolean untuk kolom yang mengandung "TRUE" atau "FALSE"
                if (value === "TRUE") value = true;
                if (value === "FALSE") value = false;

                obj[key] = value;
            });

            // 🔹 Cek apakah data dengan KEY sudah ada
            const existingItem = await UserGsheet.findOne({ KEY: obj.KEY });

            if (existingItem) {
                // ✅ Jika data sudah ada, update
                console.log("🔄 Mengupdate data di MongoDB:", obj);
                await UserGsheet.updateOne({ KEY: obj.KEY }, obj);
                updatedCount++;
            } else {
                // ✅ Jika data belum ada, insert baru
                console.log("📥 Menambahkan data ke MongoDB:", obj);
                await UserGsheet.create(obj);
                insertedCount++;
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
