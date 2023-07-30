import { jest } from '@jest/globals'
import { getMockReq, getMockRes } from '@jest-mock/express'

import { CategoryController } from './CategoryController'
import { UnprocessableEntityError } from '@errors/unprocessable-entity.error'
import { NotFoundError } from '@errors/not-found.error'

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
    let req
    let res
    let sut
    const createCategoryUsecase = new CreateCategoryUsecaseStub()
    const updateCategoryUsecase = new UpdateCategoryUsecaseStub()
    const deleteCategoryUsecase = new DeleteCategoryUsecaseStub()

    beforeEach(() => {
        sut = new CategoryController({ createCategoryUsecase, updateCategoryUsecase, deleteCategoryUsecase })
    })

    describe('create', () => {
        const body = {
            title: 'test title',
            description: 'description for test',
            ownerID: 'ownerID for test'
        }

        const usecaseResponse = {
            id: 'any_id'
        }

        beforeAll(() => {
            req = getMockReq({ body })
            res = getMockRes().res
            jest.spyOn(createCategoryUsecase, 'execute').mockResolvedValue(usecaseResponse)
        })

        test('Should call CreateCategoryUsecase with correct values', async () => {
            const spy = jest.spyOn(createCategoryUsecase, 'execute')

            await sut.create(req, res)

            expect(spy).toHaveBeenCalledWith({ title: body.title, description: body.description, ownerId: body.ownerId })
        })

        test('Should return 500 if CreateCategoryUsecase throws', async () => {
            jest.spyOn(createCategoryUsecase, 'execute').mockRejectedValueOnce(new Error())

            await sut.create(req, res)

            expect(res.status).toHaveBeenCalledWith(500)
            expect(res.json).toHaveBeenCalledWith({ message: 'An unexpected error occurred' })
        })

        test('Should return 201 on success', async () => {
            await sut.create(req, res)

            expect(res.status).toHaveBeenCalledWith(201)
            expect(res.json).toHaveBeenCalledWith({ message: 'Category successfully created', data: { id: 'any_id' } })
        })
    })

    describe('update', () => {
        const params = { id: 1 }
        const body = {
            title: 'any_title',
            description: 'any_description'
        }

        beforeAll(() => {
            req = getMockReq({ body, params })
            res = getMockRes().res
            jest.spyOn(updateCategoryUsecase, 'execute').mockResolvedValue(undefined)
        })

        test('Should call UpdateCategoryUsecase with correct values', async () => {
            const spy = jest.spyOn(updateCategoryUsecase, 'execute')

            await sut.update(req, res)

            expect(spy).toHaveBeenCalledTimes(1)
            expect(spy).toHaveBeenCalledWith({
                id: params.id,
                title: body.title,
                description: body.description
            })
        })

        test('Should return 404 if UpdateCategoryUsecase throws NotFoundError', async () => {
            const errorMessage = 'any_message'
            jest.spyOn(updateCategoryUsecase, 'execute').mockRejectedValueOnce(new NotFoundError({ message: errorMessage }))

            await sut.update(req, res)

            expect(res.status).toHaveBeenCalledWith(404)
            expect(res.json).toHaveBeenCalledWith({ message: errorMessage })
        })

        test('Should return 422 if UpdateCategoryUsecase throws UnprocessableEntityError', async () => {
            const errorMessage = 'any_message'
            jest
                .spyOn(updateCategoryUsecase, 'execute')
                .mockRejectedValueOnce(new UnprocessableEntityError({ message: errorMessage }))

            await sut.update(req, res)

            expect(res.status).toHaveBeenCalledWith(422)
            expect(res.json).toHaveBeenCalledWith({ message: errorMessage })
        })

        test('Should return 500 if UpdateCategoryUsecase throws', async () => {
            jest.spyOn(updateCategoryUsecase, 'execute').mockRejectedValueOnce(new Error())

            await sut.update(req, res)

            expect(res.status).toHaveBeenCalledWith(500)
            expect(res.json).toHaveBeenCalledWith({ message: 'An unexpected error occurred' })
        })

        test('Should return 200 on success', async () => {
            await sut.update(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({ message: 'Category updated successfully' })
        })
    })

    describe('delete', () => {
        const params = { id: 1 }

        beforeAll(() => {
            req = getMockReq({ params })
            res = getMockRes().res
            jest.spyOn(deleteCategoryUsecase, 'execute').mockResolvedValue(undefined)
        })

        test('Should call UpdateCategoryUsecase with correct values', async () => {
            const spy = jest.spyOn(deleteCategoryUsecase, 'execute')

            await sut.delete(req, res)

            expect(spy).toHaveBeenCalledTimes(1)
            expect(spy).toHaveBeenCalledWith({ id: params.id })
        })

        test('Should return 404 if CreateCategoryUsecase throws NotFoundError', async () => {
            const errorMessage = 'any_message'
            jest.spyOn(deleteCategoryUsecase, 'execute').mockRejectedValueOnce(new NotFoundError({ message: errorMessage }))

            await sut.delete(req, res)

            expect(res.status).toHaveBeenCalledWith(404)
            expect(res.json).toHaveBeenCalledWith({ message: errorMessage })
        })

        test('Should return 422 if CreateCategoryUsecase throws UnprocessableEntityError', async () => {
            const errorMessage = 'any_message'
            jest
                .spyOn(deleteCategoryUsecase, 'execute')
                .mockRejectedValueOnce(new UnprocessableEntityError({ message: errorMessage }))

            await sut.delete(req, res)

            expect(res.status).toHaveBeenCalledWith(422)
            expect(res.json).toHaveBeenCalledWith({ message: errorMessage })
        })

        test('Should return 500 if CreateCategoryUsecase throws', async () => {
            jest.spyOn(deleteCategoryUsecase, 'execute').mockRejectedValueOnce(new Error())

            await sut.delete(req, res)

            expect(res.status).toHaveBeenCalledWith(500)
            expect(res.json).toHaveBeenCalledWith({ message: 'An unexpected error occurred' })
        })

        test('Should return 200 on success', async () => {
            await sut.delete(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({ message: 'Category deleted successfully' })
        })
    })
})
