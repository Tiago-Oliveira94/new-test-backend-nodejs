const CategoryController = require('../../adapters/http/controllers/CategoryController')
const ProductController = require('../../adapters/http/controllers/ProductController')
const {
    createCategoryUsecase,
    updateCategoryUsecase,
    createProductUsecase,
    updateProductUsecase,
    deleteProductUsecase,
    deleteCategoryUsecase
} = require('./UseCases')

const categoryController = new CategoryController({
    createCategoryUsecase,
    updateCategoryUsecase,
    deleteCategoryUsecase
})

const productController = new ProductController({
    createProductUsecase,
    updateProductUsecase,
    deleteProductUsecase
})

module.exports = { categoryController, productController }