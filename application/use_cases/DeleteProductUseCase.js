const { GenericMongoError, NotFoundError } = require('../../infrastructure/webserver/errors')
const productJoiSchema = require('../validation/productJoiSchema')

class DeleteProductUseCase {
    constructor({ productRepository, sqsProducer }) {
        this.productRepository = productRepository
        this.sqsProducer = sqsProducer
    }

    async execute(productId) {
        try {
            const validProduct = await this.productRepository.findByProperty({ _id: productId })

            if (validProduct.length) {
                const result = await this.productRepository.delete(validProduct[0]._id)
                await this.sqsProducer.sendMessage(validProduct[0].ownerID)

                return result
            }

        } catch (error) {
            throw new GenericMongoError('Delete Product Failed')
        }
    }
}

module.exports = DeleteProductUseCase