import { v2 as cloudinary } from 'cloudinary'
import productModel from '../models/productModel.js';
import OfferStockList from '../models/OfferStockListModel.js';
import { uploadToGoogleDrive } from '../middleware/googleDrive.js';
import { uploadToImgBB } from '../middleware/imgbb.js';



// ✅ Function untuk menambah produk
const addProduct = async (req, res) => {
    try {
        console.log("✅ Data Diterima di Backend:", req.body);
        console.log("✅ Files yang Dikirim:", req.files);

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
        } = req.body;

        if (!req.files || req.files.length === 0) {
            throw new Error("❌ Tidak ada gambar yang dikirim!");
        }

        // 🔹 Upload gambar ke ImgBB dan hanya menyimpan ke `link_image`
        let imageUrls = await Promise.all(req.files.map(async (file) => {
            console.log("🔄 Uploading file:", file.originalname);
            return await uploadToImgBB(file);
        }));

        console.log("✅ URL Gambar dari ImgBB:", imageUrls);

        // 🔹 Simpan data ke MongoDB (Gambar hanya masuk ke `link_image`)
        const newProduct = new OfferStockList({
            page_header,
            unique_key: Date.now().toString(),
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
            image_file_name: "",  // ❌ Kosongkan kolom ini
            image: "",             // ❌ Kosongkan kolom ini
            image_checker: "",     // ❌ Kosongkan kolom ini
            link_image: imageUrls.join(", "), // ✅ Simpan semua gambar hanya di `link_image`
        });

        await newProduct.save();

        res.status(201).json({ success: true, message: "Product added successfully!", data: newProduct });

    } catch (error) {
        console.error("❌ Error adding product:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Function untuk mengupdate produk
const updateProduct = async (req, res) => {
    try {
        const { id, name, price, category, bestseller } = req.body;

        const existingProduct = await productModel.findById(id);
        if (!existingProduct) {
            return res.json({ success: false, message: "Product not found" });
        }

        // Handle Upload Gambar Baru
        const image1 = req.files?.image1?.[0];
        const image2 = req.files?.image2?.[0];
        const image3 = req.files?.image3?.[0];
        const image4 = req.files?.image4?.[0];


        const newImages = [image1, image2, image3, image4].filter(Boolean);

        let imagesUrl = existingProduct.image; // Default gunakan gambar lama

        if (newImages.length > 0) {
            imagesUrl = await Promise.all(
                newImages.map(async (item) => {
                    let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                    return result.secure_url;
                })
            );
        }

        // Update data di MongoDB
        existingProduct.name = name;
        existingProduct.price = Number(price);
        existingProduct.category = category;
        existingProduct.bestseller = bestseller === "true";
        existingProduct.image = imagesUrl; // Simpan gambar yang baru atau yang lama jika tidak ada perubahan

        await existingProduct.save();

        res.json({ success: true, message: "Product Updated Successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
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

// function for remove product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Product removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
};  

const removeSelectedProduct = async (req, res) => {
    try {
        const { ids } = req.body;
        await productModel.deleteMany({ _id: { $in: ids } });
        res.json({ success: true, message: 'Selected products deleted' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const removeAllProduct = async (req, res) => {
    try {
        await productModel.deleteMany({});
        res.json({ success: true, message: 'All products deleted' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// function for single product info
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await productModel.findById(productId)
        res.json({ success: true, product })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
};

export { addProduct, listProducts, removeProduct, singleProduct, updateProduct, removeSelectedProduct, removeAllProduct };