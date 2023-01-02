const express = require('express');
const ProductService = require('./../services/products.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
} = require('../schemas/product.schema');

const router = express.Router();
const service = new ProductService();

router
  .route('/')
  .get(
    validatorHandler(queryProductSchema, 'query'),
    async (req, res, next) => {
      try {
        const query = req.query;
        const products = await service.find(query);
        res.json(products);
      } catch (error) {
        next(error);
      }
    }
  )
  .post(
    validatorHandler(createProductSchema, 'body'),
    async (req, res, next) => {
      try {
        const body = req.body;
        const newProduct = await service.create(body);
        res.status(201).json(newProduct);
      } catch (error) {
        next(error);
      }
    }
  );

router
  .route('/:id')
  .get(validatorHandler(getProductSchema, 'params'), async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  })
  .patch(
    validatorHandler(getProductSchema, 'params'),
    validatorHandler(updateProductSchema, 'body'),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const body = req.body;
        const product = await service.update(id, body);
        res.json(product);
      } catch (error) {
        next(error);
      }
    }
  )
  .delete(
    validatorHandler(getProductSchema, 'params'),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        await service.delete(id);
        res.status(201).json({ id });
      } catch (error) {
        next(error);
      }
    }
  );

module.exports = router;
