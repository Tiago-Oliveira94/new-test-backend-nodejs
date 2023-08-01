const { getMockReq, getMockRes } = require('@jest-mock/express')
const CategoryController = require('./CategoryController')
const { NotFoundError } = require('../../../infrastructure/webserver/errors')

class CreateCategoryUsecaseStub {
    execute() { }
}

class UpdateCategoryUsecaseStub {
    execute() { }
}

class DeleteCategoryUsecaseStub {
    execute() { }
}

describe('CategoryContoller: ', () => {
    let request
    let response
    let categoryController

    const createCategoryUsecase = new CreateCategoryUsecaseStub()
    const updateCategoryUsecase = new UpdateCategoryUsecaseStub()
    const deleteCategoryUsecase = new DeleteCategoryUsecaseStub()

    beforeEach(() => {
        categoryController = new CategoryController({ createCategoryUsecase, updateCategoryUsecase, deleteCategoryUsecase })
    })

    describe('create', () => {
        const body = {
            title: 'test title',
            description: 'description for test',
            ownerID: 'ownerID for test'
        }

        const id = {
            id: 'id for test'
        }

        beforeAll(() => {
            request = getMockReq({ body })
            response = getMockRes().res
            jest.spyOn(createCategoryUsecase, 'execute').mockResolvedValue(id)
        })

        test('Should call CreateCategoryUsecase with a valid input', async () => {
            const spy = jest.spyOn(createCategoryUsecase, 'execute')

            await categoryController.createCategory(request, response)

            expect(spy).toHaveBeenCalledWith({ title: body.title, description: body.description, ownerID: body.ownerID })
        })

        test('Should return 500 if CreateCategoryUsecase throws', async () => {
            jest.spyOn(createCategoryUsecase, 'execute').mockRejectedValueOnce(new Error())

            await categoryController.createCategory(request, response)

            expect(response.status).toHaveBeenCalledWith(500)
        })

        test('Should return 201 on success', async () => {
            await categoryController.createCategory(request, response)

            expect(response.status).toHaveBeenCalledWith(201)
        })
    })

    describe('update', () => {
        const params = { id: 1 }
        const body = {
            title: 'title for test',
            description: 'description for test'
        }

        beforeAll(() => {
            request = getMockReq({ body, params })
            response = getMockRes().res
            jest.spyOn(updateCategoryUsecase, 'execute').mockResolvedValue(undefined)
        })

        test('Should return 404 if UpdateCategoryUsecase throws NotFoundError', async () => {
            const errorMessage = 'any_message'
            jest.spyOn(updateCategoryUsecase, 'execute').mockRejectedValueOnce(new NotFoundError({ message: errorMessage }))

            await categoryController.updateCategory(request, response)

            expect(response.status).toHaveBeenCalledWith(404)
        })

        test('Should return 500 if UpdateCategoryUsecase throws', async () => {
            jest.spyOn(updateCategoryUsecase, 'execute').mockRejectedValueOnce(new Error())

            await categoryController.updateCategory(request, response)

            expect(response.status).toHaveBeenCalledWith(500)
        })

        test('Should return 200 on success', async () => {
            await categoryController.updateCategory(request, response)

            expect(response.status).toHaveBeenCalledWith(200)
        })
    })

    describe('delete', () => {
        const params = { id: 1 }

        beforeAll(() => {
            request = getMockReq({ params })
            response = getMockRes().res
            jest.spyOn(deleteCategoryUsecase, 'execute').mockResolvedValue(undefined)
        })

        test('Should call UpdateCategoryUsecase with correct values', async () => {
            const spy = jest.spyOn(deleteCategoryUsecase, 'execute')

            await categoryController.deleteCategory(request, response)

            expect(spy).toHaveBeenCalledTimes(1)
        })

        test('Should return 404 if CreateCategoryUsecase throws NotFoundError', async () => {
            const errorMessage = 'any_message'
            jest.spyOn(deleteCategoryUsecase, 'execute').mockRejectedValueOnce(new NotFoundError({ message: errorMessage }))

            await categoryController.deleteCategory(request, response)

            expect(response.status).toHaveBeenCalledWith(404)
        })

        test('Should return 500 if CreateCategoryUsecase throws', async () => {
            jest.spyOn(deleteCategoryUsecase, 'execute').mockRejectedValueOnce(new Error())

            await categoryController.deleteCategory(request, response)

            expect(response.status).toHaveBeenCalledWith(500)
        })

        test('Should return 200 on success', async () => {
            await categoryController.deleteCategory(request, response)

            expect(response.status).toHaveBeenCalledWith(200)
        })
    })
})
