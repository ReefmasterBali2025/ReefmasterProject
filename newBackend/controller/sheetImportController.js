import { google } from 'googleapis';
import SheetImport from '../models/sheetImportModel.js';

export const importSheetData = async (req, res) => {
    try {
        // Setup autentikasi menggunakan service account
        const auth = new google.auth.GoogleAuth({
            keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS, // pastikan path file JSON benar
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        });
        const authClient = await auth.getClient();
        const sheets = google.sheets({ version: 'v4', auth: authClient });

        const spreadsheetId = process.env.SHEET_ID;
        // Gunakan nama sheet "PRICE LIST STOCK LIST" dengan range yang sesuai
        const range = 'PRICE LIST STOCK LIST!A1:Z';

        const result = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });

        const rows = result.data.values;
        console.log("Rows from Google Sheets:", rows);
        if (!rows || rows.length === 0) {
            return res.status(404).json({ success: false, message: 'No data found in sheet' });
        }

        // Mapping header dari Google Sheets ke field schema
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

        // Ambil header (baris pertama) dan lakukan trim agar konsisten
        const header = rows[0].map(col => col.trim());
        // Buat mapping header sesuai field model
        const headerMapping = header.map(col => mapping[col] || col);

        // Mapping setiap baris data ke objek dengan key sesuai headerMapping
        const data = rows.slice(1).map(row => {
            let obj = {};
            headerMapping.forEach((key, index) => {
                obj[key] = row[index] ? row[index].trim() : "";
            });
            // Konversi field numerik agar tersimpan sebagai Number
            obj.no = Number(obj.no) || 0;
            obj.hargaJual = Number(obj.hargaJual) || 0;
            obj.upsale = Number(obj.upsale) || 0;
            obj.hargaNet = Number(obj.hargaNet) || 0;
            obj.cost = Number(obj.cost) || 0;
            return obj;
        });

        // Masukkan data ke MongoDB dengan insertMany
        await SheetImport.insertMany(data);

        return res.status(200).json({ success: true, message: 'Data imported successfully', data });
    } catch (error) {
        console.error("Error importing data: ", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
