const CreateCategoryUseCase = require('../use_cases/CreateCategoryUseCase')

class CategoryRepositoryStub {
    create() { }
    findByProperty() { }
}

class SQSProducerStub {
    sendMessage() { }
}

describe('CreateCategoryUseCase: ', () => {
    let createCategory
    const categoryRepository = new CategoryRepositoryStub()
    const sqsProducer = new SQSProducerStub()

    const params = {
        title: 'title for test',
        description: 'description for test',
        ownerID: 'id'
    }

    const id = {
        _id: 'id'
    }

    beforeAll(() => {
        jest.spyOn(categoryRepository, 'create').mockResolvedValue(id)
        jest.spyOn(categoryRepository, 'findByProperty').mockResolvedValue(id)
        jest.spyOn(sqsProducer, 'sendMessage').mockResolvedValue(undefined)
    })

    beforeEach(() => {
        createCategory = new CreateCategoryUseCase({ categoryRepository, sqsProducer })
    })

    test('Should call CategoryRepository with a valid input', async () => {
        const spy = jest.spyOn(categoryRepository, 'create')

        await createCategory.execute(params)

        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith({ title: params.title, description: params.description, ownerID: params.ownerID })
    })

    test('Should throw if failed to create', async () => {
        jest.spyOn(categoryRepository, 'create').mockRejectedValueOnce(new Error())

        const promise = createCategory.execute(params)

        await expect(promise).rejects.toThrow()
    })

    test('Should call SQSProducer with a valid input', async () => {
        const spy = jest.spyOn(sqsProducer, 'sendMessage')

        await createCategory.execute(params)

        expect(spy).toHaveBeenCalledTimes(1)
    })

    test('Should throw if failed to send a message', async () => {
        jest.spyOn(sqsProducer, 'sendMessage').mockRejectedValueOnce(new Error())

        const promise = createCategory.execute(params)

        await expect(promise).rejects.toThrow()
    })
})
