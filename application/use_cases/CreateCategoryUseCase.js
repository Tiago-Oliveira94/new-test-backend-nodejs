const { BadRequestError, AlreadyExistsError } = require('../../infrastructure/webserver/errors')
const categoryJoiSchema = require('../validation/categoryJoiSchema')

class CreateCategoryUseCase {
    constructor({ categoryRepository }) {
        this.categoryRepository = categoryRepository
    }

    async execute(category) {
        const { error, value } = categoryJoiSchema.validate(category)
        if (error) {
            throw new BadRequestError(error)
        }

        const { title, ownerID } = value
        return this.categoryRepository.findByProperty({ title, ownerID }).then(async (categoryWithTitle) => {
            if (categoryWithTitle.length) {
                throw new AlreadyExistsError(`category with title ${title} already exist for owner ${ownerID}!`)
            }
            else await this.categoryRepository.create(value)
        })
    }
}

module.exports = CreateCategoryUseCase