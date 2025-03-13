import mongoose from "mongoose";

const CombineSchema = new mongoose.Schema({
    uniqueId: { type: String, unique: true },
    appsheetCode: String,
    code: String,
    cites: String,
    latinName: String,
    commonName: String,
    size: String,
    actualStock: Number,
    type: String,
    link_image: Array,
    price: Number,
    coralType: String,
    category: String,
    subType: String,
    coralLocation: String,

}, { timestamps: true });

const Combine = mongoose.models.Combine || mongoose.model("Combine Offer Stock List and WYSIWYG", CombineSchema);
export default Combine