import dotenv from "dotenv";

const { NODE_ENV } = process.env;

const env = NODE_ENV || "development";

let envFile = ".env";

envFile = `.env.${env}`

dotenv.config({"path": envFile});
console.log(process.env.DIALECT);
