const Joi = require('joi');

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(4).optional(),
  // You can add more fields as per your requirements
});

module.exports = {
  registerSchema,
};
