const { S3Client } = require('@aws-sdk/client-s3')
require('dotenv').config({ path: __dirname + '/./../../.env' })
const CategoryRepository = require('../../infrastructure/repositories/CategoryRepository')
const ProductRepository = require('../../infrastructure/repositories/ProductRepository')
const StorageRepository = require('../../infrastructure/repositories/StorageRepository')

const client = new S3Client({
    region: process.env.AWS_REGION
})

const categoryRepository = new CategoryRepository()
const productRepository = new ProductRepository()
const storageRepository = new StorageRepository(client)

module.exports = { categoryRepository, productRepository, storageRepository }
