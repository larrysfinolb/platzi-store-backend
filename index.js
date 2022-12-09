const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const {
  logErrors,
  boomErrorHandler,
  errorHandler,
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

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

const PORT = 3001;
app.listen(PORT, () => {
  console.log('Server running in port', PORT);
});
