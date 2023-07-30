const Joi = require('joi');

const productJoiSchema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    ownerID: Joi.string().required(),
    description: Joi.string(),
    price: Joi.number().positive().precision(2).required(),
    category: Joi.string().required()
})

module.exports = productJoiSchema