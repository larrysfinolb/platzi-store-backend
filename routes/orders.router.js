const express = require('express');
const OrderService = require('./../services/order.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  getOrderSchema,
  addItemSchema,
} = require('./../schemas/order.schema');
const passport = require('passport');

const router = express.Router();
const service = new OrderService();

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const orders = await service.find();
      res.json(orders);
    } catch (error) {
      next(error);
    }
  })
  .post(
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
      try {
        const user = req.user;
        const newOrder = await service.create(user);
        res.status(201).json(newOrder);
      } catch (error) {
        next(error);
      }
    }
  );

router
  .route('/:id')
  .get(validatorHandler(getOrderSchema, 'params'), async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  });

router
  .route('/add-item')
  .post(validatorHandler(addItemSchema, 'body'), async (req, res, next) => {
    try {
      const body = req.body;
      const newItem = await service.addItem(body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
