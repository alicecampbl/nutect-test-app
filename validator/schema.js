const Joi = require("joi");

const registrationValidateSchema = Joi.object({
  email: Joi.string().email().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  password: Joi.string().min(8).required(),
});

const loginValidateSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

// validate upload file jpeg or png
// const profileImageValidateSchema = Joi.object({

// });

const topupValidateSchema = Joi.object({
  top_up_amount: Joi.number().min(1).required(),
});

module.exports = {
  registrationValidateSchema,
  loginValidateSchema,
  topupValidateSchema,
};
