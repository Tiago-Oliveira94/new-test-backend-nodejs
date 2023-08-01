const UpdateCategoryUseCase = require('../use_cases/UpdateCategoryUseCase')

class CategoryRepositoryStub {
    update() { }
    findByProperty() { }
}

class SQSProducerStub {
    sendMessage() { }
}

describe('UpdateCategoryUseCase: ', () => {
    let updateCategory
    const categoryRepository = new CategoryRepositoryStub()
    const sqsProducer = new SQSProducerStub()

    const params = {
        title: 'title for test',
        description: 'description for test',
        ownerID: 'id'
    }

    const findByPropertyResponse = [{
        _id: 'id',
        title: 'title for test',
        description: 'description for test',
        ownerID: 'id'
    }]

    const id = {
        _id: 'id'
    }

    beforeAll(() => {
        jest.spyOn(categoryRepository, 'update').mockResolvedValue(id)
        jest.spyOn(categoryRepository, 'findByProperty').mockResolvedValue(findByPropertyResponse)
        jest.spyOn(sqsProducer, 'sendMessage').mockResolvedValue(undefined)
    })

    beforeEach(() => {
        updateCategory = new UpdateCategoryUseCase({ categoryRepository, sqsProducer })
    })

    test('Should call CategoryRepository with a valid input', async () => {
        const spy = jest.spyOn(categoryRepository, 'update')

        await updateCategory.execute(id._id, params)

        expect(spy).toHaveBeenCalledTimes(1)
    })

    test('Should throw if failed to create', async () => {
        jest.spyOn(categoryRepository, 'update').mockRejectedValueOnce(new Error())

        const promise = updateCategory.execute(id._id, params)

        await expect(promise).rejects.toThrow()
    })

    test('Should call SQSProducer with a valid input', async () => {
        const spy = jest.spyOn(sqsProducer, 'sendMessage')

        await updateCategory.execute(id._id, params)

        expect(spy).toHaveBeenCalledTimes(1)
    })

    test('Should throw if failed to send a message', async () => {
        jest.spyOn(sqsProducer, 'sendMessage').mockRejectedValueOnce(new Error())

        const promise = updateCategory.execute(id._id, params)

        await expect(promise).rejects.toThrow()
    })
})
