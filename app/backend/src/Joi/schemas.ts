import Joi = require('joi');

const filled = 'All fields must be filled';

const schema1 = Joi.object({
  email: Joi.string().required().messages({
    'any.required': filled,
    'string.empty': filled,
  }),
  password: Joi.string().required().min(6).messages({
    'any.required': filled,
    'string.empty': filled,
  }),
});

const schema = { schema1 };

export default schema;
