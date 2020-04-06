import { config } from 'dotenv';
import path from 'path';
import fs from 'fs';

config();
module.exports = {
  development: {
    use_env_variable: 'DEV_DATABASE_URL',
    dialect: 'mysql',
    dialectOptions: {
      typeCast: true,
      ssl: {
        ca: fs.readFileSync(path.resolve(process.env.CA_LOCATION))
      }
    }
  },
  production: {
    use_env_variable: 'PROD_DATABASE_URL',
    dialect: 'mysql',
    dialectOptions: {
      typeCast: true,
      ssl: {
        ca: fs.readFileSync(path.resolve(process.env.CA_LOCATION))
      }
    }
  },
  test: {
    use_env_variable: 'TEST_DATABASE_URL',
    dialect: 'postgres'
  },

  staging: {
    use_env_variable: 'STAGING_DATABASE_URL',
    dialect: 'mysql',
    dialectOptions: {
      typeCast: true
    }
  }
};
