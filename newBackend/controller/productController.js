import { v2 as cloudinary } from 'cloudinary'
import productModel from '../models/productModel.js';
import OfferStockList from '../models/OfferStockListModel.js';
import { uploadToGoogleDrive } from '../middleware/googleDrive.js';
import OfferWysiwyg from '../models/OfferWYSIWYGModel.js';
// import { uploadToImgBB } from '../middleware/imgbb.js';



// ✅ Function untuk menambah produk
const addProduct = async (req, res) => {
    try {
        console.log("✅ Data Diterima di Backend:", req.body);

        // 🔍 Cari unique_key terbesar yang sudah ada
        const lastProduct = await OfferStockList.findOne().sort({ unique_key: -1 });

        // 🔢 Jika belum ada data, mulai dari 1, jika ada, tambahkan 1 dari unique_key terbesar
        const nextUniqueKey = lastProduct ? lastProduct.unique_key + 1 : 1;

        const {
            page_header,
            appsheet_code,
            cites,
            alias_cites_1,
            code,
            latin_name,
            common_name,
            size,
            stock,
            actual_stock,
            available_stock,
            value,
            plastic_size,
            height_cm,
            price,
            system,
            link_image
        } = req.body;

        // 🔹 Simpan data ke MongoDB tanpa upload gambar
        const newProduct = new OfferStockList({
            page_header,
            unique_key: nextUniqueKey, // ✅ Gunakan unique_key yang telah dihitung
            appsheet_code,
            cites,
            alias_cites_1,
            code,
            latin_name,
            common_name,
            size,
            stock: parseInt(stock) || 0,
            actual_stock: parseInt(actual_stock) || 0,
            available_stock: parseInt(available_stock) || 0,
            value: parseFloat(value) || 0,
            plastic_size,
            height_cm: parseInt(height_cm) || 0,
            price: parseFloat(price) || 0,
            system,
            image: "",
            image_file_name: "",
            image_checker: "",
            link_image
        });

        await newProduct.save();

        console.log(`✅ Product Added with unique_key: ${nextUniqueKey}`);

        res.json({ success: true, message: 'Product Added', unique_key: nextUniqueKey });

    } catch (error) {
        console.error("❌ Error adding product:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Function untuk mengupdate produk
const updateProduct = async (req, res) => {
    try {
        const { _id, ...updatedData } = req.body;
        const existingProduct = await OfferStockList.findById(_id);

        if (!existingProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // ✅ Update produk di MongoDB
        await OfferStockList.updateOne({ _id }, updatedData);
        res.json({ success: true, message: "Product updated successfully" });
    } catch (error) {
        console.error("❌ Error updating product:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// function for list product
const listProducts = async (req, res) => {

    try {
        const products = await OfferStockList.find({});
        res.json({ success: true, products });
    } catch (error) {
        console.error("❌ Error fetching products:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};



const removeProduct = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ success: false, message: "Product ID is required" });
        }

        const deletedProduct = await OfferStockList.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, message: "Product removed", deletedId: id });

    } catch (error) {
        console.error("❌ Error deleting product:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const removeSelectedProduct = async (req, res) => {
    try {
        const { ids } = req.body;
        await OfferStockList.deleteMany({ _id: { $in: ids } });
        res.json({ success: true, message: 'Selected products deleted' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const removeAllProduct = async (req, res) => {
    try {
        await OfferStockList.deleteMany({});
        res.json({ success: true, message: 'All products deleted' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// function for single product info
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await OfferStockList.findById(productId)
        res.json({ success: true, product })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
};

// For WSYIWYG Only
const addProductWysiwyg = async (req, res) => {
    try {
        console.log("✅ Data Diterima di Backend:", req.body);

        // 🔍 Cari unique_key terbesar yang sudah ada
        const lastProductWysiwyg = await OfferWysiwyg.findOne().sort({ uniqueId: -1 });

        // 🔢 Buat Unique ID otomatis
        const nextUniqueKeyWysiwyg = lastProductWysiwyg ? parseInt(lastProductWysiwyg.uniqueId) + 1 : 1;

        // ⏳ Buat timestamp saat produk ditambahkan
        const now = new Date();
        const formattedDate = now.toLocaleString("id-ID", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        });

        const {
            page_header,
            appsheet_code,
            uniqueId,
            line,
            aquarium,
            number,
            common_name,
            size,
            plastic_size,
            height_cm,
            price, // 🔥 Harga tetap dalam format angka dari frontend
            individualDiscount,
            citesCombo,
            citesScleractinianFragmen,
            exclusiveFor
        } = req.body;

        // ✅ Konversi harga ke format "$xx.xx"
        const formattedPrice = `$${parseFloat(price).toFixed(2)}`;

        // 🔹 Simpan data ke MongoDB
        const newProductWysiwyg = new OfferWysiwyg({
            pageHeader: page_header,
            date: formattedDate, // ⏳ Simpan waktu saat produk ditambahkan
            uniqueId, // ✅ Simpan uniqueId sebagai string
            appsheetCode: appsheet_code,
            line,
            aquarium,
            number,
            commonName: common_name,
            size,
            plasticSize: plastic_size,
            heightCm: parseInt(height_cm) || 0,
            price: formattedPrice, // ✅ Simpan harga dalam format "$xx.xx"
            individualDiscount,
            citesCombo,
            citesScleractinianFragmen,
            exclusiveFor
        });

        await newProductWysiwyg.save();

        console.log(`✅ Product Added with uniqueId: ${nextUniqueKeyWysiwyg} at ${formattedDate} with price: ${formattedPrice}`);

        res.json({ success: true, message: 'Product Added' });

    } catch (error) {
        console.error("❌ Error adding product:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};


// ✅ Function untuk mengupdate produk
const updateProductWysiwyg = async (req, res) => {
    try {
        const { _id, ...updatedData } = req.body;
        const existingProductWysiwyg = await OfferWysiwyg.findById(_id);

        if (!existingProductWysiwyg) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // ✅ Update produk di MongoDB
        await OfferWysiwyg.updateOne({ _id }, updatedData);
        res.json({ success: true, message: "Product updated successfully" });
    } catch (error) {
        console.error("❌ Error updating product:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const listWysiwygProducts = async (req, res) => {
    try {
        const wysiwygProducts = await OfferWysiwyg.find({});
        res.json({ success: true, wysiwygProducts });
    } catch (error) {
        console.error("❌ Error fetching products:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}


// function for remove product
const removeProductWysiwyg = async (req, res) => {
    try {
        await OfferWysiwyg.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Product removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
};

const removeSelectedProductWysiwyg = async (req, res) => {
    try {
        const { ids } = req.body;
        await OfferWysiwyg.deleteMany({ _id: { $in: ids } });
        res.json({ success: true, message: 'Selected products deleted' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const removeAllProductWysiwyg = async (req, res) => {
    try {
        await OfferWysiwyg.deleteMany({});
        res.json({ success: true, message: 'All products deleted' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// function for single product info
const singleProductWysiwyg = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await OfferWysiwyg.findById(productId)
        res.json({ success: true, product })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
};

// End Wysiwyg Only



export { addProduct, listProducts, removeProduct, singleProduct, updateProduct, removeSelectedProduct, removeAllProduct, addProductWysiwyg, listWysiwygProducts, removeAllProductWysiwyg, removeProductWysiwyg, removeSelectedProductWysiwyg, singleProductWysiwyg, updateProductWysiwyg };