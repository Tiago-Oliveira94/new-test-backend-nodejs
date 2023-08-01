const { Consumer } = require('sqs-consumer');
const { SQSClient } = require('@aws-sdk/client-sqs')
require('dotenv').config({ path: __dirname + '/./../../.env' })
const { buildCatalogUsecase } = require('../composers/UseCases')

const client = new SQSClient({
    region: process.env.AWS_REGION
})

const consumer = Consumer.create({
    queueUrl: 'https://sqs.us-east-1.amazonaws.com/705800475792/anotaai-queue.fifo',
    handleMessage: async (message) => {
        const result = await buildCatalogUsecase.execute(message)
        return result
    },
    visibilityTimeout: 20,
    sqs: client
})

consumer.on('error', err => {
    console.error(err)
})

consumer.on('processing_error', err => {
    console.error(err)
})

module.exports = { consumer }