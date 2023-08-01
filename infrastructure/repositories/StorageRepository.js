const { PutObjectCommand } = require('@aws-sdk/client-s3')
require('dotenv').config({ path: __dirname + '/./../../.env' })

class StorageRepository {
    constructor(client) {
        this.client = client
    }

    async publish(catalog) {
        const params = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Body: Buffer.from(JSON.stringify(catalog)),
            Key: `${catalog.owner}.json`,
            ContentEncoding: 'base64',
            ContentType: 'Application/json'
        })

        await this.client.send(params)
        console.log('Catalog published on S3 succesfully')

        return { ownerID: catalog.ownerID }
    }
}

module.exports = StorageRepository