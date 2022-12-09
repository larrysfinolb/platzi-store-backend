const boomErrorHandler = (error, req, res, next) => {
  if (error.isBoom) {
    const { output } = error;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(error);
  }
};

const errorHandler = (error, req, res, next) => {
  res.status(500).json({
    statusCode: 500,
    message: error.message,
    stack: error.stack,
  });
};

module.exports = { boomErrorHandler, errorHandler };
