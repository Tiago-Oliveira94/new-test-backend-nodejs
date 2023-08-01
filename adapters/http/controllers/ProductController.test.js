const { getMockReq, getMockRes } = require('@jest-mock/express')
const ProductController = require('./ProductController')
const { NotFoundError } = require('../../../infrastructure/webserver/errors')

class CreateProductUsecaseStub {
    execute() { }
}

class UpdateProductUsecaseStub {
    execute() { }
}

class DeleteProductUsecaseStub {
    execute() { }
}

describe('ProductController: ', () => {
    let request
    let response
    let productController

    const createProductUsecase = new CreateProductUsecaseStub()
    const updateProductUsecase = new UpdateProductUsecaseStub()
    const deleteProductUsecase = new DeleteProductUsecaseStub()

    beforeEach(() => {
        productController = new ProductController({ createProductUsecase, updateProductUsecase, deleteProductUsecase })
    })

    describe('create', () => {
        const body = {
            title: 'title for test',
            ownerID: 'owner for test',
            description: 'description for test',
            category: 'id',
            price: 10.0,
        }

        const id = {
            id: 'id for test'
        }

        beforeAll(() => {
            request = getMockReq({ body })
            response = getMockRes().res
            jest.spyOn(createProductUsecase, 'execute').mockResolvedValue(id)
        })

        test('Should call CreateProductUsecase with correct values', async () => {
            const spy = jest.spyOn(createProductUsecase, 'execute')

            await productController.createProduct(request, response)

            expect(spy).toHaveBeenCalledWith({
                title: body.title,
                ownerID: body.ownerID,
                description: body.description,
                category: body.category,
                price: body.price
            })
        })

        test('Should return 404 if CreateProductUsecase throws NotFoundError', async () => {
            const errorMessage = 'any_error_message'
            jest.spyOn(createProductUsecase, 'execute').mockRejectedValueOnce(new NotFoundError({ message: errorMessage }))

            await productController.createProduct(request, response)

            expect(response.status).toHaveBeenCalledWith(404)
        })

        test('Should return 500 if CreateProductUsecase throws', async () => {
            jest.spyOn(createProductUsecase, 'execute').mockRejectedValueOnce(new Error())

            await productController.createProduct(request, response)

            expect(response.status).toHaveBeenCalledWith(500)
        })

        test('Should return 201 on success', async () => {
            await productController.createProduct(request, response)

            expect(response.status).toHaveBeenCalledWith(201)
        })
    })

    describe('update', () => {
        const params = { id: 1 }
        const body = {
            title: 'title for test',
            price: 1,
            description: 'description for test'
        }

        beforeAll(() => {
            request = getMockReq({ body, params })
            response = getMockRes().res
            jest.spyOn(updateProductUsecase, 'execute').mockResolvedValue(undefined)
        })

        test('Should call UpdateCategoryUsecase with correct values', async () => {
            const spy = jest.spyOn(updateProductUsecase, 'execute')

            await productController.updateProduct(request, response)

            expect(spy).toHaveBeenCalledTimes(1)
            expect(spy).toHaveBeenCalledWith(params.id, {
                title: body.title,
                price: body.price,
                description: body.description
            })
        })

        test('Should return 404 if CreateCategoryUsecase throws NotFoundError', async () => {
            const errorMessage = 'any_message'
            jest.spyOn(updateProductUsecase, 'execute').mockRejectedValueOnce(new NotFoundError({ message: errorMessage }))

            await productController.updateProduct(request, response)

            expect(response.status).toHaveBeenCalledWith(404)
        })

        test('Should return 500 if CreateCategoryUsecase throws', async () => {
            jest.spyOn(updateProductUsecase, 'execute').mockRejectedValueOnce(new Error())

            await productController.updateProduct(request, response)

            expect(response.status).toHaveBeenCalledWith(500)
        })

        test('Should return 200 on success', async () => {
            await productController.updateProduct(request, response)

            expect(response.status).toHaveBeenCalledWith(200)
        })
    })

    describe('delete', () => {
        const params = { id: 1 }

        beforeAll(() => {
            request = getMockReq({ params })
            response = getMockRes().res
            jest.spyOn(deleteProductUsecase, 'execute').mockResolvedValue(undefined)
        })

        test('Should call DeleteProductUsecase with correct values', async () => {
            const spy = jest.spyOn(deleteProductUsecase, 'execute')

            await productController.deleteProduct(request, response)

            expect(spy).toHaveBeenCalledTimes(1)
        })

        test('Should return 404 if DeleteProductUsecase throws NotFoundError', async () => {
            const errorMessage = 'any_message'
            jest.spyOn(deleteProductUsecase, 'execute').mockRejectedValueOnce(new NotFoundError({ message: errorMessage }))

            await productController.deleteProduct(request, response)

            expect(response.status).toHaveBeenCalledWith(404)
        })

        test('Should return 500 if CreateCategoryUsecase throws', async () => {
            jest.spyOn(deleteProductUsecase, 'execute').mockRejectedValueOnce(new Error())

            await productController.deleteProduct(request, response)

            expect(response.status).toHaveBeenCalledWith(500)
        })

        test('Should return 200 on success', async () => {
            await productController.deleteProduct(request, response)

            expect(response.status).toHaveBeenCalledWith(200)
        })
    })
})
