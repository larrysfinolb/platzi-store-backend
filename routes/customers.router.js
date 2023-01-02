const express = require('express');
const CustomerService = require('./../services/customer.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema
} = require('./../schemas/customer.schema');

const router = express.Router();
const service = new CustomerService();

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const customers = await service.find();
      res.json(customers);
    } catch (error) {
      next(error);
    }
  })
  .post(
    validatorHandler(createCustomerSchema, 'body'),
    async (req, res, next) => {
      try {
        const body = req.body;
        const newCustomer = await service.create(body);
        res.status(201).json(newCustomer);
      } catch (error) {
        next(error);
      }
    }
  );

router
  .route('/:id')
  .get(
    validatorHandler(getCustomerSchema, 'params'),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const customer = await service.findOne(id);
        res.json(customer);
      } catch (error) {
        next(error);
      }
    }
  )
  .patch(
    validatorHandler(getCustomerSchema, 'params'),
    validatorHandler(updateCustomerSchema, 'body'),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const body = req.body;
        const customer = await service.update(id, body);
        res.json(customer);
      } catch (error) {
        next(error);
      }
    }
  )
  .delete(
    validatorHandler(getCustomerSchema, 'params'),
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
