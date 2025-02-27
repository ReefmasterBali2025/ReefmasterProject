import express from 'express'
import { addProduct, listProducts, removeProduct, singleProduct, updateProduct, removeSelectedProduct, removeAllProduct } from '../controller/productController.js'
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';


const productRouter = express.Router();


productRouter.post("/add", upload.array("image", 4), addProduct);

// ✅ Endpoint untuk mengupdate produk (termasuk gambar)
productRouter.post('/update',
    adminAuth,
    upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }, { name: 'image4', maxCount: 1 },]),
    updateProduct
);

// ✅ Endpoint untuk menghapus produk
productRouter.post('/remove', adminAuth, removeProduct);


// ✅ Endpoint untuk menghapus beberapa produk
productRouter.post('/remove-multiple', adminAuth, removeSelectedProduct)

// ✅ Endpoint untuk menghapus semua produk sekaligus
productRouter.post('/remove-all', adminAuth, removeAllProduct)

// ✅ Endpoint untuk mendapatkan detail satu produk
productRouter.post('/single', singleProduct);

// ✅ Endpoint untuk mendapatkan daftar produk
productRouter.get('/list', listProducts);

export default productRouter;