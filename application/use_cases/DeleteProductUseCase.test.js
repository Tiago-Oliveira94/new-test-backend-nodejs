const DeleteProductUseCase = require('../use_cases/DeleteProductUseCase')

class ProductRepositoryStub {
    delete() { }
    findByProperty() { }
}

class SQSProducerStub {
    sendMessage() { }
}

describe('DeleteProductUseCase: ', () => {
    let deleteProduct
    const productRepository = new ProductRepositoryStub()
    const sqsProducer = new SQSProducerStub()

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
        jest.spyOn(productRepository, 'delete').mockResolvedValue(id)
        jest.spyOn(productRepository, 'findByProperty').mockResolvedValue(findByPropertyResponse)
        jest.spyOn(sqsProducer, 'sendMessage').mockResolvedValue(undefined)
    })

    beforeEach(() => {
        deleteProduct = new DeleteProductUseCase({ productRepository, sqsProducer })
    })

    test('Should call ProductRepository with a valid input', async () => {
        const spy = jest.spyOn(productRepository, 'delete')

        await deleteProduct.execute(id._id)

        expect(spy).toHaveBeenCalledTimes(1)
    })

    test('Should throw if failed to delete', async () => {
        jest.spyOn(productRepository, 'delete').mockRejectedValueOnce(new Error())

        const promise = deleteProduct.execute(id._id)

        await expect(promise).rejects.toThrow()
    })

    test('Should call SQSProducer with a valid input', async () => {
        const spy = jest.spyOn(sqsProducer, 'sendMessage')

        await deleteProduct.execute(id._id)

        expect(spy).toHaveBeenCalledTimes(1)
    })

    test('Should throw if failed to send a message', async () => {
        jest.spyOn(sqsProducer, 'sendMessage').mockRejectedValueOnce(new Error())

        const promise = deleteProduct.execute(id._id)

        await expect(promise).rejects.toThrow()
    })
})
