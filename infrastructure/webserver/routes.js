const express = require('express');
const router = express.Router();
const CategoryController = require('../../adapters/http/controllers/CategoryController');
const ProductController = require('../../adapters/http/controllers/ProductController');

router.post('/category', CategoryController().createCategory)
router.put('/category/:id', CategoryController().updateCategory)
router.delete('/category/:id', CategoryController().deleteCategory)

router.post('/product', ProductController().createProduct)
router.put('/product/:id', ProductController().updateProduct)
router.delete('/product/:id', ProductController().deleteProduct)

module.exports = router;