const { NotFoundError, BadRequestError } = require('../../infrastructure/webserver/errors')
const categoryJoiSchema = require('../validation/categoryJoiSchema')

class UpdateCategoryUseCase {
    constructor({ categoryRepository, sqsProducer }) {
        this.categoryRepository = categoryRepository
        this.sqsProducer = sqsProducer
    }

    async execute(categoryID, category) {
        const { error } = categoryJoiSchema.validate(category)
        if (error) {
            throw new BadRequestError(error)
        }

        const { title, description, ownerID } = category

        const validCategory = await this.categoryRepository.findByProperty({ _id: categoryID, ownerID: ownerID })

        if (validCategory.length) {
            const result = await this.categoryRepository.update({ categoryID, title, description }).then(async () => {
                await this.sqsProducer.sendMessage(ownerID)
            })

            return result
        }
        else throw new NotFoundError(`category with id ${categoryID} not found for owner ${ownerID}!`)



    }
}

module.exports = UpdateCategoryUseCase