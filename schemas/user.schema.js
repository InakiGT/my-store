const Joi = require("joi");

const email = Joi.string();
const password = Joi.string().min(8);
const role = Joi.string();

const createUserSchema = Joi.object({
    email: email.required(),
    password: password.required(),
    role: role.required(),
});

module.exports = {
    createUserSchema,
}
