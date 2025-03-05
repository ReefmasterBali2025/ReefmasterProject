import mongoose from "mongoose";



const priceListSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
    role: { type: String, required: true }
}, { minimize: false });

const priceListModel = mongoose.models.priceList || mongoose.model('priceList', priceListSchema);

export default priceListModel;