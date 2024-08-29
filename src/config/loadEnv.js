import dotenv from "dotenv";

const { NODE_ENV } = process.env;

let envFile = ".env";

envFile = `.env.${NODE_ENV}`

dotenv.config({"path": envFile});
console.log(process.env.DIALECT);
