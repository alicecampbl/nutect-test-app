const { Pool } = require("pg");

const config = {
  host: process.env.PG_HOST_PROD,
  port: process.env.PG_PORT_PROD,
  user: process.env.PG_USER_PROD,
  password: process.env.PG_PASSWORD_PROD,
  database: process.env.PG_DATABASE_PROD,
  connectionString: process.env.PG_DATABASE_URI,
  ssl: { rejectUnauthorized: false },
};

const pool = process.env.NODE_ENV === "prod" ? new Pool(config) : new Pool();

module.exports = pool;
