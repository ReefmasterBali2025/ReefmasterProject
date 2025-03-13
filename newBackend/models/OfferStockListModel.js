import mongoose from 'mongoose';

const OfferStockListSchema = new mongoose.Schema({
    pageHeader: String,
    unique_key: { type: Number, unique: true }, // Biar gak duplikat
    appsheetCode: String,
    cites: String,
    aliasCites1: String,
    code: String,
    latinName: String,
    commonName: String,
    size: String,
    stock: Number,
    actual_stock: Number,
    available_stock: Number,
    value: String,
    plasticSize: Number,
    heightCm: Number,
    price: String,
    system: String,
    image_file_name: String,
    image: String, // 🔥 Simpan link gambar Google Drive
    image_checker: String,
    link_image: Array
});

const OfferStockList = mongoose.models.OfferStockList || mongoose.model('Offer Stock List', OfferStockListSchema);
export default OfferStockList;
