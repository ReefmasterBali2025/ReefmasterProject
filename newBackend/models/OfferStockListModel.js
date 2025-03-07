import mongoose from 'mongoose';

const OfferStockListSchema = new mongoose.Schema({
    page_header: String,
    unique_key: { type: Number, unique: true }, // Biar gak duplikat
    appsheet_code: String,
    cites: String,
    alias_cites_1: String,
    code: String,
    latin_name: String,
    common_name: String,
    size: String,
    stock: Number,
    actual_stock: Number,
    available_stock: Number,
    value: String,
    plastic_size: Number,
    height_cm: Number,
    price: String,
    system: String,
    image_file_name: String,
    image: String, // 🔥 Simpan link gambar Google Drive
    image_checker: String,
    link_image: Array
});

const OfferStockList = mongoose.models.OfferStockList || mongoose.model('Offer Stock List', OfferStockListSchema);
export default OfferStockList;
