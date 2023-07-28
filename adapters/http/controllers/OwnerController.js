const CreateOwnerUseCase = require('../../../application/use_cases/CreateOwnerUseCase');
const OwnerRepository = require('../../../infrastructure/repositories/OwnerRepository')

const ownerRepository = new OwnerRepository()

const OwnerController = () => ({
    createOwner: async (req, res, next) => {
        const createOwner = new CreateOwnerUseCase(ownerRepository)
        await createOwner.execute(req.body).then((owner) => res.status(201).json(owner)).catch((error) => next(error));
    }
})

module.exports = OwnerController