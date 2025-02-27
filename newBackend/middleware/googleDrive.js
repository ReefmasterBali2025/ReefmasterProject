import { google } from "googleapis";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// 🔹 Autentikasi Google Drive API
const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: ["https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({ version: "v3", auth });

// 🔹 Fungsi untuk mengupload file ke Google Drive
export const uploadToGoogleDrive = async (file) => {
    try {
        const response = await drive.files.create({
            requestBody: {
                name: file.originalname,
                parents: [process.env.GOOGLE_DRIVE_FOLDER_ID], // 📂 ID Folder tujuan di Google Drive
            },
            media: {
                mimeType: file.mimetype,
                body: fs.createReadStream(file.path),
            },
        });

        // 🔥 Set file menjadi "public" agar bisa diakses
        await drive.permissions.create({
            fileId: response.data.id,
            requestBody: {
                role: "reader",
                type: "anyone",
            },
        });

        // 🔥 Dapatkan URL publik Google Drive
        const fileUrl = `https://drive.google.com/thumbnail?id=${response.data.id}`;

        // 🔥 Hapus file sementara di server
        fs.unlinkSync(file.path);

        return fileUrl;
    } catch (error) {
        console.error("❌ Error uploading to Google Drive:", error);
        throw new Error("Failed to upload file to Google Drive");
    }
};
