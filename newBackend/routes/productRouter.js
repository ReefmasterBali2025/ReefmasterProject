import express from 'express'
import { addProduct, listProduct, removeProduct, singleProduct } from '../controller/productController.js'
import upload from '../middleware/multer.js';


const productRouter = express.Router();

productRouter.post('/add', upload.fields({ name: 'image1', maxcount: 1 }, { name: 'image2', maxcount: 2 }, { name: 'image3', maxcount: 3 }, { name: 'image4', maxcount: 4 }), addProduct);
productRouter.post('/remove', removeProduct);
productRouter.post('/single', singleProduct);
productRouter.get('/list', listProduct);

export default productRouter;