const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  production: {
    use_env_variable: 'PROD_DATABASE_URL',
    dialect: 'postgres'
  },
  development: {
    use_env_variable: 'DEV_DATABASE_URL',
    dialect: 'DIALECT',
    dialectOptions:{
      typeCast:true
    }
  },
  test: {
    use_env_variable: 'DATABASE_URL_TEST',
    dialect: 'postgres'
  }
};
