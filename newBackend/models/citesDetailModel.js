import mongoose from 'mongoose';

const CitesDetailSchema = new mongoose.Schema({
    initial_01: String,
    page_header: { type: String },
    key: { type: String, unique: true },
    no: String,
    timestamps: String,
    key_cites: String,
    cites_number: String,
    cites_category: String,
    section_cites_detail: String,
    scientific_name_key: String,
    scientific_name: String,
    quantity: Number
});

const CitesDetail = mongoose.models.CitesDetail || mongoose.model('Cites Detail', CitesDetailSchema);
export default CitesDetail;
