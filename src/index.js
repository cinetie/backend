/* eslint-disable no-console */
import "@babel/polyfill";
import path from "path";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import cron from "node-cron";
import { config } from "dotenv";
import fileUpload from "express-fileupload";
import xmlparser from "express-xml-bodyparser";
import response from "./helpers/response";
import stopLoginSessions from "./helpers/stopLoginSessions";
import calculateEarnings from "./helpers/calculateEarning";
import routes from "./routes";
import endSubscription from "./helpers/endSubscription";
import { getExpiredSubscriptions } from "./services/subscriptionService";
import planServices from "./services/planServices";
import transactionService from "./services/transactionService";
import userService from "./services/userServices";

config({ path: `../.env.${process.env.NODE_ENV}` });

cron.schedule("0 0 0 * * *", async () => {
  await stopLoginSessions();
});
cron.schedule(
  "0 0 * * *",
  async () => {
    try {
      await calculateEarnings();
    } catch (error) {
      console.error(error);
      console.log("An error occured while calculating earnings");
    }
  },
  {
    scheduled: true,
    timezone: "Africa/Cairo",
  }
);

cron.schedule(
  "0 0 * * *",
  async () => {
    try {
      await endSubscription();
    } catch (error) {
      console.error(error);
      console.log("An error occured while ending subscriptions");
    }
  },
  {
    scheduled: true,
    timezone: "Africa/Cairo",
  }
);
cron.schedule("0 0 * * *", async () => {
  console.log("cron started");
  try {
    const subs = await getExpiredSubscriptions();
    subs.forEach(async (subscription) => {
      const latestTransaction =
        await transactionService.getRecentTransactionsByEmail(
          subscription.email,
          "pending"
        );
      if (latestTransaction) {
        console.log("already have a pending transaction");
        return;
      }
      const plan = await planServices.getParticalPlan(subscription.plan);
      const user = await userService.getUser(subscription.email);
      if (user != null) {
        await transactionService.createTransaction({
          currency: "USD",
          paidAmount: user.isBilledAnnually
            ? plan.yearlyPrice
            : plan.monthlyPrice,
          email: user.email,
          statusDesc: "pending",
        });
      }
    });
  } catch (error) {
    console.error(error);
    console.error("An error occured while creating user transactions");
  }
});
const app = express();

app.enable("trust proxy");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(xmlparser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 5000 * 1024 * 1024 },
  })
);
app.use(morgan("dev"));

app.get("/", (req, res) =>
  response.successResponse(res, 200, "Welcome to Cinetie")
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, OPTIONS, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/", routes);

app.use((req, res) =>
  response.errorResponse(res, 404, "Not found", "Undefined URL")
);
app.set("views", path.join(__dirname, "/public/templates"));
app.set("view engine", "ejs");
const PORT = process.env.PORT || 3001;
if (!module.parent) {
  app.listen(PORT, () =>
    console.log(`Up and running on port ${PORT} ${process.env.HOST}`)
  );
}
module.exports = app;
