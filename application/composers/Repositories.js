const CategoryRepository = require('../../infrastructure/repositories/CategoryRepository')
const ProductRepository = require('../../infrastructure/repositories/ProductRepository')

const categoryRepository = new CategoryRepository()
const productRepository = new ProductRepository()

module.exports = { categoryRepository, productRepository }
