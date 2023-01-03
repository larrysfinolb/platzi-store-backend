require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || '3000',
  dbUser: process.env.PGUSER,
  dbPassword: process.env.PGPASSWORD,
  dbHost: process.env.PGHOST,
  dbName: process.env.PGNAME,
  dbPort: process.env.PGPORT,
  dbUrl: process.env.DATABASE_URL,
};

module.exports = { config };
