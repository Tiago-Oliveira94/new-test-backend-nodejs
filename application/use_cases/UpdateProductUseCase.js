const { BadRequestError } = require('../../infrastructure/webserver/errors')
const productJoiSchema = require('../validation/productJoiSchema')

class UpdateProductUseCase {
    constructor({ productRepository, categoryRepository }) {
        this.productRepository = productRepository
        this.categoryRepository = categoryRepository
    }

    async execute(productID, product) {
        const { error } = productJoiSchema.validate(product)
        if (error) {
            throw new BadRequestError(error)
        }

        const { title, description, price, category, ownerID } = product

        const validCategory = await this.categoryRepository.findByProperty({ _id: category, ownerID })

        if (validCategory.length) {
            await this.productRepository.update({ productID, title, description, price, category })
        }
        else throw new BadRequestError('Invalid Category')
    }
}

module.exports = UpdateProductUseCase