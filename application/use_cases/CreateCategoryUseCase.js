const { BadRequestError, AlreadyExistsError } = require('../../infrastructure/webserver/errors')
const categoryJoiSchema = require('../validation/categoryJoiSchema')

class CreateCategoryUseCase {
    constructor({ categoryRepository, sqsProducer }) {
        this.categoryRepository = categoryRepository
        this.sqsProducer = sqsProducer
    }

    async execute(category) {
        const { error, value } = categoryJoiSchema.validate(category)
        if (error) {
            throw new BadRequestError(error)
        }

        const { title, ownerID } = value
        await this.categoryRepository.findByProperty({ title, ownerID }).then(async (categoryWithTitle) => {
            if (categoryWithTitle.length) {
                throw new AlreadyExistsError(`category with title ${title} already exist for owner ${ownerID}!`)
            }
            const result = await this.categoryRepository.create(value).then((async (category) => {
                await this.sqsProducer.sendMessage(category.ownerID)
            }))

            return result
        })
    }
}

module.exports = CreateCategoryUseCase