require('dotenv').config({ path: __dirname + '/./../../.env' })
const { SendMessageCommand } = require('@aws-sdk/client-sqs')
const { v4: uuidv4 } = require('uuid');
const { GenericQueueError } = require('../../infrastructure/webserver/errors');

class SQSProducer {
    constructor(client) {
        this.client = client
    }

    async sendMessage(message) {
        try {
            const messageId = uuidv4()
            const params = new SendMessageCommand({
                MessageBody: JSON.stringify({ id: messageId, ownerID: message }),
                QueueUrl: `${process.env.AWS_QUEUE_URL}`,
                MessageGroupId: `${process.env.AWS_MESSAGE_GROUP}`
            })

            const result = await this.client.send(params);
            console.log('Sending message to SQS')
            return result
        } catch (err) {
            throw new GenericQueueError('Failed on send message to SQS')
        }

    }
}

module.exports = SQSProducer