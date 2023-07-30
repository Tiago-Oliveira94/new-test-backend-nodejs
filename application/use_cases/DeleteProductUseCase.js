const { GenericMongoError, NotFoundError } = require('../../infrastructure/webserver/errors')
const productJoiSchema = require('../validation/productJoiSchema')

class DeleteProductUseCase {
    constructor(productRepository) {
        this.productRepository = productRepository
    }

    async execute(productId) {
        try {
            const validId = await this.productRepository.findByProperty({ productId })

            if (validId.length) {
                return await this.productRepository.delete(validId)
            }

        } catch (error) {
            throw new GenericMongoError('Delete Product Failed')
        }
    }
}

module.exports = DeleteProductUseCase