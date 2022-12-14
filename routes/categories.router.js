const express = require('express');
const CategoryService = require('./../services/category.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
} = require('./../schemas/category.schema');

const router = express.Router();
const service = new CategoryService();

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const categories = await service.find();
      res.json(categories);
    } catch (error) {
      next(error);
    }
  })
  .post(
    validatorHandler(createCategorySchema, 'body'),
    async (req, res, next) => {
      try {
        const body = req.body;
        const newCategory = await service.create(body);
        res.status(201).json(newCategory);
      } catch (error) {
        next(error);
      }
    }
  );

router
  .route('/:id')
  .get(
    validatorHandler(getCategorySchema, 'params'),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const category = await service.findOne(id);
        res.json(category);
      } catch (error) {
        next(error);
      }
    }
  )
  .patch(
    validatorHandler(getCategorySchema, 'params'),
    validatorHandler(updateCategorySchema, 'body'),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const body = req.body;
        const category = await service.update(id, body);
        res.json(category);
      } catch (error) {
        next(error);
      }
    }
  )
  .delete(
    validatorHandler(getCategorySchema, 'params'),
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
