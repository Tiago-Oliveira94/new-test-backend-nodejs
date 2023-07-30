const { GenericMongoError, NotFoundError } = require('../../infrastructure/webserver/errors')
const productJoiSchema = require('../validation/productJoiSchema')

class DeleteCategoryUseCase {
    constructor(categoryRepository, productRepository) {
        this.categoryRepository = categoryRepository
        this.productRepository = productRepository
    }

    async execute(categoryID) {
        try {
            const validCategory = await this.categoryRepository.findByProperty({ categoryID })

            if (validCategory.length) {
                const productsToDelete = await this.productRepository.findByProperty({ category: categoryID })
                const productIds = productsToDelete.map(product => {
                    return product._id
                })
                await this.productRepository.deleteMany(productIds)
                return await this.categoryRepository.delete(categoryID)
            }

        } catch (error) {
            throw new GenericMongoError('Delete Category Failed')
        }
    }
}

module.exports = DeleteCategoryUseCase