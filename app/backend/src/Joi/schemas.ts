import Joi = require('joi');

const schema1 = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required().min(6),
});

const schema = { schema1 };

export default schema;
