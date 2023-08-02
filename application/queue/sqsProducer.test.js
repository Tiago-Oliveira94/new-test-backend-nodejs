const { SQSClient } = require('@aws-sdk/client-sqs')
const { mockClient } = require('aws-sdk-client-mock');
const SQSProducer = require('./sqsProducer')

describe('SQS Queue Gateway Tests', () => {
    let sqsProducer
    const mockedClient = mockClient(SQSClient)

    beforeEach(() => {
        sqsProducer = new SQSProducer(mockedClient)
    })

    describe('sendMessage', () => {
        const message = 'ownerID'

        test('Should call sendMessage succesfully', async () => {
            const spy = jest.spyOn(mockedClient, 'send')

            await sqsProducer.sendMessage(message)

            expect(spy).toHaveBeenCalledTimes(1)
        })

        test('Should throw if sdk throws ', async () => {
            jest.spyOn(mockedClient, 'send').mockRejectedValueOnce(new Error())

            const promise = sqsProducer.sendMessage(message)

            await expect(promise).rejects.toThrow()
        })
    })
})