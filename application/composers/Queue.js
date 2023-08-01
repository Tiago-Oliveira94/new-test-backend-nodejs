const { SQSClient } = require('@aws-sdk/client-sqs')
require('dotenv').config({ path: __dirname + '/./../../.env' })
const SQSProducer = require('../queue/sqsProducer')

const client = new SQSClient({
    region: process.env.AWS_REGION
})

const sqsProducer = new SQSProducer(client)

module.exports = { sqsProducer }
