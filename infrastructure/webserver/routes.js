const express = require('express');
const router = express.Router();
const CategoryController = require('../../adapters/http/controllers/CategoryController');
const ProductController = require('../../adapters/http/controllers/ProductController');

router.post('/category', CategoryController().createCategory)
router.post('/product', ProductController().createProduct)

module.exports = router;