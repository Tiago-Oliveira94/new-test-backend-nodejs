const ProductSchema = require('../database/mongodb/schemas/Product')
const { GenericMongoError } = require("../../infrastructure/webserver/errors")

class ProductRepository {
    constructor() {
        this.schema = ProductSchema
    }

    async create(product) {
        const result = await this.schema.create(product, function (err, value) {
            if (err) throw new GenericMongoError('Failure on create product in mongo')
            console.log(`Product ${value} created succesfully!`)
        })

        return result
    }

    async findByProperty(params) {
        try {
            return await this.schema.find(params)
                .skip(params.perPage * params.page - params.perPage)
                .limit(params.perPage);

        } catch (err) {
            console.log(err)
            throw new GenericMongoError('Failure on find product in mongo')
        }
    }
}

module.exports = ProductRepository