function NotFoundError(description) {
    Error.call(this)
    Error.captureStackTrace(this)
    this.name = 'NOT_FOUND'
    this.statusCode = 404
    this.description = description
    this.isOperational = true
}
NotFoundError.prototype = Object.create(Error.prototype)
NotFoundError.prototype.constructor = NotFoundError

function BadRequestError(description) {
    Error.call(this)
    Error.captureStackTrace(this)
    this.name = 'BAD_REQUEST_ERROR'
    this.statusCode = 400
    this.description = description
    this.isOperational = true
}
BadRequestError.prototype = Object.create(Error.prototype)
BadRequestError.prototype.constructor = BadRequestError

function AlreadyExistsError(description) {
    Error.call(this)
    Error.captureStackTrace(this)
    this.name = 'ALREADY_EXISTS'
    this.statusCode = 400
    this.description = description
    this.isOperational = true
}
AlreadyExistsError.prototype = Object.create(Error.prototype)
AlreadyExistsError.prototype.constructor = AlreadyExistsError

function CannotBeEmptyError(description) {
    Error.call(this)
    Error.captureStackTrace(this)
    this.name = 'CANNOT_BE_EMPTY'
    this.statusCode = 400
    this.description = description
    this.isOperational = true
}
CannotBeEmptyError.prototype = Object.create(Error.prototype)
CannotBeEmptyError.prototype.constructor = CannotBeEmptyError

function GenericMongoError(description) {
    Error.call(this)
    Error.captureStackTrace(this)
    this.name = 'GENERIC_MONGO_ERROR'
    this.statusCode = 500
    this.description = description
    this.isOperational = true
}
GenericMongoError.prototype = Object.create(Error.prototype)
GenericMongoError.prototype.constructor = GenericMongoError

function GenericQueueError(description) {
    Error.call(this)
    Error.captureStackTrace(this)
    this.name = 'GENERIC_QUEUE_ERROR'
    this.statusCode = 500
    this.description = description
    this.isOperational = true
}
GenericQueueError.prototype = Object.create(Error.prototype)
GenericQueueError.prototype.constructor = GenericQueueError

module.exports = {
    NotFoundError,
    AlreadyExistsError,
    CannotBeEmptyError,
    GenericMongoError,
    BadRequestError,
    GenericQueueError
}