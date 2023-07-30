const { BadRequestError, AlreadyExistsError } = require('../../infrastructure/webserver/errors')
const productJoiSchema = require('../validation/productJoiSchema')

class CreateProductUseCase {
    constructor(productRepository, categoryRepository) {
        this.productRepository = productRepository
        this.categoryRepository = categoryRepository
    }

    async execute(product) {
        const { error, value } = productJoiSchema.validate(product)
        if (error) {
            throw new BadRequestError(error)
        }

        const { title, ownerID, category } = value
        const validCategory = await this.categoryRepository.findByProperty({ _id: category })

        if (validCategory.length) {
            return this.productRepository.findByProperty({ title, ownerID }).then(async (productWithTitle) => {
                if (productWithTitle.length) {
                    throw new AlreadyExistsError(`product with title ${title} already exist for owner ${ownerID}!`)
                }
                await this.productRepository.create(value)
            })
        }
        throw new BadRequestError('Invalid Category')
    }
}

module.exports = CreateProductUseCase