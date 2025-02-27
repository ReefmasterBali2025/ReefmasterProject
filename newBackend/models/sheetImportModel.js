import mongoose from 'mongoose';

const sheetImportSchema = new mongoose.Schema({
    no: { type: Number },
    stockListUniqueKey: { type: String, unique: true },
    code: { type: String },
    citesI: { type: String },
    citesII: { type: String },
    citesIII: { type: String },
    citesIV: { type: String },
    citesV: { type: String },
    citesVI: { type: String },
    field1: { type: String },  // untuk kolom "1"
    field2: { type: String },  // untuk kolom "2"
    field3: { type: String },  // untuk kolom "3"
    field4: { type: String },  // untuk kolom "4"
    field5: { type: String },  // untuk kolom "5"
    field6: { type: String },  // untuk kolom "6"
    field7: { type: String },  // untuk kolom "7"
    scientificName: { type: String },
    commonName: { type: String },
    localName: { type: String },
    grade: { type: String },
    size: { type: String },
    hargaJual: { type: Number },
    upsale: { type: Number },
    hargaNet: { type: Number },
    cost: { type: Number },
    group: { type: String },
    aliasCitesWild: { type: String },
}, { timestamps: true });

const SheetImport = mongoose.models.SheetImport || mongoose.model('SheetImport', sheetImportSchema);
export default SheetImport;
