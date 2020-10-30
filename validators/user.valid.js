const Joi = require('joi')

module.exports = Joi.object().keys({
    id: Joi.number().optional(),
    name: Joi.string().trim().min(2).alphanum().optional(),
    password: Joi.string().trim().min(5).optional(),
    email: Joi.string().trim().min(4).optional(),
    avatar: Joi.string().optional()
})
