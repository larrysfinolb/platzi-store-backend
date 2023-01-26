const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const {
  boomErrorHandler,
  errorHandler,
  ormErrorHandler,
} = require('./middlewares/error.handler');

const app = express();

app.use(express.json());

const whiteList = [];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Origin de petición no permitido.'));
    }
  },
};
app.use(cors(options));

require("./utils/auth")

routerApi(app);

app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
