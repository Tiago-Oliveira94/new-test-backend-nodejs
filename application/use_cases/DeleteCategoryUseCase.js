const { GenericMongoError, NotFoundError } = require('../../infrastructure/webserver/errors')
const productJoiSchema = require('../validation/productJoiSchema')

class DeleteCategoryUseCase {
    constructor({ categoryRepository, productRepository, sqsProducer }) {
        this.categoryRepository = categoryRepository
        this.productRepository = productRepository
        this.sqsProducer = sqsProducer
    }

    async execute(categoryID) {
        try {
            const validCategory = await this.categoryRepository.findByProperty({ _id: categoryID })

            if (validCategory.length) {
                const productsToDelete = await this.productRepository.findByProperty({ category: categoryID })
                const productIds = productsToDelete.map(product => {
                    return product._id
                })
                await this.productRepository.deleteMany(productIds)
                const result = await this.categoryRepository.delete(categoryID).then(async () => {
                    await this.sqsProducer.sendMessage(validCategory[0].ownerID)
                })

                return result
            }

            else throw new NotFoundError('Category to delete not found!')

        } catch (error) {
            throw new GenericMongoError('Delete Category Failed')
        }
    }
}

module.exports = DeleteCategoryUseCase