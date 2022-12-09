const express = require('express');

const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const categoriesRouter = require('./categories.router');

const routerApi = (app) => {
  const router = express.Router();

  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);

  app.use('/api/v1', router);
};

module.exports = routerApi;
