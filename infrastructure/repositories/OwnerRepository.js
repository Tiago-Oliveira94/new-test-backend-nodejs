const OwnerSchema = require('../database/mongodb/schemas/Owner')

class OwnerRepository {
    constructor() {
        this.schema = OwnerSchema
    }

    create(owner) {
        this.schema.create(owner, function (err, _) {
            if (err) console.log(err)
            console.log("Owner created succesfully!")
        })
    }

    findByProperty = (params) =>
        OwnerSchema.find(params)
            .skip(params.perPage * params.page - params.perPage)
            .limit(params.perPage);
}

module.exports = OwnerRepository