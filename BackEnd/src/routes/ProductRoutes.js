const express = require('express');
const {Router} = express;
const router = Router();

const {GetAllProducts , GetProduct , CreateProduct , UpdateProduct , DeleteProduct} = require('../controllers/ProductController');


router.get('/api/product' , GetAllProducts);
router.get('/api/product/:id', GetProduct);
router.post('/api/product' , CreateProduct);
router.put('/api/product/:id' , UpdateProduct);
router.delete('/api/product/:id' , DeleteProduct);

module.exports = router;