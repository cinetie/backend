import { Router } from "express";
import WebHooks from "../controllers/webhooks";
import Authorization from "../middlewares/access";

const app = Router();

app.post("/rave", Authorization.isRave, WebHooks.flutterWave);
app.post("/dpo", WebHooks.DPOwebhook);
app.post("/investment-webhook", WebHooks.investmentFlutterwave);

export default app;
