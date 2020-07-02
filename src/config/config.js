require('dotenv').config()


module.exports = {

  "local": {
    "username":process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "postgres",
    "operatorsAliases": '0'
    },

  "development": {
    "username":process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "postgres",
    "operatorsAliases": '0'
  },
  "test": {
    "username":"",
    "password": "",
    "database":"",
    "host": "",
    "dialect": "postgres",
   
   
  },
  "production": {
    "username":process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "postgres",
    "operatorsAliases": '0'
  }

};

