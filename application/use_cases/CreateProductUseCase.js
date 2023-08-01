const { BadRequestError, AlreadyExistsError } = require('../../infrastructure/webserver/errors')
const productJoiSchema = require('../validation/productJoiSchema')

class CreateProductUseCase {
    constructor({ productRepository, categoryRepository, sqsProducer }) {
        this.productRepository = productRepository
        this.categoryRepository = categoryRepository
        this.sqsProducer = sqsProducer
    }

    async execute(product) {
        const { error, value } = productJoiSchema.validate(product)
        if (error) {
            throw new BadRequestError(error)
        }

        const { title, ownerID, category } = value
        const validCategory = await this.categoryRepository.findByProperty({ _id: category, ownerID })

        if (validCategory.length) {
            return this.productRepository.findByProperty({ title, ownerID }).then(async (productWithTitle) => {
                if (productWithTitle.length) {
                    throw new AlreadyExistsError(`product with title ${title} already exist for owner ${ownerID}!`)
                }
                const result = await this.productRepository.create(value).then(async (product) => {
                    await this.sqsProducer.sendMessage(product.ownerID)
                })

                return result
            })
        }
        throw new BadRequestError('Invalid Category')
    }
}

module.exports = CreateProductUseCase