const { AlreadyExistsError, CannotBeEmptyError } = require("../../infrastructure/webserver/errors")

class CreateOwnerUseCase {
    constructor(ownerRepository) {
        this.ownerRepository = ownerRepository
    }

    async execute(owner) {
        const { name, email } = owner
        if (!name || !email) {
            throw new CannotBeEmptyError('name and email fields cannot be empty!')
        }
        return this.ownerRepository.findByProperty({ email }).then((ownerWithEmail) => {
            if (ownerWithEmail.length) {
                throw new AlreadyExistsError(`owner with email ${email} already exists!`)
            }
            return this.ownerRepository.create(owner)
        })

    }
}

module.exports = CreateOwnerUseCase
