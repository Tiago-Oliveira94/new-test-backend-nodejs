const CreateProductUseCase = require('../use_cases/CreateProductUseCase')

class ProductRepositoryStub {
    create() { }
    findByProperty() { }
}

class CategoryRepositoryStub {
    create() { }
    findByProperty() { }
}

class SQSProducerStub {
    sendMessage() { }
}

describe('CreateProductUseCase: ', () => {
    let createProduct
    const productRepository = new ProductRepositoryStub()
    const sqsProducer = new SQSProducerStub()
    const categoryRepository = new CategoryRepositoryStub()

    const params = {
        title: 'title for test',
        description: 'description for test',
        ownerID: 'id',
        price: 1,
        category: 'category for test'
    }

    const id = {
        _id: 'id'
    }

    beforeAll(() => {
        jest.spyOn(productRepository, 'create').mockResolvedValue(id)
        jest.spyOn(productRepository, 'findByProperty').mockResolvedValue(id)
        jest.spyOn(categoryRepository, 'findByProperty').mockResolvedValue([id])
        jest.spyOn(sqsProducer, 'sendMessage').mockResolvedValue(undefined)
    })

    beforeEach(() => {
        createProduct = new CreateProductUseCase({ productRepository, categoryRepository, sqsProducer })
    })

    test('Should call ProductRepository with a valid input', async () => {
        const spy = jest.spyOn(productRepository, 'create')

        await createProduct.execute(params)

        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith({ title: params.title, description: params.description, ownerID: params.ownerID, price: params.price, category: params.category })
    })

    test('Should throw if failed to create', async () => {
        jest.spyOn(productRepository, 'create').mockRejectedValueOnce(new Error())

        const promise = createProduct.execute(params)

        await expect(promise).rejects.toThrow()
    })

    test('Should call SQSProducer with a valid input', async () => {
        const spy = jest.spyOn(sqsProducer, 'sendMessage')

        await createProduct.execute(params)

        expect(spy).toHaveBeenCalledTimes(1)
    })

    test('Should throw if failed to send a message', async () => {
        jest.spyOn(sqsProducer, 'sendMessage').mockRejectedValueOnce(new Error())

        const promise = createProduct.execute(params)

        await expect(promise).rejects.toThrow()
    })
})
