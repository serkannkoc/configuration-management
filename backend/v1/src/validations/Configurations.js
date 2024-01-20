const Joi = require("joi");

const configIdRules = Joi.string()
const descriptionRules = Joi.string()
const paramKeyRules = Joi.string()
const valueRules = Joi.string()
const updatedAtRules = Joi

const add = {
    body: Joi.object({
        description: descriptionRules.required(),
        paramKey: paramKeyRules.required(),
        value: valueRules.required(),
    })
}
const remove = {
    params: Joi.object({
        id: configIdRules.required(),
    })
}
const update = {
    params: Joi.object({
        id: configIdRules.required(),
    }),
    body: Joi.object({
        description: descriptionRules,
        paramKey: paramKeyRules,
        value: valueRules,
        updatedAt: updatedAtRules.required()
    })
}


module.exports = {
    add,
    remove,
    update,
};