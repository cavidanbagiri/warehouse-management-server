require('dotenv').config();

module.exports = 
  {
    "development": {
      "username": process.env.DEV_DATABASE_USER,
      "password": process.env.DEV_DATABASE_PASSWORD,
      "database": process.env.DEV_DATABASE_NAME,
      "host": process.env.DEV_DATABASE_HOST,
      "dialect": "postgres"
    },
    "test": {
      "username": "root",
      "password": null,
      "database": "warehouse_database",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "production": {
      "username": process.env.DB_PRODUCTION_USER,
      "password": process.env.DB_PRODUCTION_PASSWORD,
      "database": process.env.DB_PRODUCTION_NAME,
      "host": process.env.DB_PRODUCTION_HOST,
      "dialect": "postgres",
      "port": 5432,
      "dialectOptions": {
        "ssl": true        //<============ Add this
      }
    }
  }