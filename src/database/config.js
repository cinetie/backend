import '../config/loadEnv';

console.log("DEV_DATABASE_URL:", process.env.DEV_DATABASE_URL);

module.exports = {
  development: {
    use_env_variable: "DEV_DATABASE_URL",
    dialect: "mysql",
    dialectOptions: {
      typeCast: true,
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false,
  },
  production: {
    use_env_variable: "PROD_DATABASE_URL",
    dialect: "mysql",
    dialectOptions: {
      typeCast: true,
      ssl: "Amazon RDS",
    },
  },
  test: {
    use_env_variable: "TEST_DATABASE_URL",
    dialect: "mysql",
    logging: false,
  },

  staging: {
    use_env_variable: "STAGING_DATABASE_URL",
    dialect: "mysql",
    dialectOptions: {
      typeCast: true,
    },
    logging: false,
  },
};
