import Joi = require('joi');

const schema1 = Joi.object({
  email: Joi.string().required().messages({
    'any.required': 'All fields must be filled',
  }),
  password: Joi.string().required().min(6).messages({
    'any.required': 'All fields must be filled',
  }),
});

const schema = { schema1 };

export default schema;
