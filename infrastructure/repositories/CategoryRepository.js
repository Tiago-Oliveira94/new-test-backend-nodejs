const CategorySchema = require('../database/mongodb/schemas/Category')
const { GenericMongoError } = require("../../infrastructure/webserver/errors")

class CategoryRepository {
    constructor() {
        this.schema = CategorySchema
    }

    async create(category) {
        await this.schema.create(category, function (err, value) {
            if (err) throw new GenericMongoError('Failure on create category in mongo')
            console.log(`Category ${value} created succesfully!`)
        })
    }

    async update(category, ownerID, product) {
        await this.schema.updateOne({ category, ownerID }, { products: [product] }, function (err) {
            if (err) {
                console.log(err)
                throw new GenericMongoError('Failure on update category in mongo')
            }
            console.log("Category updated succesfully!")
        })
    }

    async findByProperty(params) {
        try {
            return await this.schema.find(params)
                .skip(params.perPage * params.page - params.perPage)
                .limit(params.perPage);

        } catch (err) {
            console.log(err)
            throw new GenericMongoError('Failure on find category in mongo')
        }
    }
}

module.exports = CategoryRepository