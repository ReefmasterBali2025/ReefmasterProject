import mongoose from 'mongoose';

const PlasticSizeSchema = new mongoose.Schema({
    plastic_size: Number,
    diameter: Number
});

const PlasticSize = mongoose.models.PlasticSize || mongoose.model('Plastic Size', PlasticSizeSchema);
export default PlasticSize;
