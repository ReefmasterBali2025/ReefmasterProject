import express from 'express'
import { addProduct, listProducts, removeProduct, singleProduct, updateProduct, removeSelectedProduct, removeAllProduct, addProductWysiwyg, listWysiwygProducts, removeAllProductWysiwyg, removeProductWysiwyg, removeSelectedProductWysiwyg, singleProductWysiwyg, updateProductWysiwyg } from '../controller/productController.js'
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';


const productRouter = express.Router();


productRouter.post("/add", addProduct);

productRouter.post("/addWysiwyg", addProductWysiwyg);

// ✅ Endpoint untuk mengupdate produk (termasuk gambar)
productRouter.post('/update',
    adminAuth,
    updateProduct
);

// ✅ Endpoint untuk menghapus produk
productRouter.post('/remove', adminAuth, removeProduct);

// ✅ Endpoint untuk menghapus produk wysiwyg
productRouter.post('/remove-wysiwyg', adminAuth, removeProductWysiwyg);


// ✅ Endpoint untuk menghapus beberapa produk
productRouter.post('/remove-multiple', adminAuth, removeSelectedProduct)

// ✅ Endpoint untuk menghapus beberapa produk wysiwyg
productRouter.post('/remove-multiple-wysiwyg', adminAuth, removeSelectedProductWysiwyg)

// ✅ Endpoint untuk menghapus semua produk sekaligus
productRouter.post('/remove-all', adminAuth, removeAllProduct)

// ✅ Endpoint untuk menghapus semua produk wysiwyg sekaligus
productRouter.post('/remove-all-wysiwyg', adminAuth, removeAllProductWysiwyg)

// ✅ Endpoint untuk mendapatkan detail satu produk
productRouter.post('/single', singleProduct);

// ✅ Endpoint untuk mendapatkan detail satu produk wysiwyg
productRouter.post('/single-wysiwyg', singleProductWysiwyg);

// ✅ Endpoint untuk mendapatkan daftar produk
productRouter.get('/list', listProducts);

productRouter.get('/listWysiwyg', listWysiwygProducts);

export default productRouter;