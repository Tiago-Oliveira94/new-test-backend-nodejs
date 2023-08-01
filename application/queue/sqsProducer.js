require('dotenv').config({ path: __dirname + '/./../../.env' })
const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.AWS_REGION });
const { v4: uuidv4 } = require('uuid');

class SQSProducer {
    constructor(client) {
        this.client = client
    }

    sendMessage(message) {
        const sqs = new AWS.SQS();
        const messageId = uuidv4()
        const result = sqs.sendMessage({
            MessageBody: JSON.stringify({ id: messageId, ownerID: message }),
            QueueUrl: `${process.env.AWS_QUEUE_URL}`,
            MessageGroupId: `${process.env.AWS_MESSAGE_GROUP}`
        }).promise();

        console.log('Sending message to SQS')

        return result
    }
}

module.exports = SQSProducer