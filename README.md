
<h1>AnotaAI Catalog Mamagement System</h1>

A NodeJS API providing a product catalog management system with mongoDB and AWS SQS Service integration.

<strong>Requirements</strong>

- NodeJS
- Docker

<strong>How to run</strong>

- cd into the root directory and create a .env file based on .env.example.
- to be able to access the AWS services (SQS and S3), it will be necessary to get the credentials from the queue owner (in this case: me).
- run ```docker-compose up -d``` to start the api and mongoDB service containers.
- run ```npm test``` to run unit tests.

<strong>Considerations:</strong>

- The ownerID entity was not created on database for simplicity.
- You can import the Insomnia Collection through the ```insomnia-collection.json``` file on root directory.
