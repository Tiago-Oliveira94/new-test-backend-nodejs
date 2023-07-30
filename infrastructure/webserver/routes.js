const express = require('express');
const router = express.Router();
const { categoryController, productController } = require('../../application/composers/Controllers');

router.post('/category', categoryController.createCategory)
router.put('/category/:id', categoryController.updateCategory)
router.delete('/category/:id', categoryController.deleteCategory)

router.post('/product', productController.createProduct)
router.put('/product/:id', productController.updateProduct)
router.delete('/product/:id', productController.deleteProduct)

module.exports = router;