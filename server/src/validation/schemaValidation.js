const Joi = require("joi");

const userValidation = Joi.object({
  name: Joi.string().min(3).max(10).required().lowercase(),
  email: Joi.string().required().email().lowercase(),
  password: Joi.string().max(15).min(7).required(),
});

const loginValidation = Joi.object({
  email: Joi.string().required().email().lowercase(),
  password: Joi.string().max(15).min(7).required(),
});

const postValidation = Joi.object({
  title: Joi.string().min(1).max(30),
  desc: Joi.string().min(1).max(2000),
});

const postUpdateValidation = Joi.object({
  title: Joi.string().min(1).max(30),
  desc: Joi.string().min(1).max(200),
  imgURL: Joi.string(),
});

// const orderValidate = Joi.object({
//     userId :
// })

module.exports = {
  userValidation,
  postValidation,
  loginValidation,
  postUpdateValidation,
};
