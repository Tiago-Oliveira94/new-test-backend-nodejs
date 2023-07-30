const CreateCategoryUseCase = require('../use_cases/CreateCategoryUseCase')
// import { sqsQueueGateway } from './gateway.composer'
const { categoryRepository, productRepository } = require('./Repositories')
const UpdateCategoryUseCase = require('../use_cases/UpdateCategoryUseCase')
const CreateProductUseCase = require('../use_cases/CreateProductUseCase')
const UpdateProductUseCase = require('../use_cases/UpdateProductUseCase')
const DeleteProductUseCase = require('../use_cases/DeleteProductUseCase')
const DeleteCategoryUseCase = require('../use_cases/DeleteCategoryUseCase')

const createCategoryUsecase = new CreateCategoryUseCase({
    categoryRepository: categoryRepository,
    // queueGateway: sqsQueueGateway
})
const updateCategoryUsecase = new UpdateCategoryUseCase({
    categoryRepository: categoryRepository,
    // queueGateway: sqsQueueGateway
})
const createProductUsecase = new CreateProductUseCase({
    productRepository: productRepository,
    categoryRepository: categoryRepository
    // queueGateway: sqsQueueGateway
})
const updateProductUsecase = new UpdateProductUseCase({
    productRepository: productRepository,
    categoryRepository: categoryRepository,
    // queueGateway: sqsQueueGateway
})
const deleteProductUsecase = new DeleteProductUseCase({
    productRepository: productRepository,
    // queueGateway: sqsQueueGateway
})
const deleteCategoryUsecase = new DeleteCategoryUseCase({
    categoryRepository: categoryRepository,
    productRepository: productRepository,
    // queueGateway: sqsQueueGateway
})

module.exports = { createCategoryUsecase, updateCategoryUsecase, createProductUsecase, updateProductUsecase, deleteProductUsecase, deleteCategoryUsecase }
