import { v2 as cloudinary } from 'cloudinary'
import productModel from '../models/productModel.js';



//function for add product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const image = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            image.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        )



        // console.log(name, description, price, category, subCategory, sizes, bestseller);
        console.log(imagesUrl);

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        }

        console.log(productData);

        const product = new productModel(productData);

        await product.save();


        res.json({ success: true, message: 'Product Added' })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
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
        const products = await productModel.find({});
        res.json({ success: true, products });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
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