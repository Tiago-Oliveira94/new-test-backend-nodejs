const { NotFoundError, BadRequestError } = require('../../infrastructure/webserver/errors')
const categoryJoiSchema = require('../validation/categoryJoiSchema')

class UpdateCategoryUseCase {
    constructor({ categoryRepository }) {
        this.categoryRepository = categoryRepository
    }

    async execute(categoryID, category) {
        const { error } = categoryJoiSchema.validate(category)
        if (error) {
            throw new BadRequestError(error)
        }

        const { title, description } = category

        const validCategory = await this.categoryRepository.findByProperty({ _id: categoryID })

        if (validCategory.length) {
            await this.categoryRepository.update({ categoryID, title, description })
        }
        else throw new NotFoundError(`category with id ${categoryID} not found!`)

    }
}

module.exports = UpdateCategoryUseCase