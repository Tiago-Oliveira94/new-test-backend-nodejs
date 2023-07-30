const ProductSchema = require('../database/mongodb/schemas/Product')
const { GenericMongoError } = require("../../infrastructure/webserver/errors")

class ProductRepository {
    constructor() {
        this.schema = ProductSchema
    }

    async create(product) {
        try {
            const result = await this.schema.create(product)
            console.log(`Product ${result} succesfully created!`)
            return result
        } catch (err) {
            if (err) throw new GenericMongoError('Failure on create product in mongo')
        }
    }

    async update(values) {
        const { productID, title, price, description } = values

        try {
            const result = await this.schema.updateOne({ _id: productID }, { title, description, price })
            console.log(`Product ${title} succesfully updated!`)
            return result
        } catch (err) {
            console.log(err)
            throw new GenericMongoError('Failure on update product in mongo')
        }
    }

    async delete(productID) {
        try {
            const result = await this.schema.deleteOne({ _id: productID })
            console.log(`Product ${productID} succesfully deleted!`)
            return result
        } catch (err) {
            console.log(err)
            throw new GenericMongoError('Failure on delete product in mongo')
        }
    }

    async deleteMany(productIds) {
        try {
            const result = await this.schema.deleteMany({ _id: { $in: productIds } })
            console.log('Products Deleted succesfully!')
            return result
        } catch (err) {
            console.log(err)
            throw new GenericMongoError('Failure on delete products in mongo')
        }
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