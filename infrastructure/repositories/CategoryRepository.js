const CategorySchema = require('../database/mongodb/schemas/Category')
const { GenericMongoError } = require("../../infrastructure/webserver/errors")

class CategoryRepository {
    async create(category) {
        try {
            const result = await CategorySchema.create(category)
            console.log(`Category ${result} succesfully created!`)
            return result
        } catch (err) {
            if (err) throw new GenericMongoError('Failure on create category in mongo')
        }
    }

    async update(values) {
        const { categoryID, title, description } = values

        try {
            const result = await CategorySchema.updateOne({ _id: categoryID }, { title, description })
            console.log(`Category ${title} succesfully updated!`)
            return result
        } catch (err) {
            console.log(err)
            throw new GenericMongoError('Failure on find category in mongo')
        }
    }

    async delete(categoryID) {
        try {
            const result = await CategorySchema.deleteOne({ _id: categoryID })
            console.log(`Category ${categoryID} succesfully deleted!`)
            return result
        } catch (err) {
            console.log(err)
            throw new GenericMongoError('Failure on delete category in mongo')
        }
    }

    async findByProperty(params) {
        try {
            return await CategorySchema.find(params)
                .skip(params.perPage * params.page - params.perPage)
                .limit(params.perPage);

        } catch (err) {
            console.log(err)
            throw new GenericMongoError('Failure on find category in mongo')
        }
    }
}

module.exports = CategoryRepository