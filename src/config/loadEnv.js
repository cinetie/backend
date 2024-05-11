import dotenv from "dotenv";

const { NODE_ENV } = process.env;

let envFile = ".env";
if (NODE_ENV === "production") {
  envFile = ".env.production";
} else if (NODE_ENV === "staging") {
  envFile = ".env.staging";
} else if (NODE_ENV === "development") {
  envFile = ".env.dev";
}

dotenv.config(process.cwd(), envFile);
