const { Pool } = require('pg');
const { config } = require('./../config/config');

const options = {
  connectionString: config.dbUrl
}

const pool = new Pool(options);

module.exports = pool;
