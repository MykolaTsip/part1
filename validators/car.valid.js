const Joi = require('joi')

module.exports = Joi.object().keys({
    idcars: Joi.number().optional(),
    model: Joi.string().min(2).required(),
    year: Joi.number().min(4).required(),
    price: Joi.number().min(3).required(),
    user_id: Joi.number().optional()
})
