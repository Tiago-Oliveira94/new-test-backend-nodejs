const Joi = require('joi');

const categoryJoiSchema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    ownerID: Joi.string().required(),
    description: Joi.string()
})

module.exports = categoryJoiSchema