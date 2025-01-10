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

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imagesUrl = Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
            })
        )

        // console.log(name, description, price, category, subCategory, sizes, bestseller);
        // console.log(imagesUrl);

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

// function for list product
const listProduct = async (req, res) => {

};

// function for remove product
const removeProduct = async (req, res) => {

};

// function for single product info
const singleProduct = async (req, res) => {

};

export { addProduct, listProduct, removeProduct, singleProduct };