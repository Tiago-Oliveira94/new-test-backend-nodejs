const CreateCategoryUseCase = require('../use_cases/CreateCategoryUseCase')
const { sqsProducer } = require('./Queue')
const { categoryRepository, productRepository, storageRepository } = require('./Repositories')
const UpdateCategoryUseCase = require('../use_cases/UpdateCategoryUseCase')
const CreateProductUseCase = require('../use_cases/CreateProductUseCase')
const UpdateProductUseCase = require('../use_cases/UpdateProductUseCase')
const DeleteProductUseCase = require('../use_cases/DeleteProductUseCase')
const DeleteCategoryUseCase = require('../use_cases/DeleteCategoryUseCase')
const BuildCatalogUseCase = require('../use_cases/BuildCatalogUseCase')

const createCategoryUsecase = new CreateCategoryUseCase({
    categoryRepository: categoryRepository,
    sqsProducer: sqsProducer
})
const updateCategoryUsecase = new UpdateCategoryUseCase({
    categoryRepository: categoryRepository,
    sqsProducer: sqsProducer
})
const createProductUsecase = new CreateProductUseCase({
    productRepository: productRepository,
    categoryRepository: categoryRepository,
    sqsProducer: sqsProducer
})
const updateProductUsecase = new UpdateProductUseCase({
    productRepository: productRepository,
    categoryRepository: categoryRepository,
    sqsProducer: sqsProducer
})
const deleteProductUsecase = new DeleteProductUseCase({
    productRepository: productRepository,
    sqsProducer: sqsProducer
})
const deleteCategoryUsecase = new DeleteCategoryUseCase({
    categoryRepository: categoryRepository,
    productRepository: productRepository,
    sqsProducer: sqsProducer
})

const buildCatalogUsecase = new BuildCatalogUseCase({
    storageRepository: storageRepository,
    categoryRepository: categoryRepository,
    productRepository: productRepository
})

module.exports = { createCategoryUsecase, updateCategoryUsecase, createProductUsecase, updateProductUsecase, deleteProductUsecase, deleteCategoryUsecase, buildCatalogUsecase }
