import multer from 'multer';

// 🔹 Konfigurasi Penyimpanan (Menyimpan di Memori)
const storage = multer.memoryStorage();

// 🔹 Konfigurasi Upload
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Maksimum 10MB per file
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

        // Cek apakah format file diperbolehkan
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error("❌ Format file tidak didukung! Gunakan JPG, PNG, atau WebP"), false);
        }

        console.log("📸 File yang diterima oleh multer:", file.originalname);
        cb(null, true);
    }
});

export default upload;
