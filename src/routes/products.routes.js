
import express from 'express'
const router= express.Router();

import { getAllProducts, getProductById, createProduct, deleteProduct, editProduct } from '../controllers/products.controller.js';
import { authentication } from '../middleware/authentication.js'

router.get('/products', getAllProducts);

router.get('/products/:id', getProductById);

router.post('/products/create', createProduct); 

router.delete('/products/:id', deleteProduct )

router.put('/products/:id', editProduct )


 

export default router;
