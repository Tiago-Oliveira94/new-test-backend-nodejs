const DeleteCategoryUseCase = require('../use_cases/DeleteCategoryUseCase')

class CategoryRepositoryStub {
    delete() { }
    findByProperty() { }
}

class ProductRepositoryStub {
    deleteMany() { }
    findByProperty() { }
}

class SQSProducerStub {
    sendMessage() { }
}

describe('DeleteCategoryUseCase: ', () => {
    let deleteCategory
    const categoryRepository = new CategoryRepositoryStub()
    const sqsProducer = new SQSProducerStub()
    const productRepository = new ProductRepositoryStub()

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
        jest.spyOn(categoryRepository, 'delete').mockResolvedValue(id)
        jest.spyOn(categoryRepository, 'findByProperty').mockResolvedValue(findByPropertyResponse)
        jest.spyOn(productRepository, 'deleteMany').mockResolvedValue(id)
        jest.spyOn(productRepository, 'findByProperty').mockResolvedValue(findByPropertyResponse)
        jest.spyOn(sqsProducer, 'sendMessage').mockResolvedValue(undefined)
    })

    beforeEach(() => {
        deleteCategory = new DeleteCategoryUseCase({ categoryRepository, productRepository, sqsProducer })
    })

    test('Should call CategoryRepository with a valid input', async () => {
        const spy = jest.spyOn(categoryRepository, 'delete')

        await deleteCategory.execute(id._id, params)

        expect(spy).toHaveBeenCalledTimes(1)
    })

    test('Should throw if failed to delete', async () => {
        jest.spyOn(categoryRepository, 'delete').mockRejectedValueOnce(new Error())

        const promise = deleteCategory.execute(id._id, params)

        await expect(promise).rejects.toThrow()
    })

    test('Should call SQSProducer with a valid input', async () => {
        const spy = jest.spyOn(sqsProducer, 'sendMessage')

        await deleteCategory.execute(id._id, params)

        expect(spy).toHaveBeenCalledTimes(1)
    })

    test('Should throw if failed to send a message', async () => {
        jest.spyOn(sqsProducer, 'sendMessage').mockRejectedValueOnce(new Error())

        const promise = deleteCategory.execute(id._id, params)

        await expect(promise).rejects.toThrow()
    })
})
