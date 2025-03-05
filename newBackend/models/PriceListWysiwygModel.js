import mongoose from 'mongoose';

const priceListWysiwygSchema = new mongoose.Schema({
    no: { type: Number },
    wysiwygUniqueKey: { type: String, unique: true },
    code: { type: String },
    citesI: { type: String },
    citesII: { type: String },
    citesIII: { type: String },
    citesIV: { type: String },
    citesV: { type: String },
    citesVI: { type: String },
    field1Category: { type: String },  // untuk kolom "1"
    field2Genus: { type: String },  // untuk kolom "2"
    field3Species: { type: String },  // untuk kolom "3"
    field4: { type: String },  // untuk kolom "4"
    field5Color: { type: String },  // untuk kolom "5"
    field6Grade: { type: String },  // untuk kolom "6"
    field7Size: { type: String },  // untuk kolom "7"
    scientificName: { type: String },
    commonName: { type: String },
    localName: { type: String },
    grade: { type: String },
    size: { type: String },
    // 🔹 Bisa menyimpan baik Number maupun String
    hargaJual: { type: mongoose.Schema.Types.Mixed },
    upsale: { type: mongoose.Schema.Types.Mixed },
    hargaGross: { type: mongoose.Schema.Types.Mixed },
    cost: { type: mongoose.Schema.Types.Mixed },
    group: { type: String },
    aliasCitesWild: { type: String },
}, { timestamps: true });

const priceListWysiwyg = mongoose.models.priceListWysiwyg || mongoose.model('PRICE LIST WYSIWYG', priceListWysiwygSchema);
export default priceListWysiwyg;
