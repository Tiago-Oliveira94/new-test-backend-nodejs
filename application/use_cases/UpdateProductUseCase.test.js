const UpdateProductUseCase = require('../use_cases/UpdateProductUseCase')

class ProductRepositoryStub {
    update() { }
    findByProperty() { }
}

class CategoryRepositoryStub {
    findByProperty() { }
}

class SQSProducerStub {
    sendMessage() { }
}

describe('UpdateProductUseCase: ', () => {
    let updateProduct
    const productRepository = new ProductRepositoryStub()
    const categoryRepository = new CategoryRepositoryStub()
    const sqsProducer = new SQSProducerStub()

    const params = {
        title: 'title for test',
        description: 'description for test',
        ownerID: 'id',
        price: 1,
        category: 'category for test'
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
        jest.spyOn(productRepository, 'update').mockResolvedValue(id)
        jest.spyOn(categoryRepository, 'findByProperty').mockResolvedValue(findByPropertyResponse)
        jest.spyOn(sqsProducer, 'sendMessage').mockResolvedValue(undefined)
    })

    beforeEach(() => {
        updateProduct = new UpdateProductUseCase({ productRepository, categoryRepository, sqsProducer })
    })

    test('Should call ProductRepository with a valid input', async () => {
        const spy = jest.spyOn(productRepository, 'update')

        await updateProduct.execute(id._id, params)

        expect(spy).toHaveBeenCalledTimes(1)
    })

    test('Should throw if failed to create', async () => {
        jest.spyOn(productRepository, 'update').mockRejectedValueOnce(new Error())

        const promise = updateProduct.execute(id._id, params)

        await expect(promise).rejects.toThrow()
    })

    test('Should call SQSProducer with a valid input', async () => {
        const spy = jest.spyOn(sqsProducer, 'sendMessage')

        await updateProduct.execute(id._id, params)

        expect(spy).toHaveBeenCalledTimes(1)
    })

    test('Should throw if failed to send a message', async () => {
        jest.spyOn(sqsProducer, 'sendMessage').mockRejectedValueOnce(new Error())

        const promise = updateProduct.execute(id._id, params)

        await expect(promise).rejects.toThrow()
    })
})
