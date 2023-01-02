const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(0);
const image = Joi.string().uri();
const description = Joi.string();
const categoryId = Joi.number().integer();

const limit = Joi.number().min(1);
const offset = Joi.number().min(0);
const minPrice = Joi.number().min(0);
const maxPrice = Joi.number().min(1);

const createProductSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  price: price.required(),
  image: image.required(),
  categoryId: categoryId.required(),
});

const updateProductSchema = Joi.object({
  name: name,
  description: description,
  price: price,
  image: image,
  categoryId: categoryId,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
  limit: limit,
  offset: offset,
  price: price,
  minPrice: minPrice,
  maxPrice: Joi.when('minPrice', {
    is: Joi.exist(),
    then: Joi.required(),
  }),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
};
